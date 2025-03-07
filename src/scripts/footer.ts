import packageJSON from "./build/packages.json" with { type: "json" };

document.querySelector("footer>.packages>.inner")!.innerHTML =
  (packageJSON as string[]).map(pkg => {
    const pkgName: string = pkg.slice(0, -5);
    return `<a
 href="https://www.npmjs.com/package/${pkgName}"
 target="_blank"
 rel="nofollow noopener noreferrer"
 referrerpolicy="no-referrer"
 class="${pkg.slice(-5)}"> ${pkgName} </a>`;
  }).join("");