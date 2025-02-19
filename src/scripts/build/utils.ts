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

export function rm(pathButICantCallItPathDirectlyBecauseTheresAlreadyAVariableNamedPath: string): void {
  if (exists(pathButICantCallItPathDirectlyBecauseTheresAlreadyAVariableNamedPath)) {
    fs.rmSync(pathButICantCallItPathDirectlyBecauseTheresAlreadyAVariableNamedPath, {recursive: true});
  }
}

export function mv(pathFrom: string, pathTo: string): void {
  if (fs.lstatSync(pathFrom).isDirectory()) {
    const pathTarget: string = path.resolve(pathTo, path.basename(pathFrom));

    fs.readdirSync(pathFrom).forEach(srcPath => {
      mv(path.resolve(pathFrom, srcPath), pathTarget);
    });
  } else {
    fs.renameSync(pathFrom, path.resolve(pathTo, path.basename(pathFrom)));
  }
}

export function ls(whatPath: string): string[] {
  return fs.readdirSync(whatPath);
}

export function cleanupDir(cleanupPath: string): void {
  fs.readdirSync(cleanupPath, {withFileTypes: true}).forEach(val => {
    if (val.isFile() && (val.name.endsWith(".js") || val.name.endsWith(".json"))) {
      console.log("Removing: ", val.name);
      fs.unlinkSync(path.resolve(cleanupPath, val.name));
    };
  });
}

export function exists(whatPath: fs.PathLike): boolean {
  return fs.existsSync(whatPath);
}

export function pathResolve(...paths: string[]): string {
  return path.resolve(...paths);
}

export type DirResolver = (pathBase: string) => string;

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

export async function fetchJSON(url: string, headers: HeadersInit | undefined = undefined) {
    const response = await fetch(url, {"headers": headers});

    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.statusText}`);
    }

    return response.json();
}
