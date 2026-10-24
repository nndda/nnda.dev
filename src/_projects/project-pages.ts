// BUILD SCRIPT

console.log("Building project pages...")

import fs from "fs";
import path from "path";
import matter, { type GrayMatterFile } from "gray-matter";
import chokidar from "chokidar";
import { type EntryObject } from "webpack";
import { FS, Path } from "@dev/util";

const
  projectPath = Path.abs("./src/_projects/")
, relative = Path.createRelative(import.meta.dir)
, template = FS.read.text(relative("./project.hbs"))
;


export function buildProjectPages(): void {
  fs.readdirSync(relative("./")).forEach(dir => {
    const subd: string = relative(dir);

    if (fs.statSync(subd).isDirectory()) {
      if (fs.readdirSync(subd).includes("index.hbs")) {
        buildProjectPage(subd);
      }
    }
  });
}

export const projectEntries: EntryObject = fs.readdirSync(projectPath).reduce((acc, dir) => {
  const subd: string = relative(dir);

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
    base: string = path.basename(absPath)
  , out: string = path.join(absPath, base + ".hbs")
  , pagePath: string = path.join(absPath, "index.hbs")
  , page: GrayMatterFile<string> = matter(FS.read.text(pagePath))
  ;

  page.content = template
    .replace(/{CONTENT}/g, page.content)
    .replace(/{TITLE}/g, `"${page.data.title ?? ""}"`)
    .replace(/{DESC}/g, `"${page.data.desc ?? ""}"`)
    ;

  if (page.data.withoutHeader) {
    page.content = template.replace(/{{\s*include\s+"header"\s*}}/, "")
  }

  FS.write.text(out, page.content);
  console.log(`Finished building project '${base}'`)
}

if (process.argv.includes("--watch")) {
  buildProjectPages();

  console.log(`
Finished initial building
    ---------------------------------------------
Watching for updates on project pages...`
  );

  chokidar.watch(projectPath).on("change", (projectPath) => {
    if (projectPath.endsWith("/index.hbs")) {

      console.log(`${path.basename(projectPath)} changed, updating...`);

      buildProjectPage(projectPath.replace( /\/index\.hbs$/gm , ""));
    }
  });
}
