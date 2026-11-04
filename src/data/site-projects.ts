import { buildSvg } from "@runtime";
const
  iconsRaw = (await import("../scripts/build/icons/projects")).default
, icons = {} as PrecompiledIcons
;

type PrecompiledIcons = Record<keyof typeof iconsRaw, string>;

for (const icon in iconsRaw) {
  icons[icon] = buildSvg(iconsRaw[icon], 16, 16);
}

import type { ProjectItem } from "../scripts/sections/projects";

export default [
  {
    name: "Theatre",
    logo: "logo-theatre.svg",
    url: "https://github.com/nndda/Theatre",
    tags: [
      "Godot",
      "Plugin",
    ],
    category: "Game Development",
    platform: "N/A",
    description: "A simple, readable, and extensible (linear) text-based dialogue runtime for" + icons["godot"] + "Godot Engine.",
    menu: [
      {
        type: "link",
        icon: "book-bookmark",
        url: "https://nnda.dev/",
        text: "Documentation",
      },
      {
        type: "word-carousel",
        items: [
          icons["tag"] + "v0.13 <small>(latest)</small>",
          "<b>100% GDScript</b>",
          icons["godot"] + "Godot 4.6 or above",
        ],
      },
    ],
  },
  {
    name: "Pitch",
    logo: "logo-pitch.svg",
    url: "https://nnda.itch.io/pitch",
    tags: [
      "Web",
      "Front-end",
    ],
    category: "Web Project",
    platform: "Web",
    description: "Catalogue of<b>CSS UI components,</b>tweaks, and resources tailored specifically for" + icons["itch"] + "itch.io pages.",
    menu: [
      {
        type: "link",
        icon: "up-right-from-square",
        url: "https://nnda.dev/",
      },
      {
        type: "word-carousel",
        items: [
          icons["tag"] + "v3.0.0 <small>(latest)</small>",
          ">40 UI components ",
        ],
      },
    ],
  },
  {
    name: "Obscura",
    url: "https://nnda.itch.io/obscura",
    tags: [
      "Web",
      "Library",
    ],
    category: "Web Project",
    platform: "Web",
    description: "Image obfuscation library for the web."
  },
  {
    name: "<code>nnda.dev</code>",
    id: "nndadev",
    url: "/",
    tags: [
      "Web",
    ],
    category: "Web Project",
    platform: "Web",
    description: "This website that you're looking at"
  },
  {
    name: "<code>nnda.itch.io</code>",
    url: "https://github.com/nndda/itchio-profile",
    tags: [
      "Front-end",
    ],
    category: "Web Project",
    platform: "Web",
    description: "HTML & CSS source code and build pipelines for my itch.io profile page's content."
  },
  {
    name: "...and more!",
    id: "more",
    url: "https://nnda.itch.io/",
    tags: [],
    description: "Find more of my projects here:",
    menu: [
      {
        type: "link",
        icon: "itch",
        url: "https://nnda.dev/",
        text: "itch.io",
      },
      {
        type: "link",
        icon: "github",
        url: "https://nnda.dev/",
        text: "GitHub",
      },
    ],
  },
] as ProjectItem[];
