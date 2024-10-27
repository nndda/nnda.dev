const CircleType = require("circletype");
const d = document;

function rotateElem(elem : HTMLElement, degrees : number) {
  let currentRotation = parseInt(<string>elem.getAttribute("data-rotation"), 10);
  if (currentRotation >= 360 * 30) {
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
let intervalEven = 0,
  thingsStuffIdx = 0;

const degSec = 360 / 60;

d.addEventListener("DOMContentLoaded", () => {
  const thingsStuff = d.getElementById("things-stuff");

  const bgSpiral1 = <HTMLElement>d.getElementById("bg-spiral-1");
  const bgSpiral2 = <HTMLElement>d.getElementById("bg-spiral-2");

  const clockHandSec = <HTMLElement>d.getElementById("clock-hand-sec");
  const clockHandMin = <HTMLElement>d.getElementById("clock-hand-min");

  let circleElems = d.querySelectorAll(".bg-spiral:not(.horizontal)");

  setTimeout(() => {
    circleElems.forEach((elem) => {
      new CircleType(elem);
    });

    const mainClockClasses = <DOMTokenList>d.getElementById("main-clock")?.classList;
    mainClockClasses.remove("hidden");

    rotateElem(clockHandSec, (new Date().getSeconds() - 15) * degSec);
    rotateElem(clockHandMin, (new Date().getMinutes() - 15) * degSec);

    setInterval(() => {
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

    mainClockClasses.remove("hidden-display");
  }, 600);

  const navbarMobile = <HTMLElement>d.getElementById("navbar-mobile");
  const navbarButton = <HTMLButtonElement>d.getElementById("navbar-button");

  navbarButton.addEventListener("click", () => {
    navbarMobile.classList.toggle("collapsed");
  });

  navbarMobile.querySelectorAll(".nav-link").forEach((elem) => {
    elem.addEventListener("click", () => {
      navbarMobile.classList.toggle("collapsed");
    });
  });
});