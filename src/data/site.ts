// Build-side configuration:
// Exported data will be used in the Handlebars templating directly
const DATA: any = async () => { return _.merge({
  repoURL: "https://github.com/nndda/website",

  site: {
    author: "nnda",
    title: "nnda's Archive",
    note: `This website is licensed under the GNU GPLv3.\nThe source code is available in the public repository.`,

    authorProfile: {
      status: {
        icon: "🛌",
        text: "eepy",
      },

      description: `A <s>(self-proclaimed)</s> <span class="lists"><b>game developer</b> <b>front-end web dev</b> <b>digital illustrator</b></span>`,

      pronouns: "he/him",
      pronunciation: "/ˈnæn.də/",
      languages: "ID, EN",
      location: "ID",
      timezone: "Asia/Jakarta",
    },
  },

  allRightsReserved: false,

  nav: {
    links: [
      {
        name: "Projects",
        url: "#projects",
      },
      {
        name: "Illustrations",
        url: "#illustrations",
      },
      {
        // icon: iconSI["itchdotio"],
        icon: `<svg data-i="itchdotio" class="global" height="18" width="18"></svg>`,
        url: "nnda.itch.io",
        external: true,
      },
      {
        // icon: iconSI["github"],
        icon: `<svg data-i="github" class="global" height="18" width="18"></svg>`,
        url: "github.com/nndda",
        external: true,
      },
      {
        // icon: iconSI["bluesky"],
        icon: `<svg data-i="bluesky" class="global" height="18" width="18"></svg>`,
        url: "bsky.app/profile/nnda.dev",
        external: true,
      },
    ],
  },

  commitSHA: commitSHA,

  currentDate: currentDate,
  releaseDate: releaseDate,
  year: currentDate.getFullYear(),

  nextUpdateDate: cronParser.parse(
    "0 */12 * * *", // Match GH Actions cron deploy
    { currentDate: currentDate },
  ).next().toDate(),

  buildTimetamp: currentDate,
  buildCommitSHAFull: commitSHA,
  buildCommitSHA: commitSHA?.substring(0, 16),

  // iconSI: iconSI,
  // iconFAS: iconFAS,
  // iconFAB: iconFAB,

}, exists(siteExtPath) ? (await import(siteExtPath)).default : {} );};

// ============================================================================

import {
  exists,
  createResolver,
} from "../scripts/build/utils";

import "dotenv/config";

import {
  execSync,
  type ExecSyncOptionsWithStringEncoding
} from "child_process";
import cronParser from "cron-parser";
import _ from "lodash";

const siteExtPath: string = createResolver(__dirname)("./site-ext.js");

// ============================================================================

// type IconDefs = Record<string, string>;

// ----------------------------------------------------------------------------

// import * as siIconsRaw from "simple-icons";
// import { type SimpleIcon } from "simple-icons";

// const iconSI: IconDefs = Object.keys(siIconsRaw).reduce(
//   (acc: IconDefs, val: string): IconDefs => {
//     const icon: SimpleIcon = siIconsRaw[val];
//     acc[icon.slug] = icon.svg;

//     return acc;
//   }, {} as IconDefs,
// );

// ----------------------------------------------------------------------------

// import { icon } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";

// const iconFAS: IconDefs = Object.keys(fas).reduce(
//   (acc: IconDefs, val: string): IconDefs => {
//     acc[
//       fas[val].iconName.replace("-", "_")
//     ] = icon(fas[val]).html.join();
//     return acc;
//   }, {} as IconDefs,
// );

// const iconFAB: IconDefs = Object.keys(fab).reduce(
//   (acc: IconDefs, val: string): IconDefs => {
//     acc[
//       fab[val].iconName.replace("-", "_")
//     ] = icon(fab[val]).html.join();
//     return acc;
//   }, {} as IconDefs,
// );


// ============================================================================

const
  gitExecSyncOpt: ExecSyncOptionsWithStringEncoding = {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }

, commitSHA: string | null = (
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.COMMIT_SHA ??
    execSync(
      "git rev-parse HEAD",
      gitExecSyncOpt,
    )
  )

, currentDate: Date = new Date()
, releaseDate: Date = new Date( commitSHA === null ? currentDate : execSync(
      `git --no-pager log -1 --format=%cd --date=iso ${commitSHA}`,
      gitExecSyncOpt,
    ),
  )
;

export default DATA();
