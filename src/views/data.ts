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

const siIcons : Record<string, string> = {
  "itchdotio": siItchdotio.svg,
  "github": siGithub.svg,
  "artstation": siArtstation.svg,
  "mastodon": siMastodon.svg,
  "codepen": siCodepen.svg,
  "patreon": siPatreon.svg,
  "kofi": siKofi.svg,
  "stylelint": siStylelint.svg,
  "eslint": siEslint.svg,
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

const repoURL = urlStr(siteData.repoURL);
const reRepoOwner = /^.+\.(?:com|org)\/(\w+)\/(\w+)/.exec(repoURL);

const repoOwner = reRepoOwner![1] ?? "";
const repoName = reRepoOwner![2] ?? "";

siteData!.nav.links.forEach((navLinkData: any, i: number) => {
  siteData.nav.links[i]!.url = urlStr(navLinkData.url);
  siteData.nav.links[i]!.icon = siIcons[<string>navLinkData.icon];
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  siteData.socials[i]!.url = urlStr(socialLinkData.url);
  siteData.socials[i]!.icon = siIcons[<string>socialLinkData.icon];
});

import { updateSocialRedirects } from "../scripts/redirects";
updateSocialRedirects(siteData.socials);

const repoBadges : string[] = [];
siteData!.repoWorkflowBadges.forEach((workflowPath: string) => {
  const urlData = fetchCurl(
    `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowPath}/runs?branch=main&per_page=1`
  )

  if (urlData !== null) {
    if (urlData.workflow_runs[0].conclusion === "success") {
      const badgeName : string = urlData.workflow_runs[0].name;
      let badgeIcon = "";

      if (badgeName.includes("CodeQL")) {
        badgeIcon = siGithub.svg;
      } else if (badgeName.includes("Stylelint")) {
        badgeIcon = siStylelint.svg;
      } else if (badgeName.includes("ESLint")) {
        badgeIcon = siEslint.svg;
      }

      repoBadges.push(`
        <span class="badge-success">
          <span class="badge-text">
            ${badgeIcon}
            ${badgeName}
          </span>
          ${i(faCheck)}
        </span>
      `);
    }
  }
});


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
    noteSticky: i(faNoteSticky),
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
  "repoBadges": repoBadges,
}