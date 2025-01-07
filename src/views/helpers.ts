import * as Handlebars from 'handlebars';

export default {
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