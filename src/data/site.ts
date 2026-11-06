// Build-side configuration:
// Exported data will be used in the Handlebars templating directly

interface SiteData {
  repoURL: string,

  title: string,
  description: string,
  note: string,

  author: {
    name: string,
    status: {
      icon: string,
      text: string,
    },

    description: string,
    pronouns: string,
    pronounciation: string,
    languages: string,
    location: string,
    timezone: string,
  },

  allRightsReserved: boolean,

  nav: {
    links: {
      name: string,
      url: string,
      external?: true,
    }[],
  },

  platforms: {
    gh: {
      user: string,
    },
  },

  commitSHA: string,

  currentDate: string,
  releaseDate: string,
  year: number,

  nextUpdateDate: Date,

  buildTimetamp: Date,
  buildCommitSHAFull: string,
  buildCommitSHA: string,

  data: {
    links: any,
    illusts: any,
  },
}

const DATA: () => Promise<SiteData> = async () => { return _.merge({
  repoURL: "https://github.com/nndda/nnda.dev",

  title: "nnda's corner of the internet",
  description: "My little slice of the internet. An all-in-one hub for my stuff. Where I dump my projects, illusts., and my yapping.",
  note: `This website is licensed under the GNU AGPLv3.\nThe source code is available in the public repository.`,

  author: {
    name: "nnda",
    status: {
      icon: "🛌",
      text: "eepy",
    },

    description: `👈 A <s>self-proclaimed</s><ul class="nostyle word-carousel"><li>game developer</li><li>front-end web dev</li><li>digital illustrator</li></ul>`,

    pronouns: "he/him",
    pronunciation: "/ˈnæn.də/",
    languages: "ID, EN",
    location: "ID",
    timezone: "Asia/Jakarta",
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

  platforms: await import("./site-platforms"),

  commitSHA: commitSHA,

  currentDate: currentDate,
  releaseDate: releaseDate.toISOString(),
  year: currentDate.getFullYear(),

//   nextUpdateDate: Bun.cron.parse(
//     "0 */12 * * *", // Match GH Actions cron deploy
//     currentDate,
//   ),

  // buildTimetamp: currentDate,
  buildCommitSHAFull: commitSHA,
  buildCommitSHA: commitSHA?.substring(0, 16),

  data: {
    links: dataLinks,
    illusts: {
      home: (await dataIllusts).illustrations,
    },
    projects: dataProjects,
  },

}, FS.exists(siteExtPath) ? (await import(siteExtPath)).default : {} );};

// ============================================================================

import dataLinks from "./site-links";
import dataIllusts from "./illustrations/home";
import dataProjects from "./site-projects";

// ============================================================================

import { FS, Path } from "@dev/util";

import {
  execSync,
  type ExecSyncOptionsWithStringEncoding
} from "child_process";
import { resolve } from "path";
import _ from "lodash";

const siteExtPath = resolve(import.meta.dir, "./site-ext.js");

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
FS.write.text(Path.abs("./src/public/posts-feed.json"), JSON.stringify(postsFeed));

export default await DATA();
