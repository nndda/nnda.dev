// Overview section's tech stacks =============================================
export default [
  {
    group: "語",
    // icon: "code",
    items: [
      "TypeScript",
      // "JavaScript",
      "Python",
      "Rust",
    ],
  },
  {
    group: "ウェブ",
    // icon: "server",
    items: [
      "Node.js",
      "webpack",
      // "CSS",
      "SCSS",
      "Cloudflare",
      // "Cloudflare Pages",
      // "Cloudflare Workers",
    ],
  },
  {
    group: "ツール",
    // icon: "toolbox",
    items: [
      "Linux",
      "Git",
      "GitHub Actions",
    ],
  },
  {
    group: "イラスト",
    // icon: "paintbrush",
    items: [
      "Medibang Paint",
      "Inkscape",
    ],
  },
  {
    group: "ゲーム",
    // icon: "gamepad",
    items: [
      "GDScript",
      "Aseprite",
    ],
  },
] as StacksData[];

export interface StacksData {
  group: string,
  items: string[]
}
