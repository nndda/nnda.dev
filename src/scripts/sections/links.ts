import linksData from "../../data/site-links";
import icons from "../build/icons/links";

interface LinkGroup {
  group: string,
  desc: string,
  links: LinkGroupItem[],
}

interface LinkGroupItem {
  name: string,
  url: string,
  username: string,
  icon?: string,
}

function buildSvg(viewBoxPath: string[], width: number, height: number, classes: string = ""): string {
  return `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxPath[0]}" width="${width}" height="${height}" class="${classes}"><path d="${viewBoxPath[1]}"></path></svg>`;
}

const
  d: Document = document

, linksStrEl: string =
    linksData.map((data: LinkGroup, i: number): string => {
      return `
        <div class="links-group link-${i}">
          <div class="links-title anim once fade float-up">
            ${data.group === "Support" ? buildSvg(icons["heart"], 22, 26, "heartbeat") : ""}
            ${data.group}
          </div>
          <p class="links-desc">
            ${data.desc}
          </p>
          <ul class="nostyle">
            ${
              data.links.map(
                (link: LinkGroupItem) => {
                  return `
                    <li class="
                        anim once
                        link-item
                        ${link.icon || "default"}
                      "
                    >
                      <a href="https://${link.url}"
                        target="_blank"
                        rel="me nofollow noopener noreferrer"
                        referrerpolicy="no-referrer"
                        aria-label="${link.name}"
                      >
                        <div class="social-icon">
                          ${buildSvg(icons[((link.icon === undefined) ? "links" : link.icon)], 19, 19, "links")}
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

, linkSectInner: HTMLElement = d.querySelector("#links>.section-inner") as HTMLElement
;

linkSectInner.classList.remove("on");

setTimeout((): void => {
  requestAnimationFrame((): void => {
    linkSectInner.innerHTML = linksStrEl;
    linkSectInner.classList.remove("has-loader");

    linkSectInner.classList.add("on");

    window.initAnim(linkSectInner);
  });
}, 500);
