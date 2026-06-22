import illustrationsHomeData from "../build/out/illust.home";

interface IllustrationItem {
  title: string,
  chr: string[],
  src: string,
  w: number,
  h: number,
}

interface IllustrationGallery {
  col: number,
  items: IllustrationItem[],
}

const
  d = document

, illustSectInner: HTMLElement = d.querySelector("#illustrations>.section-inner>.illust-items")!
, illustSectContWidth = illustSectInner.clientWidth
, illustSectContGap = parseFloat(getComputedStyle(illustSectInner).fontSize) * 0.6

, illustSectItemW: {[key: number]: number} = {
    2: (illustSectContWidth - illustSectContGap) / 2,
    3: (illustSectContWidth - illustSectContGap * 2) / 3,
  };

const illustsStrEl =
    illustrationsHomeData.map((data: IllustrationGallery): string => {
      return `
        <div class="illust-gall col-${data.col}">
          ${
            data.items.map((itm: IllustrationItem): string => {
              return `
                <div class="illust">
                  <div class="img">
                    <img src="${itm.src}" width="${illustSectItemW[data.col]}" height="${(itm.h / itm.w) * illustSectItemW[data.col]}" loading="lazy" alt="">
                  </div>

                  <small class="chr">
                    ${
                      itm.chr.map((chr: string): string => {
                        return `<span>${chr}</span>`;
                      }).join("")
                    }
                  </small>

                  <div class="title">${itm.title}</div>
                </div>
              `;
            }).join("")
          }
        </div>
      `;
    }).join("")
;

illustSectInner.classList.remove("on");

setTimeout(() => {
  requestAnimationFrame(() => {
    illustSectInner.innerHTML = illustsStrEl;
    illustSectInner.classList.remove("has-loader");

    illustSectInner.classList.add("on");
  });
}, 500);
