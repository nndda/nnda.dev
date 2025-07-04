// BUILD SCRIPT

import "dotenv/config";

import { execSync } from "child_process";

import { parse } from "yaml";
import _ from "lodash";
import cronParser from "cron-parser";

import handlebarsHelpers from "./helpers";

import {
  exists,
  readTextFile,
  writeTextFile,
  pathResolve,
  createResolver,
} from "../scripts/build/utils";
const rootDir: string = createResolver(__dirname)("../../");

function rootResolve(...paths: string[]): string {
  return pathResolve(rootDir, ...paths);
}

const currentDate: Date = new Date();

console.log("Getting packages info...");
import "../scripts/build/packages";

// ---------------------------------------------------------------------------------------

console.log("Building fonts...");
execSync(`python ${rootResolve("./src/scripts/build/fonts.py")}`);

// =======================================================================================

console.log("Building icons...");
import "../scripts/build/icons";

// =======================================================================================

type IconDefs = Record<string, string>; // icon slug, svg string

// ---------------------------------------------------------------------------------------

import * as siIconsRaw from "simple-icons";
import { type SimpleIcon } from "simple-icons";

export const siIcons: IconDefs = Object.keys(siIconsRaw).reduce(
  (acc, val) => {
    const icon: SimpleIcon = siIconsRaw[val];
    acc[
      icon.slug
    ] = icon.svg;
    return acc;
  }, {} as IconDefs
);

// ---------------------------------------------------------------------------------------

import { icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const faIcons: IconDefs = Object.keys(fas).reduce(
  (acc, val) => {
    acc[
      fas[val].iconName.replace("-", "_")
    ] = icon(fas[val]).html.join();
    return acc;
  }, {} as IconDefs
);

console.log("Finished building icons");
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

console.log("Parsing site data...");

const siteDataExt: string = rootResolve("site-config-ext.yaml");
const siteData = _.merge(
  parse(readTextFile(rootResolve("site-config.yaml"))),
  exists(siteDataExt) ?
    parse(readTextFile(siteDataExt)) : {}
);

console.log("Finished parsing site data");

// ---------------------------------------------------------------------------------------

const repoURL = urlStr(siteData.repoURL);
const commitSHA = (
  process.env.CF_PAGES_COMMIT_SHA ??
  process.env.COMMIT_SHA ??
  "12345abcdef"
);

let lastPublished: Date;

try {
  const dateStr: string = execSync(
    `git --no-pager log -1 --format=%cd --date=iso ${commitSHA}`,
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
  );
  lastPublished = new Date(dateStr);

} catch(err) {
  console.log(`Error: ${err} \nUnable to get the commit date for: ${commitSHA}`);
  lastPublished = new Date();
}

console.log("Processing links & URLs...");

siteData!.nav.links.forEach((navLinkData: any, i: number) => {
  siteData.nav.links[i]!.url = urlStr(navLinkData.url);

  if (Object.prototype.hasOwnProperty.call(navLinkData, "icon")) {
    siteData.nav.links[i].iconSlug = navLinkData.icon as string;
    siteData.nav.links[i].iconLazy = handlebarsHelpers.icon("global", navLinkData.icon as string);
    siteData.nav.links[i].icon = siIcons[(navLinkData.icon as string)];
  }
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  socialLinkData.links.forEach((socialLink: any, n: number) => {
    siteData.socials[i].links[n].urlS = socialLink.url;
    siteData.socials[i].links[n].url = urlStr(socialLink.url);

    if (Object.prototype.hasOwnProperty.call(socialLink, "icon")) {
      siteData.socials[i].links[n].iconSlug = socialLink.icon as string;
      siteData.socials[i].links[n].icon = handlebarsHelpers.icon(
        "links",
        socialLink.icon as string
      );
    }
  });

});

console.log("Finished processing links & URLs");

import { updateSocialRedirects } from "../scripts/build/redirects";
const socialRedirData = [] as any[];
siteData.socials.forEach((item: any) => {socialRedirData.push(...item.links)});
updateSocialRedirects(socialRedirData);

// =======================================================================================

// temporarily disabled

// const projectCatData: object[] = [{
//   name: "All",
//   id: "All",
//   default: true,
// }];
// const projectCatReadable: string[] = [];

// ---------------------------------------------------------------------------------------

// const projectPlatformData: object[] = [];
// const projectPlatformReadble: string[] = [];

// =======================================================================================

// siteData!.projects.forEach((projectData: any) => {

//   const projectCat: string = projectData!.category;

//   if (!projectCatReadable.includes(projectCat)) {
//     projectCatReadable.push(projectCat);
//     const id = projectCat.replace(" ", "");

//     projectCatData.push({
//       name: projectCat,
//       id: id,
//     });
//   }

//   // ---------------------------------------------------------------------------------------

//   const projectPlatform: string = projectData!.platform;

//   if (!projectPlatformReadble.includes(projectPlatform)) {
//     projectPlatformReadble.push(projectPlatform);
//     const id = projectPlatform
//       .replace(" ", "")
//       .replace("/", "");

//     projectPlatformData.push({
//       name: projectPlatform,
//       id: id,
//     });
//   }

// });

// =======================================================================================

import ghLangsData from "../api/langs.json";
import ghContribsData from "../api/contribs.json";

// =======================================================================================

writeTextFile(
  rootResolve("./src/scripts/build/links.json"),
  JSON.stringify(siteData.socials),
);

writeTextFile(
  rootResolve("./src/scripts/build/projects.json"),
  JSON.stringify(siteData.projects),
);

// Illustration pre-process
// what. the. fuck.

interface IllustrationItem {
  title: string,
  chr: string[],
  src: string,
}

interface IllustrationGallery {
  col: number,
  items: IllustrationItem[],
}

let illustCount: number = 0;

writeTextFile(
  rootResolve("./src/scripts/sections/illustrations.build.js"),

  siteData.illustrations.map((gall: IllustrationGallery): string => {
    return gall.items.map((itm: IllustrationItem): string => {
      return `import i${illustCount++} from "../..${itm.src}";`;
    }).join("\n")
  }).join("")
    +
  `\n\nexport default [\n${
    Array.from(
      { length: illustCount },
      (_, i: number): string => {
        return `  i${i++}`
      }
    ).join(',\n')
  }\n]`,
)

siteData.illustrations.forEach((val: IllustrationGallery, i: number) => {
  val.items.forEach((_, n: number) => {
    delete siteData.illustrations[i].items[n].src;
  });
});

writeTextFile(
  rootResolve("./src/scripts/build/illustrations.json"),
  JSON.stringify(siteData.illustrations),
);

// =======================================================================================

console.log("Finished processing data");

export default {
  "repoURL": repoURL,

	nav: {
    links: [ ],
  },

  socials: [
  ],

  projects: [ ],
  // temporarily disabled
  // projectData: {
    // categories: projectCatData,
    // platforms: projectPlatformData,
  // },

  icons: faIcons,
  brands: siIcons,

  siteOptions: [
    {
      icon: handlebarsHelpers.icon("footer", "star"),
      name: "Star",
      url: `${repoURL}`,
    },
    {
      icon: handlebarsHelpers.icon("footer", "code-fork"),
      name: "Fork",
      url: `${repoURL}/fork`,
    },
    {
      icon: handlebarsHelpers.icon("footer", "bug"),
      name: "Issues",
      url: `${repoURL}/issues`,
    },
  ],

  buildTimetamp: currentDate,
  buildCommitSHAFull: commitSHA,
  buildCommitSHA: commitSHA.substring(0, 16),

  nextUpdateDate: cronParser.parse(
    "0 */12 * * *", // Match GH Actions cron deploy
    { currentDate: currentDate },
  ).next().toDate(),

  releaseDate: lastPublished,

  year: currentDate.getFullYear(),

  ghLangs: ghLangsData,
  ghContribs: ghContribsData,

  ...siteData,
}