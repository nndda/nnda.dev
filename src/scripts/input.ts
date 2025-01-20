import { iconCaretDown } from "./icons";

export function initializeInputs(d: Document): void {

  // Dropdown -------------------------------------------------------------------------------------

  d.querySelectorAll(".dropdown").forEach(e => {
    const
      button: HTMLButtonElement = e.querySelector("button") as HTMLButtonElement,
      items: HTMLElement = e.querySelector(".items") as HTMLElement;

      button.insertAdjacentHTML("beforeend", iconCaretDown);
      items.classList.add("hidden");

      function toggleItem(): void {
        items.classList.toggle("hidden");
        const toggleStr: boolean = items.classList.contains("hidden");

        items.setAttribute("aria-hidden", `${toggleStr}`);
        button.setAttribute("aria-expanded", `${!toggleStr}`);
      }

      button.addEventListener("click", e => {
        e.stopPropagation();
        toggleItem();
      });

      d.addEventListener("click", e => {
        if (
            !items.contains(e.target as Node) &&
            !items.classList.contains("hidden")
          ) {
          toggleItem();
        }
      });

      items.querySelectorAll(".item-input").forEach(elem => {
        if (elem.getAttribute("checked") !== null) {
          (elem as HTMLInputElement).checked = true;
        }
      })
  });
}

export function eventForElements(
  elems: HTMLInputElement[] | NodeListOf<Element>,
  type: string,
  callbackfn: (event: Event, elem: Element) => void,
): void {
  elems.forEach((elem: HTMLElement | Element) => {
    elem.addEventListener(type, event => callbackfn(event, elem));
  });
}
