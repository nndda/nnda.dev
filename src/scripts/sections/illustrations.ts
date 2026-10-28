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

requestAnimationFrame(() => {
  for (const imgEl of document.querySelectorAll("#illustrations figure img") as NodeListOf<HTMLImageElement>) {
    imgEl.src = illustrationsHomeData.pop();
  }
});
