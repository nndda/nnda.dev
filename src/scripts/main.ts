import { initializeInputs } from "./input";
import { initializeAnimations } from "./animations";

export function init(d: Document): void {
  initializeAnimations(d);

  const
    navbarMobile: HTMLElement = d.getElementById("navbar-mobile") as HTMLElement
  , navbarButton: HTMLElement = d.getElementById("navbar-button") as HTMLButtonElement
  , navbarCollapseArea: HTMLElement = d.getElementById("collapse-trigger-area") as HTMLElement

  ;

  function toggleNavMobile(): void {
    navbarMobile.classList.toggle("collapsed");
    navbarCollapseArea.classList.toggle("hidden");
  }

  navbarMobile.querySelectorAll(".nav-link").forEach(el => {
    el.addEventListener("click", toggleNavMobile);
  });

  navbarButton.addEventListener("click", toggleNavMobile);
  navbarCollapseArea.addEventListener("click", toggleNavMobile);

  initializeInputs(d);

  function importFooter(): void {
    import("./sections/footer")
      .then(({default: initializeFooter}) => {
        initializeFooter(d);
      })
      .catch(() => {
        importFooter();
      });
  }

  window.observe(
    (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ): void => {
      if (entry.isIntersecting) {
        importFooter();

        observerObj.unobserve(entry.target);
      }
    },
  )(
    d.querySelector("body > footer") as HTMLElement
  );
}
