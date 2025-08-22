import os
from fontTools import subset
from fontTools.ttLib.ttFont import TTFont
from typing import Any

fonts_dir: str = os.path.abspath(os.path.join(__file__, "../../../assets/fonts"))

alpha: str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
num: str = "1234567890"
punc: str = " !\"'#$%&()*+,./:;=><?@[\\]^_`{|}~-–—"
kana: str = "".join(chr(c) for c in range(0x30A0, 0x30FF + 1))

fonts: Any = {

    # General font
    "zen-kaku-gothic-new": {
      "text": alpha + num + punc + kana + "".join([
        "/ˈnæn.də/",
        "©",
        "語",
        "ウェブ",
        "ツール",
        "イラスト",
        "ゲーム",
      ]),
      "weights": [300, 400, 700],
    },

    # Left-side Japanese heading
    "ibm-plex-sans-jp": {
        "text": "".join([
            "サマリー",
            "プロジェクト",
            "イラスト",
            # "エスエヌエス",
            "リンクス",
        ]),
        "weights": [200],
    },

    # General monospace font
    "ubuntu-sans-mono": {
      "text": alpha + num + punc,
      "weights": [400, 700],
    },

    # Decorative
    "bytesized": {
      "text": alpha + num + punc + kana + "".join([
        "Indie Games",
        "Tools",
      ]),
      "weights": [400],
    },

}

print("Subsetting fonts...")

for ft in fonts:
    for weight in fonts[ft]["weights"]:

        font_path = os.path.join(fonts_dir, ft, str(weight))

        print(ft + "/" + str(weight))

        opts: subset.Options = subset.Options()

        opts.unicodes = sorted({ord(c) for c in fonts[ft]["text"]})

        opts.layout_features = "*"
        opts.no_hinting = True
        opts.desubroutinize = True
        opts.flavor = "woff2"
        opts.ignore_missing_glyphs = True
        opts.ignore_missing_unicodes = True

        font: TTFont = subset.load_font(font_path + ".ttf", options=opts)

        subsetter: subset.Subsetter = subset.Subsetter(options=opts)
        subsetter.populate(unicodes=opts.unicodes)
        subsetter.subset(font)

        subset.save_font(font, font_path + ".woff2", options=opts)

        # subset.main([
        #     font_path + ".ttf",
        #     "--unicodes=" + sorted({ord(c) for c in fonts[ft]["text"]}),
        #     "--ignore-missing-glyphs",
        #     "--ignore-missing-unicodes",
        #     "--layout-features=*",
        #     "--no-hinting",
        #     "--desubroutinize",
        #     "--verbose",
        #     "--flavor=woff2",
        #     "--output-file=" + font_path + ".woff2",
        # ])
