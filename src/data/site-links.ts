import type {
  LinkGroup,
  LinkGroupItem,
} from "../scripts/sections/links";

const
  // Common usernames
  nnda: string = "nnda"
, nndda: string = "nndda"
, at_nnda_dev: string = "@nnda_dev"
;

// duplicates
const patreon: LinkGroupItem = {
  name: "Patreon",
  url: "patreon.com/nnda",
  icon: "patreon",
  username: nnda,
};

export default [
  { // ------------------------------------------------------------------------
    group: "My Main Works",
    desc: "Everything I do.",
    links: [
      {
        name: "GitHub",
        url: "github.com/nndda",
        icon: "github",
        username: nndda,
      },
      {
        name: "itch.io",
        url: "nnda.itch.io",
        icon: "itchdotio",
        username: nnda,
      },
      patreon,
      // "br",
      // {
      //   name: "YouTube",
      //   url: "youtube.com/@nnda_dev",
      //   icon: "youtube",
      //   username: at_nnda_dev,
      // },
      // {
      //   name: "TikTok",
      //   url: "tiktok.com/@nnda_dev",
      //   icon: "tiktok",
      //   username: at_nnda_dev,
      // },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Artworks & Illustrations",
    desc: "Where I dump all of the stuff and things I drawed.",
    links: [
      {
        name: "ArtStation",
        url: "artstation.com/nnda",
        icon: "artstation",
        username: nnda,
      },
      {
        name: "cara.app",
        url: "cara.app/nnda",
        username: nnda,
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Socials",
    desc: "Places to yell at me.",
    links: [
      {
        name: "Mastodon",
        url: "mastodon.art/@nnda",
        icon: "mastodon",
        username: "@nnda",
      },
      {
        name: "Twitter",
        url: "twitter.com/@nnda_dev",
        icon: "twitter",
        username: at_nnda_dev,
      },
      {
        name: "Bluesky",
        url: "bsky.app/profile/nnda.dev",
        icon: "bluesky",
        username: "@nnda.dev",
      },
    ],
  },
  {
    group: "Gaming",
    desc: "Not much, besides smashing drums",
    links: [
      {
        name: "OSU!",
        url: "",
        icon: "osu",
        username: "nnda",
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Support",
    desc: "Gimme mone plzzz.",
    links: [
      patreon,
      {
        name: "Ko-fi",
        url: "ko-fi.com/nnda",
        icon: "kofi",
        username: nnda,
      },
      {
        name: "Liberapay",
        url: "liberapay.com/nnda",
        icon: "liberapay",
        username: nnda,
      },
      {
        name: "GitHub Sponsors",
        url: "github.com/sponsors/nndda?frequency=patreon",
        icon: "githubsponsors",
        username: nndda,
      },
    ],
  },
] as LinkGroup[];
