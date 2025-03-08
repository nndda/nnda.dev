export function initScroll(d: Document) {
  const
    documentWindow: Window = document.defaultView as Window

  , headerClasses: DOMTokenList = (d.querySelector("body > header") as HTMLElement).classList

  , sections: HTMLElement[] = [
      d.getElementById("projects"),
      d.getElementById("illustrations"),
    ] as HTMLElement[]

  , navLinksClass: DOMTokenList[] = Array.from(
      d.querySelectorAll(".scrollspy")
    ).map(n => n.classList)

  , mobileNavSectLabel: HTMLElement = d.getElementById("mobile-nav-sect-label") as HTMLElement

  , backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
  ;

  let
    scrollPosition: number = 0
  , toggleHeader: boolean = false
  ;

  backTop.addEventListener("click", () => {
    documentWindow.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function deactivateClass(classes: DOMTokenList): void {
    classes.remove("active")
  }

  function deactivateLinks(): void {
    navLinksClass.forEach(deactivateClass);
  }

  function scrollEv(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;
    toggleHeader = scrollPosition > documentWindow.innerHeight;

    headerClasses.toggle("active", toggleHeader);
    backTop.classList.toggle("active", toggleHeader);

    if (sections[0].offsetTop <= scrollPosition) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPosition) {
          deactivateLinks();
          navLinksClass[i].add("active");
          mobileNavSectLabel.textContent = sections[i].getAttribute("data-nav-name");
        }
      }

    } else {
      deactivateLinks();
      mobileNavSectLabel.textContent = "";
    }
  }

  scrollEv();

  documentWindow.addEventListener("scroll", scrollEv, { passive: true });
}
