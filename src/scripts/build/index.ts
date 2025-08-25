import nodePath from "path";
import {
  spawnSync,
  type SpawnSyncOptionsWithStringEncoding,
} from "child_process";

import {
  createResolver,
  exists,
  type DirResolver,
} from "./utils";

import chokidar from "chokidar";

type ScriptExecCallable = Record<string, () => void>;

type ScriptDeps = Record<string, string[]>;

const
  // So fucking dumb
  abs: DirResolver = createResolver(__dirname)
, absRoot: DirResolver = createResolver(abs("../../../"))

, tsconfigPath: string = absRoot("./config/tsconfig.build.json")
, tsBin: string = absRoot("./node_modules/.bin/tsx")
, pyBin: string = "python3"

, spawnSyncOpt: SpawnSyncOptionsWithStringEncoding = {
    stdio: "pipe",
    encoding: "utf8",
  }

, execScripts: string[] = [
    "attributions.ts",
    "fonts.py",
    "icons.ts",
    "illustrations.ts",
  ]

, execScriptsDeps: ScriptDeps = Object.entries({
    "./config/requirements.txt": [
      "attributions.ts",
    ],
    "./packages.json": [
      "attributions.ts",
    ],
    "./src/data/illustrations/home.ts": [
      "illustrations.ts",
    ],
    "./src/data/illustrations/home.ext.js": [
      "illustrations.ts",
    ],
  }).reduce((acc: ScriptDeps, val: [string, string[]]): ScriptDeps => {
    const absPath: string = absRoot(val[0]);

    if (exists(absPath)) {
      acc[absPath] = val[1];
    }

    return acc;

  }, {} as ScriptDeps)

, execRun = execScripts.reduce(
    (acc: ScriptExecCallable, val: string): ScriptExecCallable => {
      acc[val] = execScript.bind(null, abs("./" + val), val);
      return acc;
    },
    {} as ScriptExecCallable,
  )
;

function execScript(script: string, pref: string): void {
  const
    isTs: boolean = script.endsWith(".ts")
  ;

  console.log(
    // I'm so sorry
    spawnSync(
      (isTs ? tsBin : pyBin),
      [
        ...(isTs ? ["--tsconfig", tsconfigPath,] : []),
        script,
      ],
      spawnSyncOpt,
    ).output.map(
      (val: string | null): string => {
        if (val !== null) {
          return val.split("\n").map((out: string): string => {
            const outTrimmed: string = out.trim();
            if (outTrimmed !== "") {
              return `[${pref}] ` + outTrimmed;
            }
            return "";
          })
          .filter((val: string): boolean => val !== "" )
          .join("\n");
        }
        return "";
      }
    )
    .filter((val: string): boolean => val !== "" )
    .join("\n")
    .trim()
  );
}

if (process.argv.includes("--watching")) {
  const arrWatch: string[] = [
    ...execScripts.map(abs),
    ...Object.keys(execScriptsDeps).map(abs),
  ];

  console.log("Watching for changes... @", arrWatch);

  chokidar
    .watch(arrWatch, {
      persistent: true,
    })

    .on("change", (path: string): void => {
      const
        filename: string = nodePath.basename(path)
      ;

      console.log(filename + " changed.");

      if (path in execScriptsDeps) {
        for (const script in execScriptsDeps[path]) {
          execRun[script]();
        }
      } else {
        execRun[filename]();
      }
    });
} else {
  for (const script in execRun) {
    execRun[script]();
  }
}
