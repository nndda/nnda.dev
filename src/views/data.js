const {
  siItchdotio,
  siGithub,
  siMastodon,
  siCodepen,
  siPatreon,
  siKofi,
} = require("simple-icons");

const { icon } = require("@fortawesome/fontawesome-svg-core");
const {
  faCode,
  faBars,
  faCodeFork,
  faStar,
  faBug,
  faXmark,
  faScaleBalanced,
} = require("@fortawesome/free-solid-svg-icons");

function i(icon_name) {
  return icon(icon_name).html;
}

function urlStr(url) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
}

const repoURL = "https://github.com/nndda/website";

module.exports = {
  "repoURL": repoURL,
	nav: {
    links: [
      {
        name: "Home",
        url: "#home",
      },
      {
        name: "About",
        url: "#about",
      },
      {
        name: "Projects",
        url: "#projects",
      },
      {
        name: "Artworks",
        url: "#artworks",
      },
      {
        name: siItchdotio.svg,
        url: urlStr("nnda.itch.io"),
        external: true,
      },
      {
        name: siGithub.svg,
        url: urlStr("github.com/nndda"),
        external: true,
      },
    ],
  },

  socials: [
    {
      name: "GitHub",
      url: urlStr("github.com/nndda"),
      icon: siGithub.svg,
    },
    {
      name: "itch.io",
      url: urlStr("nnda.itch.io"),
      icon: siItchdotio.svg,
    },
    {
      name: "Mastodon",
      url: urlStr("mastodon.art/@nnda"),
      icon: siMastodon.svg,
    },
    {
      name: "CodePen",
      url: urlStr("codepen.io/nnda"),
      icon: siCodepen.svg,
    },
  ],

  projects: [
    {
      name: "Project I",
      description: "Project description goes here...",
    },
    {
      name: "Project II",
      description: "Project description goes here...",
    },
    {
      name: "Project III",
      description: "Project description goes here...",
    },
    {
      name: "Project IV",
      description: "Project description goes here...",
    },
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
    .map((_d, i) => {
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
}