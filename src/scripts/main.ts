const CircleType = require("circletype");

function rotateElem(elem : HTMLElement, degrees : number) {
  let currentRotation = parseInt(<string>elem.getAttribute("data-rotation"), 10);
  if (currentRotation >= 3600) {
    currentRotation = 0 + degrees;
  } else {
    currentRotation += degrees;
  }

  elem.setAttribute("data-rotation", currentRotation.toString());
  elem!.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
}

const thingsStuffStr = <string[]>[
  "Game Developer",
  "Front-end Developer",
  "Open Source Developer",
  "Digital Illustrator",
];

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".bg-spiral:not(.horizontal)").forEach((elem) => {
    new CircleType(elem);
  });

  const bgSpiral1 = <HTMLElement>document.getElementById("bg-spiral-1");
  const bgSpiral2 = <HTMLElement>document.getElementById("bg-spiral-2");

  const clockHandSec = <HTMLElement>document.getElementById("clock-hand-sec");
  const clockHandMin = <HTMLElement>document.getElementById("clock-hand-min");

  const thingsStuff = document.getElementById("things-stuff");
  let thingsStuffIdx = 0;

  const degSec = 360 / 60;

  let intervalEven = 0;

  rotateElem(clockHandSec, (new Date().getSeconds() - 15) * degSec);
  rotateElem(clockHandMin, (new Date().getMinutes() - 15) * degSec);

  setInterval(function() {
    thingsStuff!.textContent = thingsStuffStr[thingsStuffIdx];
    thingsStuffIdx = (thingsStuffIdx + 1) % thingsStuffStr.length;

    intervalEven = (intervalEven + 1) % 2;

    rotateElem(clockHandSec, degSec);

    if (intervalEven === 1) {
      rotateElem(bgSpiral1, degSec * 0.5);
      rotateElem(bgSpiral2, -degSec);
    }

    if (new Date().getSeconds() === 0) {
      rotateElem(clockHandMin, degSec);
    }

  }, 1000);

  const navbarMobile = <HTMLElement>document.getElementById("navbar-mobile");
  const navbarButton = <HTMLButtonElement>document.getElementById("navbar-button");

  navbarButton.addEventListener("click", () => {
    navbarMobile.classList.toggle("collapsed");
  });

  navbarMobile.querySelectorAll(".nav-link").forEach((elem) => {
    elem.addEventListener("click", () => {
      navbarMobile.classList.toggle("collapsed");
    });
  });
});