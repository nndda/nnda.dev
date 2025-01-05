import fetch from "node-fetch";
import fs from "fs";
import path from "path";

import type { SimpleIcon } from "simple-icons";

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

const
  user = "nndda",
  pat = "",

  siIconsRaw: any = require("simple-icons"),
  siIcons = Object.keys(siIconsRaw).reduce(
    (acc, val) => {
      const icon: SimpleIcon = siIconsRaw[val];
      acc[
        icon.title
      ] = icon.svg;
      return acc;
    }, {} as Record<string, string>
  ),

  iconDef: Record<string, string> = {
    "GDScript": siIcons["Godot Engine"],
    "HTML": siIcons["HTML5"],
    "SCSS": siIcons["Sass"],
  },

  langData: LangData = {
    total: 0,
    perByte: {},
    perCent: {},
    frontEnd: {

    },
  };

async function fetchJSON(url: string) {
    const response = await fetch(url, {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${pat}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.statusText}`);
    }

    return response.json();
}

async function getRepositories(user: string): Promise<any[]> {
  const repos: any[] = [];
  let
    page = 1,
    more = true;

  while (more) {
    const
      url = `https://api.github.com/users/${user}/repos?per_page=100&page=${page}`,
      response = <any[]>(await fetchJSON(url));
    repos.push(...response);
    more = response.length === 100;
    page++;
  }

  return repos;
}

getRepositories(user).then(repos => {
  let reposTotal = repos.length;

  repos.forEach(repo => {
    fetchJSON(repo.languages_url)
      .then((lang: any) => {
        for (const l in lang) {
          langData.total += lang[l];
          langData.perByte[l] = (langData.perByte[l] ?? 0) + lang[l];
        }

        reposTotal -= 1;
      })
      .finally(() => {
        if (reposTotal <= 0) {
          const perByte = langData.perByte;

          for (const l in perByte) {
            const
              percent = +(perByte[l] / langData.total * 100).toFixed(2),
              byte = perByte[l];

            langData.perCent[l] = percent;

            if (percent < 5.0) {

              const other = langData.frontEnd["Other"] ?? { percent: 0, byte: 0 };
              other.percent += percent;
              other.byte += byte;
              langData.frontEnd["Other"] = other;

            } else {

              langData.frontEnd[l] = {
                percent: percent,
                byte: byte,
                icon: siIcons[l] ?? iconDef[l],
              };

            }
          }

          const langsArray = Object.entries(
            langData.frontEnd
          ).map(([name, { percent, byte, icon }]) => ({
            name, percent, byte, icon,
          }));

          langsArray.sort((a, b) => b.percent - a.percent);

          console.log(langsArray);

          fs.writeFileSync(path.resolve(__dirname, "langs.json"), JSON.stringify(langsArray));
        }
      });
  });
});