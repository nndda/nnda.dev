import iconsRaw from "../build/icons/overview.socials";

interface Post {
  content: string,
  date: string,
  type: "post" | "release" | "illust" | "announcement",
  version?: string,
  title?: string,
  thumb?: string[],
  syndicate?: {
    bsky?: string,
  },
}

const
  icons: Record<string, string> = ["bsky", "mast", "likes", "replies", "shares"].reduce((accum: Record<string, string>, curr: string): Record<string, string> => {
    accum[curr] = window.buildSvg(iconsRaw[curr], 16, 16, "icon-" + curr);
    return accum;
  }, {} as Record<string, string>)

, socialListEl: HTMLElement = document.querySelector(".socials-lists>ul") as HTMLElement
;

        // ${"bsky" in post.syndicate ? icons["bsky"] : ""}
        // ${"mast" in post.syndicate ? icons["mast"] : ""}
        // <li>
        //   ${icons["replies"]}
        //   <span>2</span>
        // </li>

export default function(): void {
  import("../../post/items.json").then((res: any): void => {
    const socialListHTML: string = res.default.map((post: Post): string => {
        return `<li class="post-${post.type}">
          <div class="card">
            <div class="media">
              ${
                "thumb" in post ? (post.thumb as string[]).map((val: string): string => {
                  return `<img src="${val}">`
                }).join("") : ""
              }
            </div>
            <div class="content-container">
              <div>
                ${
                  post.type === "announcement" ? `
                    <h3 class="announcement-title">${post.title}</h3>
                  ` : ""
                }
                ${
                  post.type === "release" ? `
                    <h3 class="release-title">${post.title}</h3>
                    <h4 class="release-ver"><code>${post.version}</code></h4>
                  ` : ""
                }
                <p class="content">
                  ${post.content}
                </p>
              </div>
            </div>
            ${
              post.type === "announcement" ? "" : `
              <div class="actions">
                <div class="sources">
                    ${
                      post.type === "release" ? "<small>New release</small>" : ""
                    }
                </div>
                <div class="flex-space"></div>
                <ul class="stats nostyle">
                  <li>
                    ${icons["likes"]}
                    <span>1</span>
                  </li>
                  <li>
                    ${icons["shares"]}
                    <span>2</span>
                  </li>
                </ul>
              </div>
              `
            }
          </div>
          <small class="timestamp">
            32 days ago  
          </small>
        </li>`;
      }).join("");

    requestAnimationFrame((): void => {
      socialListEl.innerHTML = socialListHTML;

      requestAnimationFrame((): void => {
        socialListEl.classList.add("on");
      });

      // setTimeout((): void => {
      // }, 350);
    });
  });
};
