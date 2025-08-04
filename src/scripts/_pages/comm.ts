interface PricingData {
  priceDisplay: HTMLElement,

  characterCount: {
    current: number,
    price: number,
    priceEl: HTMLElement,
    element: HTMLInputElement,
    max: number,
  },


  bases: {
    lineart: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      multChr: (chrCount: number, basePrice: number) => number,
    },

    shading: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
      multChr: (chrCount: number, basePrice: number) => number,
    },

    fullcolor: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
      multChr: (chrCount: number, basePrice: number) => number,
    },
  },


  background: {
    solid: {
      element: HTMLInputElement,
    },

    minimal: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
    },

    full: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
    },
  },


  usageRights: {
    commercial: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
    },

    private: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
    },
  },


  other: {
    rawfile: {
      current: number,
      price: number,
      priceEl: HTMLElement,
      element: HTMLInputElement,
    },
  },
}

interface FormJSONData {
  character_count: number,
  character_count_price_base: number,

  base_shading: boolean,
  base_shading_price_base: number,
  base_shading_price_calculated: number,

  base_fullcolor: boolean,
  base_fullcolor_price_base: number,
  base_fullcolor_price_calculated: number,

  background: "solid" | "minimal" | "full",
  background_minimal_price: number,
  background_full_price: number,

  usageright_commercial: boolean,
  usageright_commercial_price: number,
  usageright_private: boolean,
  usageright_private_price: number,

  rawfile: boolean,

  description: string,

  contact_email: string,
  contact_discord: string,
  contact_matrix: string,
  contact_bluesky: string,
  contact_twitter: string,

  date_submitted: Date,
  site_version: string,

  turnstile_token: string,

  total_price: number,
}

const
  d: Document = document

, siteVer: string = (d.getElementById("site-ver") as HTMLElement).getAttribute("data-site-ver") as string

, halfDepositEl: HTMLElement = d.getElementById("deposit-half") as HTMLElement

, clientDescEl: HTMLTextAreaElement = d.getElementById("description-note") as HTMLTextAreaElement

, submitBtnEl: HTMLButtonElement = d.getElementById("submit-button") as HTMLButtonElement

, contactsEl = {
    email: d.getElementById("contact-opt-email") as HTMLInputElement,
    discord: d.getElementById("contact-opt-discord") as HTMLInputElement,
    matrix: d.getElementById("contact-opt-matrix") as HTMLInputElement,
    bluesky: d.getElementById("contact-opt-bsky") as HTMLInputElement,
    twitter: d.getElementById("contact-opt-twitter") as HTMLInputElement,
  }

, formJSONData: FormJSONData = {
    character_count: 0,
    character_count_price_base: 0,

    base_shading: false,
    base_shading_price_base: 0,
    base_shading_price_calculated: 0,

    base_fullcolor: false,
    base_fullcolor_price_base: 0,
    base_fullcolor_price_calculated: 0,

    background: "solid",
    background_minimal_price: 0,
    background_full_price: 0,

    usageright_commercial: false,
    usageright_commercial_price: 0,
    usageright_private: false,
    usageright_private_price: 0,

    rawfile: false,

    description: "",

    contact_email: "",
    contact_discord: "",
    contact_matrix: "",
    contact_bluesky: "",
    contact_twitter: "",

    date_submitted: new Date(),
    site_version: siteVer,

    turnstile_token: "",

    total_price: 0,
  }

, p: PricingData = {
    priceDisplay: d.getElementById("price-total") as HTMLElement,

    characterCount: {
      current: 0,

      price: 9,
      priceEl: d.getElementById("character-count-price") as HTMLElement,
      element: d.getElementById("character-count") as HTMLInputElement,
      max: 5,
    },



    bases: {
      lineart: {
        current: 5,

        price: 5,
        priceEl: d.getElementById("base-line-art-price") as HTMLElement,
        multChr: (chrCount: number, basePrice: number): number => {
          return basePrice + [
            0, 2, 5, 9, 14
          ][chrCount - 1];
        },
      },

      shading: {
        current: 0,

        price: 7,
        priceEl: d.getElementById("base-add-shading-price") as HTMLElement,
        element: d.getElementById("base-add-shading") as HTMLInputElement,
        multChr: (chrCount: number, basePrice: number): number => {
          return basePrice + [
            0, 2, 5, 9, 14
          ][chrCount - 1];
        },
      },

      fullcolor: {
        current: 0,

        price: 18,
        priceEl: d.getElementById("base-add-full-color-price") as HTMLElement,
        element: d.getElementById("base-add-full-color") as HTMLInputElement,
        multChr: (chrCount: number, basePrice: number): number => {
          return basePrice + [
            0, 3, 6, 10, 15
          ][chrCount - 1];
        },
      }
    },



    background: {
      solid: {
        element: d.getElementById("background-type-solid") as HTMLInputElement,
      },

      minimal: {
        current: 0,

        price: 10,
        priceEl: d.getElementById("background-type-minimal-price") as HTMLElement,
        element: d.getElementById("background-type-minimal") as HTMLInputElement,
      },

      full: {
        current: 0,

        price: 45,
        priceEl: d.getElementById("background-type-full-price") as HTMLElement,
        element: d.getElementById("background-type-full") as HTMLInputElement,
      },
    },



    usageRights: {
      commercial: {
        current: 0,

        price: 20,
        priceEl: d.getElementById("usage-right-commercial-price") as HTMLElement,
        element: d.getElementById("usage-right-commercial") as HTMLInputElement,
      },

      private: {
        current: 0,

        price: 20,
        priceEl: d.getElementById("usage-right-private-price") as HTMLElement,
        element: d.getElementById("usage-right-private") as HTMLInputElement,
      },
    },

    other: {
      rawfile: {
        current: 0,

        price: 20,
        priceEl: d.getElementById("other-rawfile-price") as HTMLElement,
        element: d.getElementById("other-rawfile") as HTMLInputElement,
      },
    },
  }
;



function updatePricingCharacterCount(): void {
  const chrCount: number = p.characterCount.element.value as unknown as number;

  p.characterCount.current = p.characterCount.price * chrCount;
  p.characterCount.priceEl.textContent = `${p.characterCount.current}`;

  p.bases.lineart.current = p.bases.lineart.multChr(chrCount, p.bases.lineart.price);
  p.bases.shading.current = p.bases.shading.multChr(chrCount, p.bases.shading.price);
  p.bases.fullcolor.current = p.bases.fullcolor.multChr(chrCount, p.bases.fullcolor.price);

  p.bases.lineart.priceEl.textContent = `${p.bases.lineart.current}`;
  p.bases.shading.priceEl.textContent = `${p.bases.shading.current}`;
  p.bases.fullcolor.priceEl.textContent = `${p.bases.fullcolor.current}`;

  updateFormData();
}
updatePricingCharacterCount();
p.characterCount.element.addEventListener("input", updatePricingCharacterCount);



p.bases.shading.element.addEventListener("input", updateFormData);
p.bases.fullcolor.element.addEventListener("input", updateFormData);


p.background.solid.element.addEventListener("input", updateFormData);

p.background.minimal.element.addEventListener("input", updateFormData);
p.background.minimal.priceEl.textContent = `${p.background.minimal.price}`;
p.background.full.element.addEventListener("input", updateFormData);
p.background.full.priceEl.textContent = `${p.background.full.price}`;

p.usageRights.commercial.element.addEventListener("input", updateFormData);
p.usageRights.commercial.priceEl.textContent = `${p.usageRights.commercial.price}`;
p.usageRights.private.element.addEventListener("input", updateFormData);
p.usageRights.private.priceEl.textContent = `${p.usageRights.private.price}`;

p.other.rawfile.element.addEventListener("input", updateFormData);
p.other.rawfile.priceEl.textContent = `${p.other.rawfile.price}`;


contactsEl.email.addEventListener("input", (): void => {
  formJSONData.contact_email = contactsEl.email.value;
});
contactsEl.discord.addEventListener("input",  (): void => {
  formJSONData.contact_discord = contactsEl.discord.value;
});
contactsEl.matrix.addEventListener("input",  (): void => {
  formJSONData.contact_matrix = contactsEl.matrix.value;
});
contactsEl.bluesky.addEventListener("input",  (): void => {
  formJSONData.contact_bluesky = contactsEl.bluesky.value;
});
contactsEl.twitter.addEventListener("input",  (): void => {
  formJSONData.contact_twitter = contactsEl.twitter.value;
});


clientDescEl.addEventListener("input", (): void => {
  formJSONData.description = clientDescEl.value;
});


function updateFormData() {

  formJSONData.character_count = p.characterCount.element.value as unknown as number;
  formJSONData.character_count_price_base = p.characterCount.price;


  formJSONData.base_shading = p.bases.shading.element.checked;
  formJSONData.base_shading_price_base = p.bases.shading.price;
  formJSONData.base_shading_price_calculated = p.bases.shading.current;

  formJSONData.base_fullcolor = p.bases.fullcolor.element.checked;
  formJSONData.base_fullcolor_price_base = p.bases.fullcolor.price;
  formJSONData.base_fullcolor_price_calculated = p.bases.fullcolor.current;


  formJSONData.background = 
    p.background.minimal.element.checked ? "minimal"
  : p.background.full.element.checked ? "full"
  : "solid"
  ;

  formJSONData.background_minimal_price = p.background.minimal.price;
  formJSONData.background_full_price = p.background.full.price;


  formJSONData.usageright_commercial = p.usageRights.commercial.element.checked;
  formJSONData.usageright_commercial_price = p.usageRights.commercial.price;

  formJSONData.usageright_private = p.usageRights.private.element.checked;
  formJSONData.usageright_private_price = p.usageRights.private.price;


  formJSONData.rawfile = p.other.rawfile.element.checked;


  formJSONData.description = clientDescEl.value;


  formJSONData.contact_email = contactsEl.email.value;
  formJSONData.contact_discord = contactsEl.discord.value;
  formJSONData.contact_matrix = contactsEl.matrix.value;
  formJSONData.contact_bluesky = contactsEl.bluesky.value;
  formJSONData.contact_twitter = contactsEl.twitter.value;


  const priceTotal: number = (

    p.characterCount.current +

    p.bases.lineart.price +
    ( p.bases.shading.element.checked ? p.bases.shading.current : 0 ) +
    ( p.bases.fullcolor.element.checked ? p.bases.fullcolor.current : 0 ) +

    ( p.background.minimal.element.checked ? p.background.minimal.price : 0 ) +
    ( p.background.full.element.checked ? p.background.full.price : 0 ) +

    ( p.usageRights.commercial.element.checked ? p.usageRights.commercial.price : 0 ) +
    ( p.usageRights.private.element.checked ? p.usageRights.private.price : 0 ) +

    ( p.other.rawfile.element.checked ? p.other.rawfile.price : 0 )

  );

  formJSONData.total_price = priceTotal;
  halfDepositEl.textContent = `${priceTotal * .5}`
  p.priceDisplay.textContent = `${priceTotal}`;

  console.log(formJSONData);
}


// @ts-ignore
window.onloadTurnstileCallback = function () {
  const cfCheckInput: HTMLInputElement = d.getElementById("cf-tunstile-verify") as HTMLInputElement;

  cfCheckInput.addEventListener("click", () => {
    const cfTurnstileCont: HTMLElement = d.getElementById("cf-turnstile") as HTMLElement;

    cfCheckInput.disabled = true;

    cfTurnstileCont.classList.toggle("hidden", false);
    (d.querySelector(".cf-logo") as HTMLElement).classList.toggle("hidden", true);

    // @ts-ignore
    turnstile.render(cfTurnstileCont, {
      sitekey: "1x00000000000000000000AA",
      theme: "light",
      callback: function (token) {
        formJSONData.turnstile_token = token;
        submitBtnEl.disabled = false;
      },
      "error-callback": function () {

      },
    });
  });
};