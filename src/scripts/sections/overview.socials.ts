// import iconsRaw from "../build/icons/overview.socials";
import type { Post } from "../../data/social-posts";

const
  // icons: Record<string, string> = ["bsky", "mast", "likes", "replies", "shares"].reduce((accum: Record<string, string>, curr: string): Record<string, string> => {
  //   accum[curr] = window.buildSvg(iconsRaw[curr], 16, 16, "icon-" + curr);
  //   return accum;
  // }, {} as Record<string, string>)

  socialListEl: HTMLElement = document.querySelector(".socials-lists>ul") as HTMLElement
;

        // ${"bsky" in post.syndicate ? icons["bsky"] : ""}
        // ${"mast" in post.syndicate ? icons["mast"] : ""}
        // <li>
        //   ${icons["replies"]}
        //   <span>2</span>
        // </li>

export default function(): void {
  fetch("/posts-feed.json")
    .then((res: Response): Promise<Post[]> => {return res.json()})
    .then((data: Post[]): void => {
      const socialListHTML: string = data.map((post: Post): string => {
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
                  <div class="content">
                    ${post.content}
                  </div>
                </div>
              </div>
            </div>
            <small class="timestamp">
              32 days ago
            </small>
          </li>`;
        }).join("");

  // ${
  //               post.type === "announcement" ? "" : `
  //               <div class="actions">
  //                 <div class="sources">
  //                     ${
  //                       post.type === "release" ? "<small>New release</small>" : ""
  //                     }
  //                 </div>
  //                 <div class="flex-space"></div>

  //                 <ul class="stats nostyle">
  //                   <!--
  //                   <li>
  //                     ${icons["likes"]}
  //                     <span>1</span>
  //                   </li>
  //                   <li>
  //                     ${icons["shares"]}
  //                     <span>2</span>
  //                   </li>
  //                   -->
  //                 </ul>

  //               </div>
  //               `
  //             }

      requestAnimationFrame((): void => {
        socialListEl.innerHTML = socialListHTML;

        // (document.querySelector(".socials-lists") as HTMLElement).insertAdjacentHTML("afterend", `
        //   <div class="social-see-more">
        //     <hr class="hr">

        //     <input type="checkbox" name="social-see-more" id="social-see-more">
        //     <label for="social-see-more" class="button">
        //       <span class="closed">See more...</span>
        //       <span class="open">See less...</span>
        //     </label>

        //     <hr class="hr">
        //   </div>
        // `);

        requestAnimationFrame((): void => {
          socialListEl.classList.add("on");
        });

        // setTimeout((): void => {
        // }, 350);
      });
    })
  ;
};
