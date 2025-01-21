export function initScroll(d: Document) {
  const
    header: HTMLElement = d.querySelector("body > header") as HTMLElement,

    sections: HTMLElement[] = [
      d.getElementById("projects"),
      d.getElementById("illustrations"),
    ] as HTMLElement[],

    navLinksClass: DOMTokenList[] = Array.from(
      d.querySelectorAll(".scrollspy")
    ).map(n => n.classList),

    mobileNavSectLabel: HTMLElement = d.getElementById("mobile-nav-sect-label") as HTMLElement;

  let scrollPosition: number;

  function deactivateLinks(): void {
    navLinksClass.forEach(n => n.remove("active"));
  }

  function scrollEv(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;

    header.classList.toggle("active", scrollPosition > window.innerHeight);

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

  window.addEventListener("scroll", scrollEv);
}