interface Window {
  p: (selector: string, iconSets: Record<string, string>) => void,
}

// Load and populate lazy-loaded icons
window.p = function (selector: string, iconSets: Record<string, string>): void {
  document.querySelectorAll(selector).forEach(e => {
    e.outerHTML = iconSets[
      (e.getAttribute("data-i") as string)
      .replace("<svg", `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"`)
    ];
  });
};
