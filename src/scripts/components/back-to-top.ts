import "./back-to-top.scss";

export default function (d: Document, headerEl: HTMLElement) {
  const backTopBtn = d.createElement("button");
  backTopBtn.id = "back-top";

  backTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  headerEl.insertAdjacentElement("afterend", backTopBtn);
}
