import { dirname, join, parse, relative, resolve, sep } from "path";
import { Glob, type GlobScanOptions } from "bun";
import { FS, root } from "@dev/util";

interface PagePath {
  href: string,
  display: string,
}

export const
  hbsGlob = new Glob("**/*.hbs")
, hbsGlobOpt: GlobScanOptions = {
    absolute: true,
    onlyFiles: true,
  }
, scriptDir = import.meta.dir

, pagesDir = resolve(root, "./src/pages/")
, partialsDir = resolve(scriptDir, "./partials/")
;

export function filename(path: string): string {
  return join(dirname(path), parse(path).name);
}

export function pathify(path: string) {
  const
    isIndex = path.endsWith("index")
  , htmlOrNah = isIndex ? "" : ".html"
  ;

  return (isIndex ? path.replace(/index$/, htmlOrNah) : path)
    .split("/")
    .filter(n => n)
    .map((pathPart, i) => {
      const
        pathRel = path
          .split(sep)
          .splice(0, i + 1)
          .join(sep)

      , present = FS.exists(resolve(
          pagesDir,
          pathRel + (
            isIndex
              ? sep + "index.html"
              : ".html"
          ),
        ))
      ;

      return {

        display: pathPart,

        ... ( present ? {
          href: "/" + pathRel + (
            isIndex
              ? "/"
              : ".html"
          )
        } : {} ),

      } as PagePath;
    });
  ;
}

export function getHandlebarsFiles(path: string) {
  return Array
    .from(hbsGlob.scanSync({
      ...hbsGlobOpt,
      cwd: path,
    }))
    .reduce((prev, filepath) => {
      return {
        ...prev,
        [
          filename(relative(path, filepath))
        ]: filepath,
      };
    }, {} as Record<string, string>)
  ;
}
