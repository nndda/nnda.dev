const CircleType = require("circletype");

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".bg-spiral").forEach((elem) => {
    new CircleType(elem);
  });

  const bgSpiral1 = <HTMLElement>document.getElementById("bg-spiral-1");
  const bgSpiral2 = <HTMLElement>document.getElementById("bg-spiral-2");

  function rotateElem(elem : HTMLElement, degrees : number) {
    let currentRotation = parseInt(<string>elem.getAttribute("data-rotation"), 10);
    currentRotation += degrees;

    elem.setAttribute("data-rotation", currentRotation.toString());
    elem!.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
  }

  const thingsStuff = document.getElementById("things-stuff");
  const thingsStuffStr = <string[]>[
    "Game Developer",
    "Front-end Developer",
    "Open Source Developer",
    "Digital Illustrator",
  ];
  let thingsStuffIdx = 0;

  setInterval(function() {
    rotateElem(bgSpiral1, 9);
    rotateElem(bgSpiral2, -6);

    thingsStuff!.textContent = thingsStuffStr[thingsStuffIdx];
    thingsStuffIdx = (thingsStuffIdx + 1) % thingsStuffStr.length;

  }, 1200);

  const navbarMobile = <HTMLElement>document.getElementById("navbar-mobile");
  const navbarButton = <HTMLButtonElement>document.getElementById("navbar-button");

  navbarButton.addEventListener("click", () => {
    navbarMobile.classList.toggle("collapsed");
  });

  navbarMobile.querySelectorAll(".nav-item").forEach((elem) => {
    elem.addEventListener("click", () => {
      navbarMobile.classList.toggle("collapsed");
    });
  });
});