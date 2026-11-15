import { importLazy, initIcons, loadCSS, observe } from "@runtime";

import styleFooter from "../styles/sections/_footer.lazy.scss?url";

export default function (d: Document) {

  // --------------------------------------------------------------------------

  const
    headerEl = d.getElementById("header")!
  , headerClasses = headerEl.classList
  , headerCollapseEl = d.querySelector(".header-collapse")!
  ;

  let backTopNotLoaded = true;

  observe(entry => {

    const active = entry.intersectionRatio <= 0;

    headerClasses.toggle("active", active);

    if (backTopNotLoaded) {
      import("./components/back-to-top")
        .then(({ default: init }) => {
          init(d, headerEl);
        })
      ;

      backTopNotLoaded = false;
    }

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

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.contentRect.width <= 700) {

        import("./components/mobile-navbar")
          .then(({ default: init }) => {
            init(d, headerEl);
          })
        ;

        resizeObserver.disconnect();
      };
    }
  });

  resizeObserver.observe(headerEl);

  // --------------------------------------------------------------------------

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
