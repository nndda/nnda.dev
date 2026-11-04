import { basename, resolve } from "path";
import { unlink, watch, WatchOptionsWithStringEncoding } from "fs";
import Handlebars from "handlebars";
import { minify, type Options } from "@swc/html";
import { pathify, filename, pagesDir, partialsDir, getHandlebarsFiles, scriptDir } from "./utils"
import { FS, root } from "@dev/util";
import data from "../data/site";

const
  hb = Handlebars.create()
, swcOpt: Options = {
    collapseBooleanAttributes: true,
    collapseWhitespaces: "all",
    minifyCss: true,
    minifyJs: true,
    minifyJson: true,
    quotes: false,
    removeComments: true,
    removeRedundantAttributes: "all",
  }
, pagesTracked = getHandlebarsFiles(pagesDir)
;

async function compile(
  src: string,
  dataExt: any = {},
): Promise<string> {
  const
    compiled = hb.compile(src)({
      ...data,
      ...dataExt,
    })
  , minified = await minify(compiled, swcOpt)
  ;

  return minified.code;
}

async function compileAll() {
  for (const page in pagesTracked) {
    FS.write.text(
      resolve(root, "./src/pages/", page) + ".html",
      await compile(
        FS.read.text(pagesTracked[page]),
        {
          currentPath: pathify(page),
        },
      ),
    );
  }
}

async function registerHelpers() {
  hb.registerHelper((await import("./helpers")).default);
}

function registerPartials() {
  const partials = getHandlebarsFiles(partialsDir);

  for (const partial in partials) {
    hb.registerPartial(partial, FS.read.text(partials[partial]));
  }
}

await registerHelpers();
registerPartials();

console.log(
  "Pages:\n",
    getHandlebarsFiles(pagesDir),
  "\nPartials:\n",
    getHandlebarsFiles(partialsDir),
);

if (process.argv.includes("--watch")) {
  const
    logPre = "[handlebars] "
  , watcherOpt: WatchOptionsWithStringEncoding = {
      recursive: true,

      ignore: (filepath) => {
        return !filepath.endsWith(".hbs");
      },

      encoding: "utf8",
    }
  ;


  const watcherPages = watch(pagesDir, watcherOpt);
  watcherPages.addListener("change", async (_, filepath: string) => {
    const
      file = resolve(pagesDir, filepath)
    , fileOutput = filename(file) + ".html"
    , id = filename(filepath)
    ;

    if (FS.exists(file)) {
      console.log(logPre + filepath + " changed, compiling...");

      FS.write.text(
        fileOutput,
        await compile(
          FS.read.text(file),
          {
            currentPath: pathify(filename(filepath)),
          }
        ),
      );

      pagesTracked[id] = file;
    } else {

      unlink(fileOutput, (err) => {
        if (err) {
          console.log(logPre + "error removing " + filepath + ": \n", err);
        } else {
          console.log(logPre + "removed " + filepath);
          delete pagesTracked[id];
        }
      });

    }
  });


  const watcherPartials = watch(partialsDir, watcherOpt);
  watcherPartials.addListener("change", async (_, filepath: string) => {
    console.log(logPre + `partial ${filepath} changed, recompiling...`);

    if (FS.exists(filepath)) {
      hb.unregisterPartial(basename(filepath, ".hbs"));
    }

    registerPartials();
    await compileAll();
  });


  const watcherHelper = watch(resolve(scriptDir, "helpers.ts"), {
    ...watcherOpt,
    ignore: undefined,
  });
  watcherHelper.addListener("change", async () => {
    console.log(logPre + `helpers changed, recompiling...`);

    await registerHelpers();
  })
}

compileAll();
