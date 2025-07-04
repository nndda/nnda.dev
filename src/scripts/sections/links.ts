import linksData from "../build/links.json" with { type: "json" };
import initIcon from "../build/icons/links";

interface LinkGroup {
  group: string,
  links: LinkGroupItem[],
}

interface LinkGroupItem {
  name: string,
  url: string,
  urlS?: string,
  username?: string,
  icon?: string,
  iconSlug?: string,
}

const
  d: Document = document

, linksStrEl: string =
    linksData.map((data: LinkGroup, i: number): string => {
      return `
        <div class="links-group link-${i}">
          <div class="links-title anim once fade float-up">
            ${
              data.group === "Support" ? `
                <svg
                  class="heartbeat"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                </svg>`
              : ""
            }
            ${data.group}
          </div>
          <ul class="nostyle">
            ${
              data.links.map(
                (link: LinkGroupItem) => {
                  return `
                    <li class="
                        anim once
                        link-item
                        ${link.iconSlug || "default"}
                      "
                    >
                      <a href="${link.url}"
                        target="_blank"
                        rel="me nofollow noopener noreferrer"
                        referrerpolicy="no-referrer"
                        aria-label="${link.name}"
                      >
                        <div class="social-icon">
                          ${link.icon || `<i class="links" data-i="link"></i>`}
                        </div>

                        <div class="social-info">
                          <div>${link.name}</div>

                          <small class="username">
                            ${link.username || link.urlS}
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

    initIcon();

    linkSectInner.classList.add("on");

    window.initAnim(linkSectInner);
  });
}, 500);
