function populateIcons(selector: string, iconSets: Record<string, string>): void {
  document.querySelectorAll(selector).forEach(
    e => {
      e.outerHTML = iconSets[
        (e.getAttribute("data-i") as string)
        .replace("<svg", `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"`)
      ];
    }
  );
};

window.populateIcons = populateIcons;
