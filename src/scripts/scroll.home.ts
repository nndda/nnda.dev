export default function (d: Document): void {
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

  , illustContStyle: CSSStyleDeclaration = (d.querySelector(".illust-cont > img") as HTMLElement).style
  , selfTitleContStyle: CSSStyleDeclaration = (d.querySelector(".self-cont") as HTMLElement).style
  , selfTitle1Style: CSSStyleDeclaration = (d.querySelector(".self-cont .title:nth-child(1)") as HTMLElement).style
  , selfTitle2Style: CSSStyleDeclaration = (d.querySelector(".self-cont .title:nth-child(2)") as HTMLElement).style
  , selfTitle3Style: CSSStyleDeclaration = (d.querySelector(".self-cont .title:nth-child(3)") as HTMLElement).style

  ;

  let
    scrollPosition: number = 0
  , scrollRatio: number = 0
  ;

  backTop.addEventListener("click", () => {
    documentWindow.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function deactivateClass(classes: DOMTokenList): void {
    classes.remove("active");
  }

  function deactivateLinks(activeNavClass: DOMTokenList | null = null): void {
    requestAnimationFrame(() => {
      navLinksClass.forEach(deactivateClass);

      if (activeNavClass) {
        activeNavClass.add("active");
      }
    });
  }

  function toggleHeaderFn(toggle: boolean): void {
    requestAnimationFrame(() => {
      headerClasses.toggle("active", toggle);
      backTop.classList.toggle("active", toggle);
    });
  }

  function scrollEv(): void {

    scrollRatio = window.scrollY / window.innerHeight;

    illustContStyle.transform = `translateY(-${scrollRatio * 250}px)`;
    selfTitleContStyle.transform = `translateY(-${scrollRatio * 170}px)`;

    selfTitle1Style.transform = `translateY(-${scrollRatio * 30}px)`;
    selfTitle2Style.transform = `translateY(-${scrollRatio * 60}px)`;
    selfTitle3Style.transform = `translateY(-${scrollRatio * 90}px)`;

    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;

    toggleHeaderFn(scrollPosition > documentWindow.innerHeight);

    if (sections[0].offsetTop <= scrollPosition) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPosition) {
          requestAnimationFrame(() => {
            deactivateLinks(navLinksClass[i]);
            mobileNavSectLabel.textContent = sections[i].getAttribute("data-nav-name");
          });
        } else {
          break;
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
