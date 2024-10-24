import { parse } from "yaml";
import path from "path";
import fs from "fs";

import {
  siItchdotio,
  siGithub,
  siMastodon,
  siCodepen,
  siPatreon,
  siKofi,
} from "simple-icons";

const siIcons : Record<string, string> = {
  "itchdotio": siItchdotio.svg,
  "github": siGithub.svg,
  "mastodon": siMastodon.svg,
  "codepen": siCodepen.svg,
  "patreon": siPatreon.svg,
  "kofi": siKofi.svg,
}

import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faBars,
  faCodeFork,
  faStar,
  faBug,
  faXmark,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

function i(icon_name: IconDefinition): string[] {
  return icon(icon_name).html;
}

function urlStr(url: string): string {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
}

// ---------------------------------------------------------------------------------------

const siteData = parse(
  fs.readFileSync(path.resolve(__dirname, "../../site-config.yaml"), { encoding: "utf-8" })
);

siteData!.nav.links.forEach((navLinkData: any, i: number) => {
  siteData.nav.links[i]!.url = urlStr(navLinkData.url);
  siteData.nav.links[i]!.icon = siIcons[<string>navLinkData.icon];
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  siteData.socials[i]!.url = urlStr(socialLinkData.url);
  siteData.socials[i]!.icon = siIcons[<string>socialLinkData.icon];
});

const repoURL = urlStr(siteData.repoURL) ?? "";

module.exports = {
  "repoURL": repoURL,
	nav: {
    links: [
    ],
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
  },

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

  rings: {
    outerAbs:`<></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></>`,
    outer:`<><body><header></header><aside></aside><main><section></section></main><footer></footer></body></>`,
    inner:`"I'm currently doing some %s." % [ "illustration", "game dev", "web dev" ].pick_random()`,
    coreAbs:`{{{{#}}}}  <></>  ../../../../     /*   *////////////`,
  },

  easeOutBounce: `--easeOutBounce: linear(${[...new Array(50)]
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