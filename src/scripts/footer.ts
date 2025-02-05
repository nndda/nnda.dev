document.querySelector("footer > .packages")!.innerHTML =
  (require("./build/packages.json") as string[]).map(pkg => {
    const pkgName: string = pkg.slice(0, -1);
    return `
      <a
        href="https://www.npmjs.com/package/${pkgName}"
        target="_blank"
        rel="nofollow noopener noreferrer"
        referrerpolicy="no-referrer"
        class="${pkg.slice(-1)}"
      >
        ${pkgName}
      </a>`;
  }).join("");