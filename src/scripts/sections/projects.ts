import { initAnim } from "../framework";
import projectsData from "../../data/site-projects";

export interface ProjectItem {
  name: string,
  logo?: string,
  url: string,
  description: string,
  tags: string[],
  category: string,
  platform: string,
  classes?: string,
  xtraHTML?: string,
  // size?: "large" | "medium",
}
//
// ${
//   Object.hasOwn(data, "xtraHTML") ? `
//     <div class="xtra">
//       ${data.xtraHTML}
//     </div>
//   ` : ""
// }

const
  projectsStrEl =
    projectsData.map((data: ProjectItem): string => {
      return `
      <li
        class="project anim fade float-up card ${"classes" in data ? data.classes : ""}" data-name="${data.name}"
      >

        <h2 class="
          project-title
          ">
          <a href="${data.url}"
            target="_blank"
            rel="noopener noreferrer"
            referrerpolicy="origin"
          >
            ${
              "logo" in data ? `
                <img width="40" height="40" src="${data.logo}">
              ` : ""
            }
            ${data.name}
          </a>
        </h2>

        <ul class="labels-container nostyle">
          ${
            data.tags.map((val: string) => {
              return `
                <li class="project-label ${val}" data-tag="${val}">${val}</li>
              `;
            }).join("")
          }
        </ul>

        <p>${data.description}</p>
      </li>

        `;
    }).join("")

, projectSectInner: HTMLElement = document.querySelector("#projects .project-items")!
;

projectSectInner.classList.remove("on");

setTimeout(() => {
  requestAnimationFrame(() => {
    projectSectInner.innerHTML = projectsStrEl;
    initAnim(projectSectInner);

    projectSectInner.classList.remove("has-loader");
  });
}, 500);
