import fs from "fs";
import path from "path";
import matter from "gray-matter";
import chokidar from "chokidar";
import { EntryObject } from "webpack";

function abs(path_string : string): string {
  return path.resolve(__dirname, path_string);
}

const
  encoding: fs.ObjectEncodingOptions = {encoding: "utf-8"},
  template = <string>fs.readFileSync(abs("./project.hbs"), encoding);

export function buildProjectPages(): void {
  fs.readdirSync(abs("./")).forEach(dir => {
    const subd = abs(dir);

    if (fs.statSync(subd).isDirectory()) {
      if (fs.readdirSync(subd).includes("index.hbs")) {
        buildProjectPage(subd);
      }
    }
  });
}

export const projectEntries: EntryObject = fs.readdirSync(abs("./")).reduce((acc, dir) => {
  const subd = abs(dir);

  if (fs.statSync(subd).isDirectory()) {
    if (fs.readdirSync(subd).includes(`${dir}.hbs`)) {
      acc[`p/${dir}`] = path.join(subd, `${dir}.hbs`);
    }
  }
  return acc;
}, {} as EntryObject);


export function buildProjectPage(absPath: string): void {
  if (!fs.readdirSync(absPath).includes("index.hbs")) return;

  const
    base = path.basename(absPath),
    out = path.join(absPath, base + ".hbs"),
    pagePath = path.join(absPath, "index.hbs"),
    page = matter(
      fs.readFileSync(
        pagePath, encoding
      )
    );

  page.content = template
    .replace("{CONTENT}", page.content)
    .replace("{TITLE}", `"${page.data.title ?? ""}"`)
    .replace("{DESC}", `"${page.data.desc ?? ""}"`)
    ;

  fs.writeFileSync(out, page.content, encoding);
  console.log(`Finished building project '${base}'`)
}

if (process.argv.includes("--watch")) {
  buildProjectPages();

  console.log(`
Finished initial building
    ---------------------------------------------
Watching for updates on project pages...`
  );

  chokidar.watch(abs("./")).on("change", (projectPath) => {
    if (projectPath.endsWith("/index.hbs")) {

      console.log(`${path.basename(projectPath)} changed, updating...`);

      buildProjectPage(projectPath.replace( /\/index\.hbs$/gm , ""));
    }
  });
}