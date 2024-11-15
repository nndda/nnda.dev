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

import {
  SimpleIcon,

  siItchdotio,
  siGithub,
  siArtstation,
  siMastodon,
  siCodepen,
  siPatreon,
  siKofi,
  siStylelint,
  siEslint,
} from "simple-icons";

export const siIcons : Record<string, SimpleIcon> = [
  siItchdotio,
  siGithub,
  siArtstation,
  siMastodon,
  siCodepen,
  siPatreon,
  siKofi,
  siStylelint,
  siEslint,
].reduce((acc, icon) => {
  acc[icon.slug] = icon;
  return acc;
}, {} as Record<string, SimpleIcon>);

// ---------------------------------------------------------------------------------------

import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faBars,
  faCodeFork,
  faStar,
  faBug,
  faXmark,
  faScaleBalanced,
  faCheck,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

function i(icon_name: IconDefinition): string[] {
  return icon(icon_name).html;
}

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
console.log(siteData);

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
    siteData.nav.links[i].icon = siIcons[<string>navLinkData.icon]!.svg;
  }
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  socialLinkData.links.forEach((socialLink: any, n: number) => {
    siteData.socials[i].links[n].urlS = socialLink.url;
    siteData.socials[i].links[n].url = urlStr(socialLink.url);

    if (Object.prototype.hasOwnProperty.call(socialLink, "icon")) {
      siteData.socials[i].links[n].iconSlug = <string>socialLink.icon;
      siteData.socials[i].links[n].icon = siIcons[<string>socialLink.icon].svg;
    }
  });

});

import { updateSocialRedirects } from "../scripts/redirects";
const socialRedirData = <any[]>[];
siteData.socials.forEach((item: any) => {socialRedirData.push(...item.links)});
updateSocialRedirects(socialRedirData);

module.exports = {
  "repoURL": repoURL,

	nav: {
    links: [ ],
  },

  socials: [
  ],

  projects: [
  ],

  icons: {
    code: i(faCode),
    bars: i(faBars),
    codeFork: i(faCodeFork),
    star: i(faStar),
    bug: i(faBug),
    xmark: i(faXmark),
    scaleBalanced: i(faScaleBalanced),
    noteSticky: i(faNoteSticky),
  },

  "siIcons": siIcons,

  siteOptions: [
    {
      icon: i(faStar),
      name: "Star",
      url: `${repoURL}`,
    },
    {
      icon: i(faCodeFork),
      name: "Fork",
      url: `${repoURL}/fork`,
    },
    {
      icon: i(faBug),
      name: "Issues",
      url: `${repoURL}/issues`,
    },
  ],

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

  ...siteData,
}