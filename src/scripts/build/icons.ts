console.log("Updating & tree-shaking icons...");

import {
  writeTextFile,
  createResolver,
  mkdir,
  cleanupDir,
  type DirResolver,
} from "./utils";
const abs: DirResolver = createResolver(__dirname);

mkdir(abs("./icons/"));
cleanupDir(abs("./icons/"));

// ----------------------------------------------------------------------------

import {
  icon,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";

import {
  faAngleDown,
  // faBox,
  // faBug,
  // faCalendar,
  faCaretDown,
  faCaretUp,
  // faChartArea,
  faCheckSquare,
  faCircleCheck,
  faClock,
  faCode,
  faCodeCommit,
  // faCodeFork,
  faComputerMouse,
  // faFire,
  faGlobe,
  faHeart,
  faLanguage,
  faLink,
  faLocationDot,
  faNoteSticky,
  faPaintBrush,
  faScaleBalanced,
  // faStar,
  faUserTag,
  faVolumeHigh,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquare,
  faCircle,
} from "@fortawesome/free-regular-svg-icons";

import {
    faTwitter,
  faWindows
} from "@fortawesome/free-brands-svg-icons";

// ----------------------------------------------------------------------------

import {
  siApple,
  siArtstation,
  siAseprite,
  siBluesky,
  siCloudflare,
  // siCloudflarepages,
  // siCloudflareworkers,
  siCss,
  siGit,
  siGithub,
  // siGithubactions,
  siGithubsponsors,
  siGodotengine,
  siHandlebarsdotjs,
  siHtml5,
  siInkscape,
  siItchdotio,
  // siJavascript,
  siKofi,
  siLiberapay,
  siLinux,
  // siMacos,
  siMastodon,
  siMedibangpaint,
  siNodedotjs,
  siOsu,
  siPatreon,
  siPython,
  siRust,
  siSass,
  siTiktok,
  siTypescript,
  siWebpack,
  siYoutube,
  // siX,
  type SimpleIcon,
} from "simple-icons";

// ----------------------------------------------------------------------------

function toHTML(name: IconDefinition): string {
  return icon(name).html.join();
}

function fa2HTML(name: IconDefinition): string {
  return icon(name).html.join();
}

function clearAndUpper(str: string) {
  return str.replace(/-/, "").toUpperCase();
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, clearAndUpper);
}

function createIconDefs(filename: string, icons: IconDefinition[]): void {
  writeTextFile(abs(`./icons/${filename}.js`),
    icons.map(ico => {
      return `export const icon${toPascalCase(ico.iconName)}=\`${toHTML(ico)}\``;
    }).join(";")
  );
}

const
  reOuterSvg: RegExp = /(^<svg\s[^>]*>|<\/svg>$|<title>.*?<\/title>)/g
, reVb: RegExp = /viewBox="(?<vb>[\s0-9]+?)"/
, rePathD: RegExp = /d="(?<d>.+?)"/
;

function parseCompressSvg(svgStr: string): string {
  return `["`
    +
    ((reVb.exec(svgStr) as RegExpExecArray).groups as {[key: string]: string})["vb"]
    +
    `",\``
    +
    svgStr.replace(reOuterSvg, "")
    +
    `\`]`
  ;
}

function svgMin2path(svgStr: string): [string, string] {
  return [
    ((reVb.exec(svgStr) as RegExpExecArray).groups as {[key: string]: string})["vb"],
    ((rePathD.exec(svgStr.replace(reOuterSvg, "")) as RegExpExecArray).groups as {[key: string]: string})["d"],
  ];
}

function createIconDefsGrouped(
  groupName: string,
  faIcons: IconDefinition[] = [],
  siIcons: SimpleIcon[] = [],
  iconsOther: Record<string, string> = {},
  ): void {
  writeTextFile(abs(`./icons/${groupName}.js`),
    `export default () => {window.p("${groupName}",{`
    +
    [
      ...faIcons.map(ico => {
        return `"${ico.iconName}": ${parseCompressSvg(fa2HTML(ico))}`
        // return `"${ico.iconName}": \`${fa2HTML(ico).replace(reAttr, "")}\``
      }),
      ...siIcons.map(ico => {
        return `"${ico.slug}": ${parseCompressSvg(ico.svg)}`
        // return `"${ico.slug}": \`${ico.svg.replace(reAttr, "")}\``
      }),
      ...Object.entries(iconsOther)
        .map(([ico, svg]) => {
          return `"${ico}": ${parseCompressSvg(svg)}`
          // return `"${ico}": \`${svg.replace(reAttr, "")}\``
        }),
    ].join(",")
    +
    "});};"
  );
}

function createMiniIconDefs(filename: string, iconDefs: Record<string, string>): void {
  writeTextFile(abs(`./icons/${filename}.js`), `export default ${
    JSON.stringify(
      Object.entries(iconDefs).reduce(
        (
          acc: Record<string, [string, string]>,
          val: [string, string]
        ): Record<string, [string, string]> => {
          acc[val[0]] = svgMin2path(val[1]);
          return acc;
        },
        {} as Record<string, [string, string]>,
      )
    )
  };`);
}

createIconDefs(
  "icons",
  [
    faCaretDown,
    faCaretUp,
    faCheckSquare,
    faCircle,
    faCircleCheck,
    faSquare,
    faX,
  ],
);

createIconDefsGrouped(
  "home",
  [
    faAngleDown,
    faComputerMouse,
    faPaintBrush,
  ],
  [
    siPatreon,
  ]
);

createIconDefsGrouped(
  "profile",
  [
    faClock,
    faLanguage,
    faLocationDot,
    faUserTag,
    faVolumeHigh,
  ],
);

// createIconDefsGrouped(
//   "overview",
//   [
//     faCalendar,
//     faChartArea,
//     faFire,
//   ],
//   [],
//   siAliases
// );

// createIconDefsGrouped(
//   "links",
//   [
//     faLink,
//   ],
//   [
//     siArtstation,
//     siBluesky,
//     siGithub,
//     siItchdotio,
//     siKofi,
//     siLiberapay,
//     siMastodon,
//     siPatreon,
//     siX,
//   ],
// );

createIconDefsGrouped(
  "footer",
  [
    // faBox,
    // faBug,
    faClock,
    faCode,
    faCodeCommit,
    // faCodeFork,
    faNoteSticky,
    faScaleBalanced,
    // faStar,
  ],
);

// createIconDefsGrouped(
//   "global",
//   [
//   ],
//   [
//     siArtstation,
//     siGithub,
//     siItchdotio,
//   ],
// );

createMiniIconDefs("overview", {
  "Aseprite": siAseprite.svg,
  "Cloudflare": siCloudflare.svg,
  // "Cloudflare Pages": siCloudflarepages.svg,
  // "Cloudflare Workers": siCloudflareworkers.svg,
  "CSS": siCss.svg,
  "GDScript": siGodotengine.svg,
  "Git": siGit.svg,
  // "GitHub Actions": siGithubactions.svg,
  "Handlebars": siHandlebarsdotjs.svg,
  "HTML": siHtml5.svg,
  "Inkscape": siInkscape.svg,
  // "JavaScript": siJavascript.svg,
  "Linux": siLinux.svg,
  "Medibang Paint": siMedibangpaint.svg,
  "Node.js": siNodedotjs.svg,
  "Python": siPython.svg,
  "SCSS": siSass.svg,
  "Rust": siRust.svg,
  "TypeScript": siTypescript.svg,
  "webpack": siWebpack.svg,
});

createMiniIconDefs("links", {
  "links": toHTML(faLink),
  "heart": toHTML(faHeart),
  "github": siGithub.svg,
  "githubsponsors": siGithubsponsors.svg,
  "itchdotio": siItchdotio.svg,
  "artstation": siArtstation.svg,
  "mastodon": siMastodon.svg,
  "twitter": toHTML(faTwitter),
  "bluesky": siBluesky.svg,
  "osu": siOsu.svg,
  "patreon": siPatreon.svg,
  "kofi": siKofi.svg,
  "liberapay": siLiberapay.svg,
  "tiktok": siTiktok.svg,
  "youtube": siYoutube.svg,
});

createMiniIconDefs("shop", {
  "globe": toHTML(faGlobe),
  "CSS": siCss.svg,
  "Godot": siGodotengine.svg,
  "itch.io": siItchdotio.svg,
  "MacOS": siApple.svg,
  "Windows": toHTML(faWindows),
  "GitHub": siGithub.svg,
  "ko-fi": siKofi.svg,
  "Patreon": siPatreon.svg,
  // Linux Tux Icon by IcoMoon - https://icomoon.io - Copyright 2025 IcoMoon.io - licensed under CC BY-SA 4.0
  "Linux": `
    <svg viewBox="0 0 512 512">
      <path d="M283.828 368.458c-40.972 19.059-79.079 18.858-104.67 17.010-30.526-2.205-55.079-10.562-65.871-17.866-6.65-4.503-15.692-2.761-20.195 3.891-4.502 6.651-2.76 15.693 3.891 20.195 17.349 11.743 48.034 20.477 80.081 22.79 5.433 0.392 11.399 0.639 17.823 0.639 27.891 0 63.313-2.658 101.21-20.285 7.282-3.389 10.439-12.037 7.052-19.32s-12.038-10.436-19.321-7.054zM445.474 346.908c1.393-126.344 14.381-365.103-227.485-345.806-238.8 19.221-175.482 271.484-179.041 355.975-3.154 44.693-17.989 99.324-38.948 154.923h64.55c6.633-23.561 11.512-46.86 13.616-69.075 3.891 2.714 8.054 5.337 12.497 7.85 7.229 4.259 13.442 9.922 20.020 15.917 15.372 14.009 32.795 29.887 66.856 31.876 2.286 0.131 4.587 0.197 6.838 0.197 34.448 0 58.007-15.077 76.939-27.191 9.070-5.806 16.909-10.82 24.282-13.226 20.955-6.56 39.266-17.148 52.952-30.626 2.138-2.104 4.121-4.269 5.981-6.474 7.623 27.939 18.059 59.379 29.644 90.752h137.825c-33.087-51.112-67.218-101.187-66.526-165.092zM62.055 278.176c0-0.008 0-0.015-0.001-0.023-2.373-41.231 17.355-75.916 44.063-77.468 26.706-1.553 50.28 30.614 52.652 71.846 0 0.007 0.002 0.015 0.002 0.022 0.128 2.223 0.184 4.423 0.185 6.603-8.462 2.128-16.096 5.218-22.936 8.815-0.026-0.306-0.046-0.608-0.076-0.915 0-0.004 0-0.009 0-0.013-2.285-23.405-14.786-41.080-27.926-39.479-13.14 1.602-21.94 21.875-19.656 45.279 0 0.005 0.002 0.009 0.002 0.013 0.996 10.204 3.934 19.318 8.021 26.222-1.017 0.802-3.892 2.906-7.203 5.328-2.485 1.817-5.51 4.029-9.157 6.715-9.941-13.047-16.753-31.79-17.97-52.945zM332.63 380.089c-0.95 21.793-29.454 42.296-55.791 50.522l-0.148 0.048c-10.95 3.551-20.714 9.8-31.052 16.415-17.366 11.112-35.323 22.604-61.261 22.604-1.702 0-3.447-0.052-5.163-0.148-23.758-1.389-34.871-11.516-48.94-24.338-7.421-6.763-15.095-13.757-24.988-19.562l-0.212-0.122c-21.353-12.052-34.606-27.041-35.454-40.097-0.421-6.49 2.469-12.109 8.591-16.7 13.318-9.986 22.239-16.511 28.142-20.829 6.555-4.794 8.534-6.24 10-7.632 1.048-0.993 2.182-2.094 3.402-3.281 12.223-11.887 32.68-31.781 64.075-31.781 19.202 0 40.449 7.4 63.085 21.951 10.662 6.939 19.941 10.143 31.69 14.2 8.078 2.789 17.234 5.951 29.496 11.202l0.198 0.082c11.44 4.702 24.948 13.282 24.33 27.466zM326.323 328.903c-2.2-1.107-4.487-2.16-6.872-3.143-11.053-4.728-19.916-7.937-27.267-10.499 4.058-7.947 6.58-17.86 6.812-28.621 0-0.005 0-0.011 0-0.015 0.563-26.187-12.644-47.448-29.498-47.488-16.855-0.039-30.975 21.157-31.538 47.343 0 0.005 0 0.009 0 0.014-0.019 0.857-0.021 1.708-0.010 2.555-10.381-4.776-20.59-8.245-30.583-10.38-0.046-0.984-0.102-1.966-0.122-2.96 0-0.008 0-0.018 0-0.025-0.969-47.706 28.301-87.195 65.377-88.201 37.075-1.007 67.914 36.85 68.886 84.555 0 0.009 0 0.019 0 0.026 0.437 21.573-5.33 41.433-15.185 56.839z"></path>
    </svg>`,
});

console.log("Finished updating & tree-shaking icons.");
