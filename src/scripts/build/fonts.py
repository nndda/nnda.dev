import os

from fontTools import subset
from fontTools.ttLib.ttFont import TTFont

fonts_dir = os.path.abspath(os.path.join(__file__, "../../../pages/assets/fonts"))

alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
num = "1234567890"
punc = " !\"'#$%&()*+,./:;=><?@[\\]^_`{|}~-–—"
kana = "".join(chr(c) for c in range(0x30A0, 0x30FF + 1))

fonts = {

    # General font
    "zen-kaku-gothic-new": {
      "text": alpha + num + punc + kana + """
        /ˈnæn.də/
        ©
        語
        ウェブ
        ツール
        イラスト
        ゲーム
        フィード
      """,
      "weights": [300, 400, 700],
    },

    # Left-side Japanese heading
    "ibm-plex-sans-jp": {
        "text": """
            サマリー
            プロジェクト
            イラスト
            エスエヌエス
            リンクス
            インディーゲーム
            ツール
            プラグイン
        """,
        "weights": [200],
    },

    # General monospace font
    "ubuntu-sans-mono": {
      "text": alpha + num + punc,
      "weights": [400, 700],
    },

    # Decorative
    "bytesized": {
      "text": alpha + num + punc + kana + """
        Indie Games
        Tools
      """,
      "weights": [400],
    },

    # Decorative
    "hi-melody": {
      "text": """
        です
        ~!
      """,
      "weights": [400],
    },

    # Decorative
    "lato": {
      "text": """
        ≈•>ω<"
      """,
      "weights": [400],
    },
}

print("Subsetting fonts...")

for ft in fonts:
    for weight in fonts[ft]["weights"]:

        font_path = os.path.join(fonts_dir, ft, str(weight))

        print(ft + "/" + str(weight))

        opts: subset.Options = subset.Options()

        opts.layout_features = []
        opts.hinting = False
        opts.desubroutinize = True
        opts.flavor = "woff2"
        opts.ignore_missing_glyphs = True
        opts.ignore_missing_unicodes = True

        font: TTFont = subset.load_font(font_path + ".ttf", options=opts)

        subsetter: subset.Subsetter = subset.Subsetter(options=opts)
        subsetter.populate(
          unicodes=sorted({ord(c) for c in fonts[ft]["text"]})
        )
        subsetter.subset(font)

        subset.save_font(font, font_path + ".woff2", options=opts)
