function populateIcons(selector: string, iconSets: Record<string, string>): void {
  document.querySelectorAll(selector).forEach(
    e => {
      e.outerHTML = iconSets[
        (e.getAttribute("data-i") as string)
        .replace("<svg", `<svg aria-hidden="true" focusable="false"`)
      ];
    }
  );
};

window.populateIcons = populateIcons;
` aria-hidden="true" focusable="false"`