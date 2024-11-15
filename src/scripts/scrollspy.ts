export function initializeScrollspy(d : Document) {
  const
    navLinksClass : DOMTokenList[] = Array.from(
      d.querySelectorAll(".scrollspy")
    ).map(n => n.classList),

    sections = <HTMLElement[]>[
      d.getElementById("projects"),
      d.getElementById("illustrations"),
    ],

    mobileNavSectLabel = <HTMLElement>
      d.getElementById("mobile-nav-sect-label");

  let scrollPosition : number;

  function deactivateLinks(): void {
    navLinksClass.forEach(n => n.remove("active"));
  }

  function scrollspy(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;

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

  scrollspy();

  window.addEventListener("scroll", scrollspy);
}