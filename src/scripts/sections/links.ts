import { buildSvg, initAnim } from "../framework";

import linksData from "../../data/site-links";
import icons from "../build/icons/links";

export interface LinkGroup {
  group: string,
  desc: string,
  links: (LinkGroupItem | "br")[],
}

export interface LinkGroupItem {
  name: string,
  url: string,
  username: string,
  icon?: keyof typeof icons,
}

const
  d: Document = document

, linksStrEl: string =
    linksData.map((data: LinkGroup, i: number): string => {
      return `
        <div class="links-group link-${i}">
          <h3 class="links-title anim once fade float-up">
            ${data.group === "Support" ? buildSvg(icons["heart"], 22, 26, "heartbeat") : ""}
            ${data.group}
          </h3>
          <p class="links-desc anim once fade float-up">
            ${data.desc}
          </p>
          <ul class="nostyle">
            ${
              data.links.map(
                (link: LinkGroupItem | "br") => {
                  if (link === "br") return `<div class="flex-break"></div>`;

                  return `
                    <li class="anim once link-item" data-link-name="${link.name}">
                      <a href="https://${link.url}"
                        target="_blank"
                        rel="me nofollow noopener noreferrer"
                        referrerpolicy="no-referrer"
                      >
                        <div class="social-icon">
                          ${
                            (link.icon ?? "links") in icons
                              ? buildSvg(
                                  icons[link.icon ?? "links"],
                                  19, 19,
                                  "links",
                                )
                              : `<img src="${link.icon}" alt="" width="19" height="19">`
                          }
                        </div>

                        <div class="social-info">
                          <div>${link.name}</div>

                          <small class="username">
                            ${link.username || link.url}
                          </small>
                        </div>
                      </a>
                    </li>
                  `;
                }
              ).join("")
            }
          </ul>
        </div>
        `;
    }).join("")

, linkSectInner: HTMLElement = d.querySelector("#links>.section-inner")!
;

linkSectInner.classList.remove("on");

setTimeout((): void => {
  requestAnimationFrame((): void => {
    linkSectInner.innerHTML = linksStrEl;
    linkSectInner.classList.remove("has-loader");

    linkSectInner.classList.add("on");

    initAnim(linkSectInner);
  });
}, 500);
