import Handlebars from "handlebars";

import icons from "@/scripts/build/icons/global.links";
const reHost = /(.+)\/{1}?/;

export default {
  url: (href: string, text: string) => {
    const
      host = href.match(reHost)![1]
    , icon = host && host in icons
    ;

    return new Handlebars.SafeString(`
      <a href="https://${href}" class="icon-text link-decorated" target="_blank" rel="noopener noreferrer" referrerpolicy="origin">${
        icon ? `<svg class="global-links" data-i="${host}" width="16" height="16"></svg>` : ""
      } ${text}</a>
    `);
  },

  codeblock: (options) => {
    return options.fn(this);
  },
};
