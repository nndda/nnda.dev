// Build-side configuration:
// Exported data will be used in the Handlebars templating directly
const DATA: any = async () => { return _.merge({
  repoURL: "https://github.com/nndda/nnda.dev",

  site: {
    author: "nnda",
    title: "nnda's corner of the internet",
    description: "My little slice of the internet. An all-in-one hub for my stuff. Where I dump my projects, illusts., and my yapping.",

    note: `This website is licensed under the GNU AGPLv3.\nThe source code is available in the public repository.`,

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
        icon: `<svg data-i="itchdotio" class="global" height="18" width="18"></svg>`,
        url: "nnda.itch.io",
        external: true,
      },
      {
        icon: `<svg data-i="github" class="global" height="18" width="18"></svg>`,
        url: "github.com/nndda",
        external: true,
      },
      {
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

}, exists(siteExtPath) ? (await import(siteExtPath)).default : {} );};

// ============================================================================

import {
  exists,
  createResolver,
  writeTextFile,
  type DirResolver,
} from "../scripts/build/utils";

import "dotenv/config";

import {
  execSync,
  type ExecSyncOptionsWithStringEncoding
} from "child_process";
import cronParser from "cron-parser";
import _ from "lodash";

const
  abs: DirResolver = createResolver(__dirname)
, siteExtPath: string = abs("./site-ext.js")
;

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

import postsFeed from "./social-posts";
writeTextFile(abs("../public/posts-feed.json"), JSON.stringify(postsFeed));

export default DATA();
