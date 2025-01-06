import { eventForElements } from "./input";
import { iconX } from "./icons";

const d = document;

function initContentControls(
  btnCategories: HTMLElement[] | NodeListOf<Element>,
  btnTags: HTMLElement[] | NodeListOf<Element>,
): void {

}

// Tags -----------------------------------------------------------------------------------------

interface iTagsData {
  elem: HTMLElement,
  tags: string[],
}

const tagsData: iTagsData[] = [];

let tagsCurrent: string[] = [];

function filterTags(tags: string[]): void {
  tagsData.forEach(item => {
    item.elem.classList.toggle("hidden",
      tags.length > 0 ? 
      !item.tags.some(tag => tags.includes(tag)) : false
    );
  });
}

// Category -------------------------------------------------------------------------------------

function initContentCategory(
  catsDropdownBtn: HTMLElement,
  catsContents: HTMLElement[] | NodeListOf<Element>,
  callbackfn: (elem: Element) => void = () => {},
): void {
  const
    catsData: Record<string, HTMLElement[]> = {},
    catDisplay = <HTMLElement>catsDropdownBtn.querySelector(".text-display"),
    catToggles = (<HTMLElement>catsDropdownBtn.parentElement).querySelectorAll("input[type=\"radio\"]");

  let currentCat = "";

  catsContents.forEach(elem => {
    const catName = <string>elem.getAttribute("data-project-cat");

    if (!Object.prototype.hasOwnProperty.call(catsData, catName)) {
      catsData[catName] = []
    }

    catsData[catName].push(<HTMLElement>elem);
  });

  function toggleCatElem(elem: HTMLElement, cat: string, catName: string): void {
    elem.classList.toggle("hidden", catName === "All" ? false : cat !== catName);
  }

  function toggleCat(catName: string): void {
    currentCat = catName;

    for (const cat in catsData) {
      catsData[cat].forEach(elem => {
        toggleCatElem(elem, cat, currentCat);
      });
    }
  }

  eventForElements(catToggles, "input", (_event, elem) => {
    catDisplay.textContent = elem.getAttribute("data-cat");
    toggleCat(<string>catDisplay.textContent);

    callbackfn(elem);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const
    headerElem = <HTMLElement>d.querySelector("body > header"),
    projCtrlElem = <HTMLElement>d.querySelector("#projects > .section-controls"),

    tagsInput = <HTMLTextAreaElement>d.getElementById("project-tag-input"),
    tagsCont = <HTMLTextAreaElement>d.getElementById("project-tag-cont");

  projCtrlElem.style.top = `${headerElem.offsetHeight}px`;

  window.addEventListener("scroll", () => {
    projCtrlElem.style.top = `${headerElem.offsetHeight}px`;
  });

  // Category -------------------------------------------------------------------------------------

  initContentCategory(
    <HTMLButtonElement>d.getElementById("project-cat-button"),
    d.querySelectorAll("[data-project-cat]")
  );

  // Tags -----------------------------------------------------------------------------------------

  d.querySelectorAll("[data-project-tags]").forEach(elem => {
    tagsData.push({
      elem: <HTMLElement>elem,
      tags: (<string>elem.getAttribute("data-project-tags"))
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0),
    });
  });

  function addTag(tag: string): void {
    const tagBtn = d.createElement("button");

    tagsCurrent.push(tag.toLowerCase());

    tagBtn.textContent = tag;
    tagBtn.classList.add("tag");
    tagBtn.insertAdjacentHTML("beforeend", iconX);

    tagBtn.addEventListener("click", () => {
      tagsCurrent = tagsCurrent.filter(tg => tg !== tag.toLowerCase());
      tagBtn.remove();

      filterTags(tagsCurrent);
    });

    tagsCont.append(tagBtn);

    filterTags(tagsCurrent);
  }

  tagsInput.addEventListener("keydown", (event: KeyboardEvent): void => {
    const textarea = <HTMLTextAreaElement>event.target;

    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();

      const val = textarea.value.trim();

      if (val) {
        const tagName = event.key === "," ? val.slice(0, -1).trim() : val;
        textarea.value = "";

        addTag(tagName);
      }
    }
  });

  eventForElements(d.querySelectorAll(".project-label"), "click", (_event, elem) => {
    addTag(<string>elem.getAttribute("data-tag"));
  });
});