// BUILD SCRIPT

console.log("Building project pages...")

import fs from "fs";
import path from "path";
import matter, { type GrayMatterFile } from "gray-matter";
import chokidar from "chokidar";
import { type EntryObject } from "webpack";

import {
  readTextFile,
  writeTextFile,
  createResolver,
  type DirResolver,
} from "../scripts/build/utils";

const
  abs: DirResolver = createResolver(__dirname),
  template: string = readTextFile(abs("./project.hbs"));

export function buildProjectPages(): void {
  fs.readdirSync(abs("./")).forEach(dir => {
    const subd: string = abs(dir);

    if (fs.statSync(subd).isDirectory()) {
      if (fs.readdirSync(subd).includes("index.hbs")) {
        buildProjectPage(subd);
      }
    }
  });
}

export const projectEntries: EntryObject = fs.readdirSync(abs("./")).reduce((acc, dir) => {
  const subd: string = abs(dir);

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
    base: string = path.basename(absPath),
    out: string = path.join(absPath, base + ".hbs"),
    pagePath: string = path.join(absPath, "index.hbs"),
    page: GrayMatterFile<string> = matter(readTextFile(pagePath));

  page.content = template
    .replace("{CONTENT}", page.content)
    .replace("{TITLE}", `"${page.data.title ?? ""}"`)
    .replace("{DESC}", `"${page.data.desc ?? ""}"`)
    ;

  writeTextFile(out, page.content);
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