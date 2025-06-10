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
    linksData.map((data: LinkGroup): string => {
      return `
        <div class="links-group">
          <div class="links-title anim once fade float-up">${data.group}</div>
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

                        <span class="social-name">${link.name}</span>

                        <small class="username">
                          ${link.username || link.urlS}
                        </small>
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
