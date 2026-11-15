
const d = document;

import("../../views/blog.json").then(({default: blogs}) => {
  d.getElementById("blog-recent")!.innerHTML = blogs.map(({title, desc, date, tags, href }) => {
    return `${[
      ]}<li class="card">${[
        ]}<h2><a href="${href}">${title}</a></h2>${[
        ]}<p>${desc}</p>${[
        ]}<ul class="tags">${tags.map(tag => `<li class="label">${tag}</li>`).join("")}</ul>${[
        ]}<time>${date}</time>${[
      ]}</li>${[
    ]}`;
  }).join("");
})

export {};
