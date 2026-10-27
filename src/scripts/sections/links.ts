import { buildSvg, hydrate } from "@runtime";

import linksData from "../../data/site-links";
import icons from "../build/icons/links";

// TODO: some of these are redundant, unused data at runtime :/
export interface LinkGroup {
  group: string,
  desc: string,
  links: LinkGroupItem[],
  icon?: string,
}

export interface LinkGroupItem {
  name: string,
  url: string,
  username: string,
  icon?: keyof typeof icons,
  main?: true,
  inactive?: true,
}

const
  linkItems = document.querySelectorAll("#links .link-item") as NodeListOf<HTMLElement>
, linksHTMLStr: string[] = []
;

for (const group of linksData) {
  for (const link of group.links) {
    linksHTMLStr.push(`
      <a href="https://${link.url}"
        target="_blank"
        rel="me nofollow noopener noreferrer"
        referrerpolicy="no-referrer"
        data-link-name="${link.name}"
      >
        ${
          (link.icon ?? "links") in icons
            ? buildSvg(
                icons[link.icon ?? "links"],
                19, 19,
                "links",
              )
            : `<img src="${String(link.icon)}" alt="" width="19" height="19">`
        }
        <span>
          ${link.name}<br>
          <code>
            ${link.username || link.url}
          </code>
        </span>
        ${link.inactive ? buildSvg(icons["skull"], 24, 24, "inactive") : ""}
      </a>
    `);
  }
}

setTimeout(() => {
  for (let i = 0; i < linkItems.length; i++) {
    setTimeout(() => {
      hydrate(linkItems[i], linksHTMLStr[i]);
    }, Math.random() * 450);
  }
}, 500);
