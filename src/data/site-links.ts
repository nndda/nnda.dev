import type {
  LinkGroup,
  LinkGroupItem,
} from "../scripts/sections/links";

const
  // Common usernames
  nnda = "nnda"
, nndda = "nndda"
, at_nnda = "@" + nnda
, at_nnda_dev = at_nnda + "_dev"
;

// duplicates
const patreon: LinkGroupItem = {
  name: "Patreon",
  url: "patreon.com/nnda",
  icon: "patreon",
  username: nnda,
  main: true,
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
        main: true,
      },
      patreon,
      {
        name: "TikTok",
        url: "tiktok.com/@nnda.dev",
        icon: "tiktok",
        username: "@nnda.dev",
        inactive: true,
      },
      {
        name: "YouTube",
        url: "youtube.com/@nnda_dev",
        icon: "youtube",
        username: at_nnda_dev,
        inactive: true,
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Socials",
    desc: "Places to yell at me.",
    links: [
      {
        name: "Bluesky",
        url: "bsky.app/profile/nnda.dev",
        icon: "bluesky",
        username: "@nnda.dev",
      },
      {
        name: "Mastodon",
        url: "mastodon.art/@nnda",
        icon: "mastodon",
        username: at_nnda,
        inactive: true,
      },
      {
        name: "Twitter",
        url: "twitter.com/@nnda_dev",
        icon: "twitter",
        username: at_nnda_dev,
        inactive: true,
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Artworks & Illustrations",
    desc: "Anime girls, cats, and anime catgirls drawing.",
    links: [
      {
        name: "ArtStation",
        url: "artstation.com/nnda",
        icon: "artstation",
        username: nnda,
      },
      {
        name: "VGen",
        url: "vgen.co/nnda",
        icon: "./icons/vgen.avif",
        username: at_nnda,
        inactive: true,
      },
      {
        name: "cara.app",
        url: "cara.app/nnda",
        username: nnda,
        inactive: true,
      },
    ],
  },
  {
    group: "Gaming",
    desc: "Occasional & recreational drum smashing.",
    links: [
      {
        name: "OSU!",
        url: "osu.ppy.sh/users/10614731",
        icon: "./icons/osu.avif",
        username: nnda,
        inactive: true,
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Support",
    desc: "Gimme mone plzzz.",
    icon: "heart",
    links: [
      patreon,
      {
        name: "Ko-fi",
        url: "ko-fi.com/nnda",
        icon: "./icons/ko-fi.avif",
        username: nnda,
      },
      // {
      //   name: "Liberapay",
      //   url: "liberapay.com/nnda",
      //   icon: "liberapay",
      //   username: nnda,
      // },
      // {
      //   name: "GitHub Sponsors",
      //   url: "github.com/sponsors/nndda?frequency=patreon",
      //   icon: "githubsponsors",
      //   username: nndda,
      // },
    ],
  },
] as LinkGroup[];
