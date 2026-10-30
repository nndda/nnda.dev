import { mkdirSync, rmSync, cpSync } from "fs";
import { join, sep } from "path";
import { root } from "@dev/util";

for (const env of [
  "GH_PAT_EXT",
  "SITE_EXT",
]) {
  if (!(env in process.env)) {
    console.error(env + " env not set");
  }
}

console.log("Fetcning website's external data...");

const
  ioOpt = {
    recursive: true,
    force: true,
  }
, res = await fetch(
    `https://api.github.com/repos/${process.env.SITE_EXT}/tarball`,
    {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${process.env.GH_PAT_EXT}`,
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  )
;

const temp = "./TEMP/";
rmSync(temp, ioOpt);
mkdirSync(temp, ioOpt);

const
  archive = new Bun.Archive(await res.blob())
, total = await archive.extract(temp)
;

cpSync(      // bruh
  join(temp, (Array.from(await archive.files())[0])[0].split(sep)[0]),
  root,
  ioOpt,
);

console.log(`Finished fetching ${total} files.`);
