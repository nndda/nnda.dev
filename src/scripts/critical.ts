interface Window { // eslint-disable-line
  p: (selector: string, iconSets: Record<string, string>) => void,
}

// Load and populate lazy-loaded icons
window.p = function (selector: string, iconSets: Record<string, string>): void {
  requestAnimationFrame(() => {
    document.querySelectorAll(selector).forEach((el: Element) => {
      el.outerHTML = iconSets[
        (el.getAttribute("data-i") as string)
        .replace(
          "<svg",
          `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"`
        )
      ];
    });
  });
};
