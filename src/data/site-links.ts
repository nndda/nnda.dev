const
  nnda: string = "nnda" // Common username
;

export default [
  { // ------------------------------------------------------------------------
    group: "My Main Works",
    desc: "Everything I do.",
    links: [
      {
        name: "GitHub",
        url: "github.com/nndda",
        icon: "github",
        username: "nndda",
      },
      {
        name: "itch.io",
        url: "nnda.itch.io",
        icon: "itchdotio",
        username: nnda,
      },
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
        icon: "x",
        username: "@nnda_dev",
      },
      {
        name: "Bluesky",
        url: "bsky.app/profile/nnda.dev",
        icon: "bluesky",
        username: "@nnda.dev",
      },
    ],
  },
  { // ------------------------------------------------------------------------
    group: "Support",
    desc: "Gimme mone plzzz.",
    links: [
      {
        name: "Patreon",
        url: "patreon.com/nnda",
        icon: "patreon",
        username: nnda,
      },
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
    ],
  },
] as {
  group: string,
  desc: string,
  links: {
    name: string,
    url: string,
    icon: string,
    username: string,
  }[]
}[];
