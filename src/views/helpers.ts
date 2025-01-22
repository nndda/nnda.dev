import * as Handlebars from 'handlebars';

export default {
  icon: (group: string, name: string) => {
    return `
      <i class="${group}" data-i="${name}"></i>
    `;
  },

  meta: (name: string, content: string) => {
    return new Handlebars.SafeString(`
      <meta name="${name}" content="${content}">
    `);
  },

  stylesheet: (file: string, media: string = "") => {
    return new Handlebars.SafeString(`
      <link rel="stylesheet" type="text/css" href="${file}" ${media !== "" ? `media="${media}"` : ``}>
    `);
  },

  script: (file: string, defer: boolean = false) => {
    return new Handlebars.SafeString(`
      <script type="text/javascript" src="${file}" ${defer ? `defer=""` : ""}></script>
    `);
  },

  title: (title: string = "") => {
    if (title === "") return "";

    return new Handlebars.SafeString(`
      <title>${title}</title>
      <meta name="title" content="${title}">
      <meta property="og:title" content="${title}">
    `);
  },

  desc: (desc: string = "") => {
    if (desc === "") return "";

    return new Handlebars.SafeString(`
      <meta name="description" content="${desc}">
      <meta property="og:description" content="${desc}">
    `);
  },
}