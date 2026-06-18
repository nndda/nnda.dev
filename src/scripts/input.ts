import { buildSvg } from "./framework";

import icons from "./build/icons/input";

const
  iconsCompiled: Record<string, string> = {}
;

for (const i in icons) {
  iconsCompiled[i] = buildSvg(icons[(i as keyof typeof icons)], 18, 18);
}

export default function (d: Document): void {
  // Checkbox

  for (const el of d.querySelectorAll(".checkbox")) {
    const
      isRadio: boolean = (el.querySelector("input") as HTMLInputElement).type === "radio"
    ;

    el.querySelector(".checked")!.innerHTML = isRadio ? iconsCompiled["cirChk"] : iconsCompiled["sqChk"];
    el.querySelector(".checked-not")!.innerHTML = isRadio ? iconsCompiled["cir"] : iconsCompiled["sq"];
  }
}

// export function eventForElements(
//   elems: HTMLInputElement[] | NodeListOf<Element>,
//   type: string,
//   callbackfn: (event: Event, elem: Element) => void,
// ): void {
//   elems.forEach((elem: HTMLElement | Element) => {
//     elem.addEventListener(type, event => callbackfn(event, elem));
//   });
// }
