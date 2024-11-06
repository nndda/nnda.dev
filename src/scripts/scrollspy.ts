export function initializeScrollspy(d : Document) {
  const navLinksClass : DOMTokenList[] = Array.from(
    d.querySelectorAll(".scrollspy")
  ).map(n => n.classList);

  const sections = <HTMLElement[]>[
    d.getElementById("projects"),
    d.getElementById("illustrations"),
  ]

  let scrollPosition : number;

  function deactivateLinks() {
    navLinksClass.forEach(n => n.remove("active"));
  }

  function scrollspy() {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;

    if (sections[0].offsetTop <= scrollPosition) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPosition) {
          deactivateLinks();
          navLinksClass[i].add("active");
        }
      }

    } else {
      deactivateLinks();
    }
  }

  scrollspy();

  window.addEventListener("scroll", () => scrollspy());
}