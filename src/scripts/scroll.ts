export default function (d: Document) {
  const
    headerClasses: DOMTokenList = (d.querySelector("body > header")!).classList
  , backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
  ;

  let
    toggled: boolean
  , ticking: boolean = false
  ;

  backTop.addEventListener("click", (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function scrollEv(): void {
    if (!ticking) {
      ticking = true

      requestAnimationFrame((): void => {
        toggled = (window.scrollY / window.innerHeight) > 0.6

        headerClasses.toggle("active", toggled);
        backTop.classList.toggle("active", toggled);

        ticking = false;
      });
    }
  }

  scrollEv();

  window.addEventListener("scroll", scrollEv, { passive: true });
};
