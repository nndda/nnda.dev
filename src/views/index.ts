import { basename, resolve } from "path";
import { unlink, watch, WatchOptionsWithStringEncoding } from "fs";
import Handlebars from "handlebars";
import { minify, type Options } from "@swc/html";
import { pathify, filename, pagesDir, partialsDir, getHandlebarsFiles, scriptDir } from "./utils"
import { FS, root } from "@dev/util";
import frontmatter from "@/blog/frontmatter";

const
  hb = Handlebars.create()
, swcOpt: Options = {
    collapseBooleanAttributes: true,
    collapseWhitespaces: "conservative",
    minifyCss: true,
    minifyJs: true,
    minifyJson: true,
    quotes: false,
    removeComments: true,
    removeRedundantAttributes: "all",
  }
, pagesTracked = getHandlebarsFiles(pagesDir)
;

let data = await (await import("../data/site")).default();

interface RuntimeBlogData {
  title: string,
  desc: string,
  date: string,
  href: string,
  tags: string[],
}
const runtimeBlogData: RuntimeBlogData[] = [];
function generateRuntimeBlogData() {
  runtimeBlogData.sort((a, b) => {
    return new Date(b.date).getTime() -
           new Date(a.date).getTime()
  });
  FS.write.text(
    resolve(scriptDir, "blog.json"),
    JSON.stringify(runtimeBlogData),
  );
}

function getBlogTemplateStr() {
  return FS.read.text(resolve(pagesDir, "./blog/template.hbs"));
}

async function compile(
  src: string,
  dataExt: any = {},
): Promise<string | void> {

  if (src) {
    const
      fmData = frontmatter(src)
    , isBlog = fmData?.data && "blog" in fmData.data
    ;

    if (isBlog) {
      const blogData = fmData.data.blog;
      blogData.date = Intl.DateTimeFormat("en", { dateStyle: "medium", }).format(new Date(blogData.date));

      runtimeBlogData.push({
        title: blogData.title as string,
        desc: blogData.desc as string,
        date: blogData.date as string,
        tags: (blogData.tags as string[]).slice(0, 2),
        href: dataExt.currentPath[dataExt.currentPath.length - 1].href,
      });

      hb.registerPartial("blogcontent", fmData.content);
    }

    Object.assign(dataExt, fmData.data ?? {});

    const
      compiled = hb.compile(isBlog ? getBlogTemplateStr() : fmData.content)({
        ...data,
        ...dataExt,
      })
    , minified = await minify(compiled, swcOpt)
    ;

    if (isBlog) {
      hb.unregisterPartial("blogcontent");
    }

    return minified.code;
  }
}

async function compileAll() {
  runtimeBlogData.length = 0;

  for (const page in pagesTracked) {
    const compiled = await compile(
      FS.read.text(pagesTracked[page]),
      {
        currentPath: pathify(page),
      },
    );
    if (compiled) {
      FS.write.text(
        resolve(root, "./src/pages/", page) + ".html",
        compiled,
      );
    }
  }

  generateRuntimeBlogData();
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
        if (!filepath.endsWith(".hbs"))
          return true;

        return filepath.startsWith("blog/template");
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

      const compiled = await compile(
        FS.read.text(file),
        {
          currentPath: pathify(filename(filepath)),
        }
      );

      if (compiled) {
        FS.write.text(
          fileOutput,
          compiled,
        );

        pagesTracked[id] = file;

      } else {
        console.log(logPre + `compiling ${filepath} failed, for some reason :/`);
      }

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
  });

  const watcherData = watch(resolve(root, "src/data/"), {
    ...watcherOpt,
    ignore: (filepath) => {
      return !/\.(ts|js|json)/m.test(filepath);
    },
  });
  watcherData.addListener("change", async (_, filepath) => {
    console.log(logPre + `data changed on ${filepath}, recompiling...`);

    data = await (await import("../data/site")).default();
    await registerHelpers();
    registerPartials();
    await compileAll();
  });
}

compileAll();
