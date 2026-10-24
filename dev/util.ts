import { resolve, basename } from "path";
import fs from "fs";

export const

  Path = {

    abs( ...paths: string[] ) {
      return resolve(root, ...paths);
    },

    createRelative(base: string) {
      return function (path: string) {
        return resolve(base, path);
      };
    }

  },

  FS = {

    mkdir(path: string) {
      fs.mkdirSync(path, {recursive: true});
    },

    exists(path: string) {
      return fs.existsSync(path);
    },

    rm(path: string) {
      if (FS.exists(path)) {
        fs.rmSync(path);
      }
    },

    ls(path: string) {
      return fs.readdirSync(path);
    },

    mv(from: string, to: string) {
      if (fs.lstatSync(from).isDirectory()) {
        const pathTarget = resolve(to, basename(from));

        fs.readdirSync(from).forEach(srcPath => {
          FS.mv(resolve(from, srcPath), pathTarget);
        });

      } else {
        fs.renameSync(from, resolve(to, basename(from)));
      }
    },

    read: {
      text(path: string) {
        return fs.readFileSync(path, "utf8");
      },

      buffer(path: string) {
        return fs.readFileSync(path)
      }
    },

    write: {
      text(path: string, data: string) {
        return fs.writeFileSync(path, data, "utf8");
      }
    },

  }

, root = resolve(import.meta.dir, "../")
, rootSrc = Path.abs("./src/")
;
