import { parse } from "yaml";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

function fetchCurl(url: string): any {
  try {
    return JSON.parse(execSync(`curl -s ${url}`).toString());
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ---------------------------------------------------------------------------------------

import type { SimpleIcon } from "simple-icons";
const siIconsRaw: any = require("simple-icons");

export const siIcons = Object.keys(siIconsRaw).reduce(
  (acc, val) => {
    const icon: SimpleIcon = siIconsRaw[val];
    acc[
      icon.slug
    ] = icon.svg;
    return acc;
  }, {} as Record<string, string>
)

// ---------------------------------------------------------------------------------------

import { icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const faIcons = Object.keys(fas).reduce(
  (acc, val) => {
    acc[
      fas[val].iconName.replace("-", "_")
    ] = icon(fas[val]).html.join();
    return acc;
  }, {} as Record<string, string>
);

// ---------------------------------------------------------------------------------------

function urlStr(url: string): string {
  if (url.startsWith("#")) {
    return url;
  }
  if (url.startsWith("\\#")) {
    return url.replace("\\#", "#");
  }
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
}

// ---------------------------------------------------------------------------------------

const siteData = parse(
  fs.readFileSync(path.resolve(__dirname, "../../site-config.yaml"), { encoding: "utf-8" })
);

if (process.env.SITE_CFG_EXTEND) {
  execSync(`
    curl ${process.env.SITE_CFG_EXTEND} --output ext.zip && unzip ext.zip .
  `)
  fs.readFileSync(path.resolve(__dirname, "../../site-config-ext.yaml"), { encoding: "utf-8" })
}

// ---------------------------------------------------------------------------------------

const repoURL = urlStr(siteData.repoURL);

siteData!.nav.links.forEach((navLinkData: any, i: number) => {
  siteData.nav.links[i]!.url = urlStr(navLinkData.url);

  if (Object.prototype.hasOwnProperty.call(navLinkData, "icon")) {
    siteData.nav.links[i].iconSlug = <string>navLinkData.icon;
    siteData.nav.links[i].icon = siIcons[<string>navLinkData.icon];
  }
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  socialLinkData.links.forEach((socialLink: any, n: number) => {
    siteData.socials[i].links[n].urlS = socialLink.url;
    siteData.socials[i].links[n].url = urlStr(socialLink.url);

    if (Object.prototype.hasOwnProperty.call(socialLink, "icon")) {
      siteData.socials[i].links[n].iconSlug = <string>socialLink.icon;
      siteData.socials[i].links[n].icon = siIcons[<string>socialLink.icon];
    }
  });

});

import { updateSocialRedirects } from "../scripts/redirects";
const socialRedirData = <any[]>[];
siteData.socials.forEach((item: any) => {socialRedirData.push(...item.links)});
updateSocialRedirects(socialRedirData);

// =======================================================================================

const projectCatData: Object[] = [{
  name: "All",
  id: "All",
  default: true,
}];
const projectCatReadable: string[] = [];

// ---------------------------------------------------------------------------------------

const projectPlatformData: Object[] = [];
const projectPlatformReadble: string[] = [];

// =======================================================================================

siteData!.projects.forEach((projectData: any) => {

  const projectCat: string = projectData!.category;

  if (!projectCatReadable.includes(projectCat)) {
    projectCatReadable.push(projectCat);
    const id = projectCat.replace(" ", "");

    projectCatData.push({
      name: projectCat,
      id: id,
    });
  }

  // ---------------------------------------------------------------------------------------

  const projectPlatform: string = projectData!.platform;

  if (!projectPlatformReadble.includes(projectPlatform)) {
    projectPlatformReadble.push(projectPlatform);
    const id = projectPlatform
      .replace(" ", "")
      .replace("/", "");

    projectPlatformData.push({
      name: projectPlatform,
      id: id,
    });
  }

});

// =======================================================================================

module.exports = {
  "repoURL": repoURL,

	nav: {
    links: [ ],
  },

  socials: [
  ],

  projects: [ ],
  projectData: {
    categories: projectCatData,
    platforms: projectPlatformData,
  },

  icons: faIcons,
  brands: siIcons,

  siteOptions: [
    {
      icon: faIcons.star,
      name: "Star",
      url: `${repoURL}`,
    },
    {
      icon: faIcons.code_fork,
      name: "Fork",
      url: `${repoURL}/fork`,
    },
    {
      icon: faIcons.bug,
      name: "Issues",
      url: `${repoURL}/issues`,
    },
  ],

  /*
  easeOutBounce: `--ease-out-bounce: linear(${[...new Array(50)]
    .map((_d: number, i: number): number => {
      let x = i * (1 / 50);

      const n1 = 7.5625;
      const d1 = 2.75;

      if (x < 1 / d1) {
        return n1 * x * x;
      } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
      } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
      } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
      };
    })
    .join(",")
  });`,
  */

  year: new Date().getFullYear(),

  ghLangs: require("../api/langs.json"),
  ghContribs: require("../api/contribs.json"),

  ...siteData,
}