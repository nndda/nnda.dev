import { importLazy, initIcons, loadCSS, observe } from "@runtime";

import styleFooter from "../styles/sections/_footer.lazy.scss?url";

export default function (d: Document) {

  // --------------------------------------------------------------------------

  const
    headerClasses = d.getElementById("header")!.classList
  , backTop = d.getElementById("back-top") as HTMLButtonElement
  , headerCollapseEl = d.querySelector(".header-collapse")!
  ;

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  observe(entry => {

    const active = entry.intersectionRatio <= 0;

    headerClasses.toggle("active", active);
    backTop.classList.toggle("active", active);

  })(headerCollapseEl);

  // --------------------------------------------------------------------------

  import("./build/icons/global")
    .then(({ default: icons }) => {
      initIcons("global", icons);
    })
  ;

  if (d.querySelector("input")) {
    import("./input")
      .then(({ default: initInput }) => {
        initInput(d);
      })
    ;
  }

  // --------------------------------------------------------------------------

  const navbarClasses = d.getElementById("navbar")?.classList;

  if (navbarClasses) {
    const collapseArea: HTMLElement = d.getElementById("collapse-area")!;

    d.getElementById("navbar-button")!.addEventListener("click", (): void => {
      navbarClasses.add("toggled");
      collapseArea.classList.remove("hidden-o");
    });

    function closeMobileNavbar() {
      navbarClasses!.remove("toggled");
      collapseArea.classList.add("hidden-o");
    }

    d.getElementById("navbar-collapse")!.addEventListener("click", closeMobileNavbar);
    collapseArea.addEventListener("click", closeMobileNavbar);


    for (const navLink of d.querySelectorAll("#navbar .nav-link")) {
      navLink.addEventListener("click", closeMobileNavbar);
    }
  }

  importLazy(
    d.querySelector("body > footer")!,
    "300px",
    () => import("./sections/footer"),
    () => loadCSS(styleFooter),
  );

  // --------------------------------------------------------------------------

  const passiveOnce = {
    once: true,
    passive: true,
  };

  for (const img of d.querySelectorAll("img.not-loaded") as NodeListOf<HTMLImageElement>) {

    function loadClass() {
      img.classList.remove("not-loaded");
    }

    if (img.complete) {

      loadClass();

    } else {

      img.addEventListener("load", loadClass, passiveOnce);

    }
  }

}
