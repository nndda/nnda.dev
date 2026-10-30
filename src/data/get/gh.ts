import { FS, root } from "@dev/util";
import siteData from "../site";
import { resolve } from "path";

for (const env of [
  "GH_PAT",
]) {
  if (!(env in process.env)) {
    console.error(env + " env not set");
  }
}

const
  // startYear = 2021
  currentDate = new Date()

, ghHeaders = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${process.env.GH_PAT}`,
    "X-GitHub-Api-Version": "2026-03-10",
  }

, langData = {
   total: 0,
   perByte: { } as Record<string, number>,
   perCent: { } as Record<string, number>,
  }

, contribsData = {
    days: {
        all: 0,
        yearly: 0,
    },
    stats: {
        total: {
            all: 0,
            yearly: 0,
        },
        highest: {
            all: 0,
            yearly: 0,
        },
        streaks: {
            all: 0,
            yearly: 0,
        },
        avg: {
            daily: {
                all: 0,
                yearly: 0,
            },
        },
    },
    arr: {
        all: [] as number[],
        yearly: [] as number[],
    },
  }
, repos: any[] = []
;

let page = 1
,   more = true
;


async function fetchGH<T>(url: string) {
  return await (await fetch(url, { headers: ghHeaders, })).json() as T;
}

while (more) {
  const
    url = `https://api.github.com/users/${siteData.platforms.gh.user}/repos?per_page=100&page=${page}`
  , res = await fetchGH<any[]>(url)
  ;

  repos.push(...res);

  more = res.length == 100;

  page += 1;
}

// const reposTotal = repos.length;

function normalizeContribs(arr: number[]): number[] {
  const
    minVal = Math.min(...arr.filter(n => n > 0))
  , maxVal = Math.max(...arr)
  ;

  return arr.map(num => {
    if (num === 0) {
      return 0;
    }

    return Math.round(((num - minVal) / (maxVal - minVal)) * 4 + 1);
  });
}

function getContribsStreak(arr: number[]): number {
  return arr.reduce(({ current, max }, num) => {
    if (num !== 0) {
      current += 1;

      if (current > max) {
        max = current;
      }
    } else {
      current = 0;
    }

    return { current: current, max: max };
  }, {
    current: 0,
    max: 0,
  }).max;
}

function getContribsQuery(dateFrom?: string, dateTo?: string): string {
  return `
{
  user(login: "${siteData.platforms.gh.user}") {
    contributionsCollection${(dateFrom && dateTo) ? `(from: "${dateFrom}", to: "${dateTo}")` : ''} {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;
}



// Repositories' data
console.log("Fetching GitHub repositories data...");

for (const repo of repos) {

  for (const [ lang, langBytes ] of Object.entries(
    await fetchGH<{string: number}>(repo["languages_url"])
  )) {

    langData.total += langBytes;

    langData.perByte[lang] ??= 0;
    langData.perByte[lang] += langBytes;
  }
}

for (const [ lang, langBytes ] of Object.entries(langData.perByte)) {
  langData.perCent[lang] = +(langBytes / langData.total * 100).toFixed(2);
}

const

  top5Lang = Object
    .entries(langData.perByte)
    .sort(
      (a, b) => {
        return a[1] - b[1];
      }
    )
    .reverse()
    .splice(0, 5)
    .reduce(
      (prev, [ lang ]) => {
        prev.push(lang);
        return prev;
      },
      [] as string[],
    )

, top5LangSum = top5Lang
    .reduce((prev, lang) => {
      return prev + Math.sqrt(langData.perCent[lang]);
    }, 0)
;

console.log("Top 5 languages: ", top5Lang);



// Contribution calendar
console.log("Fetching GitHub contributions data...");

async function fetchContribsRanged(dateFrom?: string, dateTo?: string): Promise<any[]> {
  const
    res: any = (
      await (
        await fetch("https://api.github.com/graphql", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GH_PAT}`,
          },
          method: "POST",
          body: JSON.stringify({"query": getContribsQuery(dateFrom, dateTo)}),
        })
      )
      .json()
    )
  , contribs: any[] = []
  ;
//
//   console.log(res);

  for (const weeks of res["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]) {
    // console.log(weeks);
    contribs.push(...weeks["contributionDays"]);
  }

  // console.log(contribs);
  return contribs;
}

// async function fetchContribsAll() {
//   const
//     contribsAll = (
//       Array
//         .from({ length: currentDate.getFullYear() - startYear, }) as number[]
//     )
//     .reduce( (prev, year) => {
//       prev.push(
//         fetchContribsRanged(
//           `${year}-01-01T00:00:00Z`,
//           `${year}-12-31T23:59:59Z`,
//         ),
//       );
//       return prev;
//     }, [] as any[])
//
//   , idxEnd = contribsAll.findLastIndex(item => item["date"] === currentDate.toISOString().slice(0, 10));
//   ;
//
//   contribsAll.slice(
//     contribsAll.findIndex(item => item["contributionCount"] > 0),
//     idxEnd === -1 ? contribsAll.length - 1 : idxEnd,
//   );
// }

function formatContribs(contribs: any[]): number[] {
  return contribs.reduce((prev, item) => {
    prev.push(item["contributionCount"]);
    return prev;
  }, [] as number[]);
}

function updateContribsData(contribs: any[], type: keyof typeof contribsData.days) {
  contribsData.days[type] = contribs.length;
  contribsData.stats.highest[type] = Math.max(...contribs);
  contribsData.stats.total[type] = contribs.reduce((p, c) => p + c);

  contribsData.stats.avg.daily[type] = +(contribsData.stats.total[type] / contribsData.days[type]).toFixed(2);

  contribsData.stats.streaks[type] = getContribsStreak(contribs);

  contribsData.arr[type] = normalizeContribs(contribs);
}

updateContribsData(
  formatContribs(
    await fetchContribsRanged(),
  ),
  "yearly",
)

function formatDate(d: Date) {
  const
    day = d.getDate()
  , suf = ["th", "st", "nd", "rd"]
  ;

  return `${day}<small>${
    day % 10 < 4 && (day < 10 || day > 20) ? suf[day % 10] : suf[0]
  }</small> ${
    d.toLocaleString("en-US", { month: "long", }
  )}`
}

const
  contribGrapGrids = 16 * 10
, finalJSONStr = JSON.stringify({
    contribs: {
      first: formatDate((() => {
        const current = new Date(currentDate);
        current.setDate(currentDate.getDate() - contribGrapGrids);

        return current;
      })()),
      last: formatDate(currentDate),
      arr: contribsData.arr.yearly.slice(-contribGrapGrids),
    },
    langs: {
      ... (
        top5Lang.reduce((prev, lang) => {
          prev[lang] = [
            langData.perCent[lang],
            +(Math.sqrt(langData.perCent[lang]) / top5LangSum * 100 ).toFixed(2),
          ];
          return prev;
        }, { } as Record<string, [number, number]>)
      )
    }
  })
;

for (const out of [
  "./src/public/overview-stats.json",
]) {
  FS.write.text(resolve(root, out), finalJSONStr);
}
