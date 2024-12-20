import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const iconCaretDown = icon(faCaretDown).html.join();

export function initializeInputs(d: Document): void {

  // Dropdown -------------------------------------------------------------------------------------

  d.querySelectorAll(".dropdown").forEach(e => {
    const
      button = <HTMLButtonElement>e.querySelector("button"),
      items = <HTMLElement>e.querySelector(".items");

    if (items != null && button != null) {
      button.insertAdjacentHTML("beforeend", iconCaretDown);
      items.classList.add("hidden");

      function toggleItem(): void {
        items.classList.toggle("hidden");
        const toggleStr = items.classList.contains("hidden");

        items.setAttribute("aria-hidden", `${toggleStr}`);
        button.setAttribute("aria-expanded", `${!toggleStr}`);
      }

      button.addEventListener("click", e => {
        e.stopPropagation();
        toggleItem();
      });

      d.addEventListener("click", e => {
        if (
            !items.contains(<Node>e.target) &&
            !items.classList.contains("hidden")
          ) {
          toggleItem();
        }
      });

      items.querySelectorAll(".item-input").forEach(elem => {
        if (elem.getAttribute("checked") !== null) {
          (<HTMLInputElement>elem).checked = true;
        }
      })
    }
  });
}