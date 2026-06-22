import { observe } from "./framework";

export default function (d: Document) {
  const
    headerClasses = d.querySelector("body > header")!.classList

  // , sections: HTMLElement[] = [
  //     d.getElementById("projects"),
  //     d.getElementById("illustrations"),
  //   ]![]

  // , navLinksClass: DOMTokenList[] = Array.from(
  //     d.querySelectorAll(".scrollspy")
  //   ).map(n => n.classList)

  // , mobileNavSectLabel: HTMLElement = d.getElementById("mobile-nav-sect-label")!

  , backTop = d.getElementById("back-top") as HTMLButtonElement

  , illustContStyle = (d.querySelector(".illust-cont > img") as HTMLElement).style
  , selfTitleContStyle = (d.querySelector(".self-cont") as HTMLElement).style
  , selfTitle1Style = (d.querySelector(".self-cont .titles>:nth-child(1)") as HTMLElement).style
  , selfTitle2Style = (d.querySelector(".self-cont .titles>:nth-child(2)") as HTMLElement).style
  , selfTitle3Style = (d.querySelector(".self-cont .titles>:nth-child(3)") as HTMLElement).style

  ;

  let
    scrollPosition = 0
  , scrollRatio = 0

  , ticking = false
  ;

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // function deactivateClass(classes: DOMTokenList): void {
  //   classes.remove("active");
  // }

  // function deactivateLinks(activeNavClass: DOMTokenList | null = null): void {
  //   requestAnimationFrame(() => {
  //     navLinksClass.forEach(deactivateClass);

  //     if (activeNavClass) {
  //       activeNavClass.add("active");
  //     }
  //   });
  // }


  observe((
    entry: IntersectionObserverEntry,
    ) => {
      requestAnimationFrame(() => {
        headerClasses.toggle("active", !entry.isIntersecting);
        backTop.classList.toggle("active", !entry.isIntersecting);
      });
  })(d.getElementById("home")!);


  function scrollTransform() {
    scrollRatio = scrollPosition / window.innerHeight;

    if (scrollRatio <= 1) {
      illustContStyle.translate = `0 -${scrollRatio * 250}px`;
      selfTitleContStyle.translate = `0 -${scrollRatio * 170}px`;

      selfTitle1Style.translate = `0 -${scrollRatio * 30}px`;
      selfTitle2Style.translate = `0 -${scrollRatio * 60}px`;
      selfTitle3Style.translate = `0 -${scrollRatio * 90}px`;
    }

    ticking = false;
  }


  function scrollEv() {
    if (!ticking) {
      scrollPosition = window.scrollY;
      ticking = true;

      requestAnimationFrame(scrollTransform);

      // if (sections[0].offsetTop <= scrollPosition) {
      //   for (let i = 0; i < sections.length; i++) {
      //     if (sections[i].offsetTop <= scrollPosition) {
      //       requestAnimationFrame((): void => {
      //         deactivateLinks(navLinksClass[i]);
      //         mobileNavSectLabel.textContent = sections[i].getAttribute("data-nav-name");
      //       });
      //     } else {
      //       break;
      //     }
      //   }

      // } else {
      //   deactivateLinks();
      //   mobileNavSectLabel.textContent = "";
      // }
    }
  }

  scrollEv();

  window.addEventListener("scroll", scrollEv, { passive: true });
}
