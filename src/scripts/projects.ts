import { icon } from "@fortawesome/fontawesome-svg-core";
import { faX } from "@fortawesome/free-solid-svg-icons";

const d = document;

const XIcon = icon(faX).html.join();

window.addEventListener("DOMContentLoaded", () => {
  interface iTagsData {
    elem: HTMLElement,
    tags: string[],
  }

  const
    catsData: Record<string, HTMLElement[]> = {},

    headerElem = <HTMLElement>d.querySelector("body > header"),
    projCtrlElem = <HTMLElement>d.querySelector("#projects > .section-controls"),

    btnCat = <HTMLButtonElement>d.getElementById("project-cat-button"),
    btnCatDisplay = <HTMLElement>d.getElementById("project-cat-display"),
    btnCats = btnCat.parentElement!.querySelectorAll("input[name=\"project-cat\"]"),

    tagsData: iTagsData[] = [],

    tagsInput = <HTMLTextAreaElement>d.getElementById("project-tag-input"),
    tagsCont = <HTMLTextAreaElement>d.getElementById("project-tag-cont");

  let tagsCurrent: string[] = [];

  // Category -------------------------------------------------------------------------------------

  d.querySelectorAll("[data-project-cat]").forEach(elem => {
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
    for (const cat in catsData) {
      catsData[cat].forEach(elem => {
        toggleCatElem(elem, cat, catName);
      });
    }
  }

  projCtrlElem.style.top = `${headerElem.offsetHeight}px`;

  window.addEventListener("resize", () => {
    projCtrlElem.style.top = `${headerElem.offsetHeight}px`;
  });

  btnCats.forEach(elem => {
    elem.addEventListener("input", () => {
      btnCatDisplay.textContent = elem.getAttribute("data-cat");
      toggleCat(<string>btnCatDisplay.textContent);
    });
  });

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

  function filterTags(tags: string[]): void {
    tagsData.forEach(item => {

      // if (!item.elem.classList.contains("hidden")) {

        item.elem.classList.toggle("hidden",
          tags.length > 0 ? 
          !item.tags.some(tag => tags.includes(tag)) : false
        );

      // }

    });

  }

  function addTag(tag: string): void {
    const tagBtn = d.createElement("button");

    tagsCurrent.push(tag.toLowerCase());

    tagBtn.textContent = tag;
    tagBtn.classList.add("tag");
    tagBtn.insertAdjacentHTML("beforeend", XIcon);

    tagBtn.addEventListener("click", () => {
      tagsCurrent = tagsCurrent.filter(tg => tg !== tag.toLowerCase());
      tagBtn.remove();

      filterTags(tagsCurrent);
    });

    tagsCont.append(tagBtn);

    filterTags(tagsCurrent);
  }

  function handleTagsInput(event: KeyboardEvent): void {
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
  }

  tagsInput.addEventListener("keydown", handleTagsInput);

  d.querySelectorAll(".project-label").forEach(elem => {
    elem.addEventListener("click", () => {
      addTag(<string>elem.getAttribute("data-tag"));
    });
  });
});