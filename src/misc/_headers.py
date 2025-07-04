from pathlib import Path

path_rel: str = Path(__file__).parent

with open(
    path_rel / "_headers",
    "r"
) as src, open(
    path_rel / "../../dist/_headers",
    "w"
) as out:

    lines: list[str] = src.read().splitlines()

    start: int = lines.index("# STATICS START") + 1
    end: int = lines.index("# STATICS END")

    lines[end:end] = [
        ln.replace("<ext>", ext)
        for ext in [
            "css",
            "js",
            "webp",
            "avif",
            "woff2",
        ]
        for ln in lines[start:end]
    ]

    del lines[start:end]

    out.write("\n".join(lines))
