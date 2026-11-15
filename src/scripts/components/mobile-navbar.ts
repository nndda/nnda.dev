import "./mobile-navbar.scss";

export default function (d: Document, headerEl: HTMLElement) {
  const
    mobileNavBtn = d.getElementById("navbar-button")!
  , navbarClasses = d.getElementById("navbar")!.classList
  ;

  const collapseArea = d.createElement("div");
  collapseArea.setAttribute("class", "hidden-o");
  collapseArea.id = "collapse-area";

  headerEl.insertAdjacentElement("afterend", collapseArea);

  mobileNavBtn.addEventListener("click", (): void => {
    navbarClasses.add("toggled");
    collapseArea.classList.remove("hidden-o");
  });

  function closeMobileNavbar() {
    navbarClasses!.remove("toggled");
    collapseArea.classList.add("hidden-o");
  }

  collapseArea.addEventListener("click", closeMobileNavbar);

  for (const navLink of headerEl.getElementsByTagName("a")) {
    navLink.addEventListener("click", closeMobileNavbar);
  }
}
