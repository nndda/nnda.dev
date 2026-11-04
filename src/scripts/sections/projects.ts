import { buildSvg } from "@runtime";
import projectsData from "../../data/site-projects";

const icons = (await import("../build/icons/projects")).default;

export interface ProjectItem {
  name: string,
  id?: string,
  logo?: string,
  url: string,
  description: string,
  tags: string[],
  category?: string,
  platform?: string,
  classes?: string,
  xtraHTML?: string,
  // size?: "large" | "medium",

  menu?: (
    ProjectMenuItemLink |
    ProjectMenuWordCarousel
  )[],
}

export interface ProjectMenuItemLink {
  type: "link",
  icon: string,
  url: string,
  text: string,
}

export interface ProjectMenuWordCarousel {
  type: "word-carousel",
  items: string[],
}

const
  projEls = document.querySelectorAll("#projects .project-items > li") as NodeListOf<HTMLLIElement>
, headingIcon = buildSvg(icons["up-right-from-square"], 24, 24)
;

for (let n = projectsData.length; 0 < n--;) {
  const
    data = projectsData[n]
  , el = projEls[n]
  , html = `${[
    ]}<h2 class="project-title">${[

      ]}<a href="${data.url}" ${data.url.startsWith("https://") ? `target="_blank"` : ""} rel="noopener noreferrer" referrerpolicy="origin">${
          (
            data.logo ? `<img width="40" height="40" src="${data.logo}">` : ""
          ) + data.name + headingIcon
      }</a>${[

    ]}</h2>${[

      ]}<ul class="labels-container nostyle">${
          data.tags.map((val: string) => {
            return `<li class="project-label ${val}">${val}</li>`;
          }).join("")
      }</ul>${[

      ]}<p>${data.description}</p>` + (
      data.menu ? `<ul class="project-menu nostyle">${
        data.menu.map(item => {
          return "<li>" + (

              item.type === "link"
            ? (
                `<a href=${item.url} target="_blank" rel="noopener noreferrer" referrerpolicy="origin" class="${item.text ? "icon-text" : "icon-only"}">` + buildSvg(icons[item.icon], 24, 24) + (item.text || "") + `</a>`
              )

            : item.type === "word-carousel"
            ? (
                `<ul class="word-carousel nostyle">` + item.items.map(n => {
                  return `<li class="icon-text">` + n + "</li>";
                }).join("") + "</ul>"
              )

            : ""
          ) + "</li>";
        }).join("")
      }</ul>` : ""
     )
    ;

  el.innerHTML = html;
}

for (const el of projEls) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      el.classList.add("loaded");
    });
  }, 150 + Math.random() * 320);
}
