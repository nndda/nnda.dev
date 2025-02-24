// BUILD SCRIPT

console.log("Getting data from GitHub API...");

import "dotenv/config";

import path from "path";
import fetch from "node-fetch";

import handlebarsHelpers from "../views/helpers";

import {
  writeTextFile,
  createResolver,
  fetchJSON,
  cleanupDir,
  type DirResolver,
} from "../scripts/build/utils";
function abs(pathString: string): string {
  return path.resolve(__dirname, pathString);
}

cleanupDir(abs("./"));

interface LangData {
  total: number,
  perByte: Record<string, number>,
  perCent: Record<string, number>,
  frontEnd: {
    [lang: string]: {
      percent: number,
      byte: number,
      icon?: string,
    }
  },
}

interface ContribsType {
  all: number,
  yearly: number,
}

interface ContribsData {
  days: {
    all: number,
    yearly: number,
  },
  stats: {
    total: ContribsType,
    highest: ContribsType,
    streaks: ContribsType,

    avg: {
      daily: ContribsType,
    },
  },
  arr: {
    all: number[],
    yearly: number[],
  },
}

if (!process.env.GH_PAT) {
  console.error("Error: GH_PAT is not set");
  process.exit(1);
}

const
  user = "nndda",
  pat = process.env.GH_PAT,

  startYear = 2021,
  currentTime = new Date().getTime(),

  ghHeaders: HeadersInit = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${pat}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },

  langData: LangData = {
    total: 0,
    perByte: {},
    perCent: {},
    frontEnd: {

    },
  },

  contribsData: ContribsData = {
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
      all: [],
      yearly: [],
    },
  };

// =======================================================================================================

async function getRepositories(user: string): Promise<any[]> {
  const repos: any[] = [];
  let
    page: number = 1,
    more: boolean = true;

  while (more) {
    const
      url: string = `https://api.github.com/users/${user}/repos?per_page=100&page=${page}`,
      response: any[] = await fetchJSON(url, ghHeaders) as any[];
    repos.push(...response);
    more = response.length === 100;
    page++;
  }

  return repos;
}

getRepositories(user).then(repos => {
  let reposTotal: number = repos.length;

  repos.forEach((repo: any) => {
    fetchJSON(repo.languages_url, ghHeaders)
      .then((lang: any) => {
        for (const l in lang) {
          langData.total += lang[l];
          langData.perByte[l] = (langData.perByte[l] ?? 0) + lang[l];
        }

        reposTotal -= 1;
      })
      .finally(() => {
        if (reposTotal <= 0) {
          const perByte: Record<string, number> = langData.perByte;

          for (const l in perByte) {
            const
              percent: number = +(perByte[l] / langData.total * 100).toFixed(2),
              byte: number = perByte[l];

            langData.perCent[l] = percent;

            if (percent < 1.0) {

              const other = langData.frontEnd["Other"] ?? { percent: 0, byte: 0 };
              other.percent += percent;
              other.byte += byte;
              langData.frontEnd["Other"] = other;

            } else {

              langData.frontEnd[l] = {
                percent: percent,
                byte: byte,
                icon: handlebarsHelpers.icon("overview", l),
              };

            }
          }

          const langsArray = Object.entries(
            langData.frontEnd
          ).map(([name, { percent, byte, icon }]) => ({
            name, percent, byte, icon,
          }));

          langsArray.sort((a, b) => b.percent - a.percent);

          writeTextFile(abs("./langs.json"), JSON.stringify(langsArray));
        }
      });
  });
});

// =======================================================================================================

function getContribsQuery(from?: string, to?: string) { return `
{
  user(login: "${user}") {
    contributionsCollection${from && to ? `(from: "${from}", to: "${to}")` : ''} {
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
`}

function normalizeContribs(numbers: number[]): number[] {
  const
    noZero = numbers.filter(num => num > 0),
    min = Math.min(...noZero),
    max = Math.max(...numbers);

  return numbers.map(num => {
    if (num === 0) return 0;
    return Math.round(((num - min) / (max - min)) * 4 + 1);
  });
}

function getContribsStreak(arr: number[]): number {
  let
    maxStreak = 0,
    currentStreak = 0;

  for (const num of arr) {
    if (num !== 0) {
      currentStreak++;

      if (currentStreak > maxStreak) maxStreak = currentStreak;

    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

interface RawContribsDay {
  date: string,
  contributionCount: number,
}

interface RawContribsWeek {
  contributionDays: RawContribsDay[],
}

interface RawContribsData {
  totalContributions: number,
  weeks: RawContribsWeek[]
}

async function fetchContribsAll(): Promise<RawContribsWeek[]> {
  const allContributions: any[] = [];

  for (let year = startYear; year <= new Date().getFullYear(); year++) {
    const
      from: string = `${year}-01-01T00:00:00Z`,
      to: string = `${year}-12-31T23:59:59Z`,

      contributions: RawContribsData = await fetchContribsRanged(from, to);

    allContributions.push(...contributions.weeks);
  }

  return allContributions;
}

async function fetchContribsRanged(from?: string, to?: string): Promise<RawContribsData> {
  const
    query: string = getContribsQuery(from, to),

    response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${pat}`
      },
      body: JSON.stringify({ query })
    }),

    data: any = await response.json() as any;

  return data.data.user.contributionsCollection.contributionCalendar;
}

function updateContribsData(day: RawContribsDay, type: "yearly" | "all") {
  if (new Date(day.date).getTime() <= currentTime) {

    if (contribsData.stats.highest[type] <= day.contributionCount) {
      contribsData.stats.highest[type] = day.contributionCount
    }

    contribsData.stats.total[type] += day.contributionCount;
    contribsData.arr[type].push(
      day.contributionCount
    );

    contribsData.days[type]++;
  }
}

fetchContribsAll().then(weeks => {

  weeks.forEach(day => {
    day.contributionDays.forEach(dayData => {
      updateContribsData(dayData, "all");
    });
  });

  fetchContribsRanged()
  .then(data => {
    data.weeks.forEach(week => {
      week.contributionDays.forEach(dayData => {
        updateContribsData(dayData, "yearly");
      });
    });
  })
  .finally(() => {
    contribsData.arr.yearly = normalizeContribs(contribsData.arr.yearly);

    contribsData.stats.avg.daily.all = +(contribsData.stats.total.all / contribsData.days.all).toFixed(2);
    contribsData.stats.avg.daily.yearly = +(contribsData.stats.total.yearly / contribsData.days.yearly).toFixed(2);

    contribsData.stats.streaks.all = getContribsStreak(contribsData.arr.all);
    contribsData.stats.streaks.yearly = getContribsStreak(contribsData.arr.yearly);

    writeTextFile(abs("./contribs.json"), JSON.stringify(contribsData));
  });
});
