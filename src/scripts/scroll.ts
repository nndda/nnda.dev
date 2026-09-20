export default function (d: Document) {
  const
    headerClasses = d.querySelector("body > header")?.classList
  ;

  if (headerClasses) {
    const
      backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
    ;

    let
      toggled: boolean
    , ticking: boolean = false
    ;

    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    function scrollEv() {
      if (!ticking) {
        ticking = true

        requestAnimationFrame(() => {
          toggled = (window.scrollY / window.innerHeight) > 0.6

          headerClasses!.toggle("active", toggled);
          backTop.classList.toggle("active", toggled);

          ticking = false;
        });
      }
    }

    scrollEv();

    window.addEventListener("scroll", scrollEv, { passive: true });
  }
};
