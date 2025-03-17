import ghCommits from "../../api/contribs-commits.json";

(() => {
  const d: Document = document;

  let commitsGrid: string = "";
  for (const i in ghCommits) {
    commitsGrid += `<span class="c c${ghCommits[i]}"></span>`;
  }

  requestAnimationFrame(() => {
    (d.querySelector(".commits .grid") as HTMLElement).innerHTML = commitsGrid;
  });
})();

import "../build/icons/overview";