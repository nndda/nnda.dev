// BUILD SCRIPT

import path from "path";
import fs from "fs";

export const textEncoding: fs.ObjectEncodingOptions = {encoding: "utf-8"};

export function readTextFile(filePath: string): string {
  return fs.readFileSync(filePath, textEncoding) as string;
}

export function writeTextFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, textEncoding);
}

export function mkdir(dir: string): void {
  fs.mkdirSync(dir, {recursive: true});
}

export function cleanupDir(cleanupPath: string): void {
  fs.readdirSync(cleanupPath, {withFileTypes: true}).forEach(val => {
    if (val.isFile() && (val.name.endsWith(".js") || val.name.endsWith(".json"))) {
      console.log("Removing: ", val.name);
      fs.unlinkSync(path.resolve(cleanupPath, val.name));
    };
  });
}

export type DirResolver = (path: string) => string;

export function createResolver(pathBase: string): DirResolver {
  return pathString => path.resolve(pathBase, pathString);
}

// When I'm forced to use ESM again:

// /* const abs: DirResolver = createResolverWithDir(import.meta); */

// import { fileURLToPath } from "url";

// export function getDir(importMeta: ImportMeta): string {
//   return path.dirname(
//     fileURLToPath(importMeta.url)
//   );
// }

// export function createResolver(pathBase: string): DirResolver {
//   return pathString => path.resolve(pathBase, pathString);
// }

// export function createResolverWithDir(importMeta: ImportMeta): DirResolver {
//   return createResolver(getDir(importMeta));
// }