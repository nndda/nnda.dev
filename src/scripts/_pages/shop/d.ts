export interface ShopItem {
  name: string,
  desc: string,
  price: number,
  mainURL: string,
  thumb: string,
  platforms: string[],
  platformsGet: Record<string, string>,

  addons?: ShopItemAddon[],
}

export interface ShopItemAddon {
  price: number,
  name: string,
  desc: string,
}

