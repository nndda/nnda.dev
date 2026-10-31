import illustrationsHomeData from "../../data/illustrations/out/home";

export interface IllustrationItem {
  title: string,
  chr: string[],
  src: string,
  w: number,
  h: number,
}

export interface IllustrationGallery {
  type: "landscape" | "portrait",
  items: IllustrationItem[],
}

const imgEls = document.querySelectorAll("#illustrations figure img") as NodeListOf<HTMLImageElement>;

for (let n = imgEls.length; 0 < n--;) {
  imgEls[n].addEventListener("load", () => {
    imgEls[n].classList.add("loaded");
  }, {
    once: true,
    passive: true,
  });

  setTimeout(() => {
    requestAnimationFrame(() => {
      imgEls[n].src = illustrationsHomeData[n];
    });
  }, Math.random() * 560);
}
