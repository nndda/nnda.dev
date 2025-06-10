// import { eventForElements } from "../input";
// import { iconX } from "../build/icons/icons";

// const d = document;

// function initContentControls(
//   btnCategories: HTMLElement[] | NodeListOf<Element>,
//   btnTags: HTMLElement[] | NodeListOf<Element>,
// ): void {

// }

// Tags -----------------------------------------------------------------------------------------

// interface iTagsData {
//   elem: HTMLElement,
//   tags: string[],
// }

// const tagsData: iTagsData[] = [];

// let tagsCurrent: string[] = [];

// function filterTags(tags: string[]): void {
//   tagsData.forEach(item => {
//     item.elem.classList.toggle("hidden",
//       tags.length > 0 ? 
//       !item.tags.some(tag => tags.includes(tag)) : false
//     );
//   });
// }

// // Category -------------------------------------------------------------------------------------

// function initContentCategory(
//   catsDropdownBtn: HTMLElement,
//   catsContents: HTMLElement[] | NodeListOf<Element>,
//   callbackfn: (elem: Element) => void = () => {},
// ): void {
//   const
//     catsData: Record<string, HTMLElement[]> = {},
//     catDisplay: HTMLElement = catsDropdownBtn.querySelector(".text-display") as HTMLElement,
//     catToggles: NodeListOf<Element> = (catsDropdownBtn.parentElement as HTMLElement).querySelectorAll("input[type=\"radio\"]");

//   let currentCat: string = "";

//   catsContents.forEach(elem => {
//     const catName: string = elem.getAttribute("data-project-cat") as string;

//     if (!Object.prototype.hasOwnProperty.call(catsData, catName)) {
//       catsData[catName] = []
//     }

//     catsData[catName].push(elem as HTMLElement);
//   });

//   function toggleCatElem(elem: HTMLElement, cat: string, catName: string): void {
//     elem.classList.toggle("hidden", catName === "All" ? false : cat !== catName);
//   }

//   function toggleCat(catName: string): void {
//     currentCat = catName;

//     for (const cat in catsData) {
//       catsData[cat].forEach(elem => {
//         toggleCatElem(elem, cat, currentCat);
//       });
//     }
//   }

//   eventForElements(catToggles, "input", (_event, elem) => {
//     catDisplay.textContent = elem.getAttribute("data-cat");
//     toggleCat(catDisplay.textContent as string);

//     callbackfn(elem);
//   });
// }

// function initInputs(): void {
// window.addEventListener("DOMContentLoaded", () => {
//   const
//   //   headerElem: HTMLElement = d.querySelector("body > header") as HTMLElement,
//     // projCtrlElem: HTMLElement = d.querySelector("#projects > .section-controls") as HTMLElement,

//     tagsInput: HTMLTextAreaElement = d.getElementById("project-tag-input") as HTMLTextAreaElement,
//     tagsCont: HTMLTextAreaElement = d.getElementById("project-tag-cont") as HTMLTextAreaElement;

//   // projCtrlElem.style.top = `${headerElem.offsetHeight}px`;

//   // window.addEventListener("scroll", () => {
//   //   projCtrlElem.style.top = `${headerElem.offsetHeight}px`;
//   // });

//   // Category -------------------------------------------------------------------------------------

//   initContentCategory(
//     (d.getElementById("project-cat-button") as HTMLButtonElement),
//     d.querySelectorAll("[data-project-cat]")
//   );

//   // Tags -----------------------------------------------------------------------------------------

//   d.querySelectorAll("[data-project-tags]").forEach(elem => {
//     tagsData.push({
//       elem: elem as HTMLElement,
//       tags: (elem.getAttribute("data-project-tags") as string)
//         .split(',')
//         .map(tag => tag.trim().toLowerCase())
//         .filter(tag => tag.length > 0),
//     });
//   });

//   function addTag(tag: string): void {
//     const tagBtn: HTMLButtonElement = d.createElement("button");

//     tagsCurrent.push(tag.toLowerCase());

//     tagBtn.textContent = tag;
//     tagBtn.classList.add("tag");
//     tagBtn.insertAdjacentHTML("beforeend", iconX);

//     tagBtn.addEventListener("click", () => {
//       tagsCurrent = tagsCurrent.filter(tg => tg !== tag.toLowerCase());
//       tagBtn.remove();

//       filterTags(tagsCurrent);
//     });

//     tagsCont.append(tagBtn);

//     filterTags(tagsCurrent);
//   }

//   tagsInput.addEventListener("keydown", (event: KeyboardEvent): void => {
//     const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;

//     if (event.key === "," || event.key === "Enter") {
//       event.preventDefault();

//       const val = textarea.value.trim();

//       if (val) {
//         const tagName: string = event.key === "," ? val.slice(0, -1).trim() : val;
//         textarea.value = "";

//         addTag(tagName);
//       }
//     }
//   });

//   eventForElements(d.querySelectorAll(".project-label"), "click", (_event, elem) => {
//     addTag(elem.getAttribute("data-tag") as string);
//   });
// });
// }

import projectsData from "../build/projects.json" with { type: "json" };

interface ProjectItem {
  name: string,
  url: string,
  description: string,
  tags: string[],
  category: string,
  platform: string,
}

const
  projectsStrEl: string =
    projectsData.map((data: ProjectItem): string => {
      return `
      <div
        class="project card"
      >

        <div class="
          project-title
          ">
          <a href="${data.url}"
            target="_blank"
            rel="noopener noreferrer"
            referrerpolicy="origin"
          >
            ${data.name}
          </a>
        </div>

        <div class="labels-container">
          ${
            data.tags.map((val: string) => {
              return `
                <span class="project-label ${val}" data-tag="${val}">${val}</span>
              `;
            }).join("")
          }
        </div>
        <p>${data.description}</p>
      </div>

        `;
    }).join("")

, projectSectInner: HTMLElement = document.querySelector("#projects>.section-inner") as HTMLElement
;

projectSectInner.classList.remove("on");

setTimeout((): void => {
  requestAnimationFrame((): void => {
    projectSectInner.innerHTML = projectsStrEl;
    projectSectInner.classList.remove("has-loader");

    projectSectInner.classList.add("on");
  });
}, 500);
