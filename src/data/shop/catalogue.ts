export default {
  "indie-games-cont": [
    {
      name: "Paws & Plates",
      desc: "Cook chicken nuggets & avoid cats.",
      price: 0,
      mainURL: "https://nnda.itch.io/",
      // thumb: "",
      thumb: "https://img.itch.zone/aW1nLzE4NDQ4NTc1LnBuZw==/315x250%23c/bI%2Bpde.png",
      platforms: ["Linux", "MacOS", "Windows"],
      platformsGet: {
        "itch.io": "https://nnda.itch.io/",
        "GitHub": "https://github.com/nndda",
      },
    },
    {
      name: "In Plain Sight",
      desc: "#Visual Novel",
      price: 0,
      mainURL: "https://nnda.itch.io/",
      // thumb: "",
      thumb: "https://img.itch.zone/aW1nLzE2OTE4Njg5LnBuZw==/315x250%23c/m%2BRMvi.png",
      platforms: ["Linux", "MacOS", "Windows"],
      platformsGet: {
        "itch.io": "https://nnda.itch.io/",
        "GitHub": "https://github.com/nndda",
      }
    },
    {
      name: "Timekeeper",
      desc: "You are a caretaker of The Timekeeper. Keep its gearwheel running.",
      price: 0,
      mainURL: "https://nnda.itch.io/",
      // thumb: "",
      thumb: "https://img.itch.zone/aW1nLzExOTc4NTgwLnBuZw==/315x250%23c/MMaSju.png",
      platforms: ["Linux", "MacOS", "Windows"],
      platformsGet: {
        "itch.io": "https://nnda.itch.io/",
        "GitHub": "https://github.com/nndda",
      }
    },
  ],

  "tools-plugins-cont": [
    {
      name: "Theatre",
      desc: "🎭 Yet another (linear) dialogue system/addon/plugin for Godot. Written in human-readable plain text.",
      price: 0,
      mainURL: "https://nnda.itch.io/",
      thumb: "",
      platforms: ["Godot"],
      platformsGet: {
        "itch.io": "https://nnda.itch.io/",
        "GitHub": "https://github.com/nndda",
      }
    },
    {
      name: "Pitch",
      desc: "🧩 Collection of UI components and tweaks, designed specifically for itch.io project pages. Written in SCSS.",
      price: 0,
      mainURL: "https://nnda.itch.io/pitch",
      thumb: "",
      platforms: ["CSS"],
      platformsGet: {
        "itch.io": "https://nnda.itch.io/",
        "GitHub": "https://github.com/nndda",
      }
    },
  ],
} as Record<string, ShopItem[]>;

import type { ShopItem } from "../../scripts/_pages/shop/d";
