import icons from "../../build/icons/shop";
import type { ShopItem, ShopItemAddon } from "./d";

const shopItem: Record<string, Record<string, string>> = {
  iconsPlatforms: ["Godot", "Linux", "MacOS", "Windows", "CSS"].reduce(
    (
      acc: Record<string, string>,
      val: string
    ): Record<string, string> => {
      acc[val] = window.buildSvg(icons[val], 18, 18);
      return acc;
    },
    {} as Record<string, string>,
  ),
  iconsPlatformsGet: ["itch.io", "ko-fi", "Patreon", "GitHub"].reduce(
    (
      acc: Record<string, string>,
      val: string
    ): Record<string, string> => {
      acc[val] = window.buildSvg(icons[val], 16, 16);
      return acc;
    },
    {} as Record<string, string>,
  ),
};

import("../../../data/shop/catalogue").then((catalogueData: any): void => {
// function populateItems(catalogueData: Record<string, ShopItem[]>): void {
  for (const contId in catalogueData.default) {
    (document.getElementById(contId) as HTMLElement).innerHTML = catalogueData.default[contId].map((data: ShopItem): string => {
      return `
        <div class="item" data-item-name="${data.name}">
          <div class="card">
            <a class="thumb-link" href="${data.mainURL}">
              <img class="thumb" src="${data.thumb}" alt="">
            </a>
            <div class="data">
              <h3 class="title">
                <a href="${data.mainURL}">
                  ${data.name}
                </a>
              </h3>
              <p>${data.desc}</p>
              <div class="flex-space"></div>
              <hr>
              <div class="platforms">${
                data.platforms.map((platformName: string): string => {
                  return shopItem.iconsPlatforms[platformName];
                }).join("")
              }</div>
            </div>
          </div>

          <div class="buy-row">
            <div class="price">
                $<b>${data.price}</b>
            </div>

            <div class="buy-platforms">
              <small>Available on</small> 
              ${
                Object.entries(data.platformsGet).map((val: [string, string]): string => {
                  return `
                    <a class="button buy-btn icon-only" href="${val[1]}">
                      ${shopItem.iconsPlatformsGet[val[0]]}
                    </a>
                  `;
                }).join("")
              }
            </div>
          </div>

          ${
            // Object.prototype.hasOwnProperty.call(data, "addons") ? 
            "addons" in data ? 
              `<hr class="buy-hr">` + (data.addons as ShopItemAddon[]).map((dataAddons: ShopItemAddon): string => {
                return `
                  <div class="buy-row">
                    <div class="price">
                      <span>
                        $<b>${dataAddons.price}</b>
                      </span>
                    </div>

                    <div class="addon-item">
                      ${dataAddons.name}
                    </div>
                  </div>
                `;
              }).join("")
            : ""
          }
        </div>
      `;
    }).join("");
  }
// }
});

// import("../../../data/shop/catalogue").then((catalogueData: any): void => {
//   populateItems(catalogueData.default as Record<string, ShopItem[]>);
// });
