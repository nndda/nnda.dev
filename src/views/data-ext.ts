// BUILD SCRIPT

import "dotenv/config";

import fs from "fs";
import { pipeline } from "stream/promises";

import { Open as unzipperOpen } from "unzipper";

import {
  mkdir,
  rm,
  mv,
  pathResolve,
  createResolver,
} from "../scripts/build/utils";
const rootDir: string = createResolver(__dirname)("../../");

if (
  process.env.SITE_EXT &&
  process.env.GH_PAT_EXT
  ) {
  console.log("Getting external site data...");

  fetch(`https://api.github.com/repos/${process.env.SITE_EXT}/zipball/main`, {
    "headers": {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${process.env.GH_PAT_EXT}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }).then(response => {

    if (!response.ok) {
      throw new Error(`Error fetching external site data: ${response.statusText}`);
    }

    const tempDir: string = pathResolve(rootDir, "./TEMP");
    const extZipPath: string = pathResolve(rootDir, "./ext.zip");

    mkdir(tempDir);

    pipeline(response.body as ReadableStream, fs.createWriteStream(extZipPath)).then(() => {
      (unzipperOpen.file(extZipPath)).then(res => {
        res.extract({path: tempDir}).then(() => {
          mv(pathResolve(tempDir, fs.readdirSync(tempDir)[0]), rootDir);
          rm(tempDir);
        });
      });
    });
  });
}