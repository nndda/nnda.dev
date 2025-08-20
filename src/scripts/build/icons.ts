// BUILD SCRIPT

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
  faBox,
  faBug,
  faCalendar,
  faCaretDown,
  faCaretUp,
  faChartArea,
  faCheckSquare,
  faCircleCheck,
  faClock,
  faCode,
  faCodeCommit,
  faCodeFork,
  faComputerMouse,
  faFire,
  faLanguage,
  faLink,
  faLocationDot,
  faNoteSticky,
  faPaintBrush,
  faScaleBalanced,
  faStar,
  faUserTag,
  faVolumeHigh,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquare,
  faCircle,
} from "@fortawesome/free-regular-svg-icons";

// ----------------------------------------------------------------------------

import {
  siArtstation,
  siAseprite,
  siBluesky,
  siCloudflare,
  // siCloudflarepages,
  // siCloudflareworkers,
  siCss,
  siGit,
  siGithub,
  siGithubactions,
  siGodotengine,
  siHandlebarsdotjs,
  siHtml5,
  siInkscape,
  siItchdotio,
  siJavascript,
  siKofi,
  siLiberapay,
  siLinux,
  siMastodon,
  siMedibangpaint,
  siNodedotjs,
  siPatreon,
  siPython,
  siRust,
  siSass,
  siTypescript,
  siWebpack,
  siX,
  type SimpleIcon
} from "simple-icons";

const siAliases: Record<string, string> = {
  "Aseprite": siAseprite.svg,
  "Cloudflare": siCloudflare.svg,
  // "Cloudflare Pages": siCloudflarepages.svg,
  // "Cloudflare Workers": siCloudflareworkers.svg,
  "CSS": siCss.svg,
  "GDScript": siGodotengine.svg,
  "Git": siGit.svg,
  "GitHub Actions": siGithubactions.svg,
  "Handlebars": siHandlebarsdotjs.svg,
  "HTML": siHtml5.svg,
  "Inkscape": siInkscape.svg,
  "JavaScript": siJavascript.svg,
  "Linux": siLinux.svg,
  "Medibang Paint": siMedibangpaint.svg,
  "Node.js": siNodedotjs.svg,
  "Python": siPython.svg,
  "SCSS": siSass.svg,
  "Rust": siRust.svg,
  "TypeScript": siTypescript.svg,
  "webpack": siWebpack.svg,
}

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

createIconDefsGrouped(
  "overview",
  [
    faCalendar,
    faChartArea,
    faFire,
  ],
  [],
  siAliases
);

createIconDefsGrouped(
  "links",
  [
    faLink,
  ],
  [
    siArtstation,
    siBluesky,
    siGithub,
    siItchdotio,
    siKofi,
    siLiberapay,
    siMastodon,
    siPatreon,
    siX,
  ],
);

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