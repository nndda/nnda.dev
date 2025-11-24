export interface Post {
  content: string,
  date: string,
  type: "post" | "release" | "illust" | "announcement",
  version?: string,
  title?: string,
  thumb?: string[],
  // syndicate?: {
  //   bsky?: string,
  // },
}

export default [
  {
    content: "Another major version update on the horizon!",
    date: "2025-09-04T01:48:32.425Z",
    type: "release",
    title: "Pitch",
    version: "v3.0.0 Alpha",
  },
  {
    content: "Lots of bug patch.",
    date: "2025-09-04T01:48:32.425Z",
    type: "release",
    title: "Theatre",
    version: "v0.11.1",
  },
  {
    content: "A feline beast feasting upon the sea's bounty.",
    date: "2025-09-04T01:48:32.425Z",
    type: "post",
    thumb: [
      "felinebeast.png"
    ],
  },
  {
    content: `I'm opening three (3) slots on my <b class="tag">#itchio</b> CSS <b class="tag">#commission</b> on Ko-fi!!
<br><br>
Get 25% off, by entering the very intuitive, totally random discount code of: <pre><code>VY0BBIRPFFOYNPXZ4T1P</code></pre>
Or, just by clicking the link below:<br>
<a href="https://ko-fi.com/nnda/link/VY0BBIRPFFOYNPXZ4T1P" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer">https://ko-fi.com/nnda/link/VY0BBIRPFFOYNPXZ4T1P</a>`,
    date: "2025-09-04T01:48:32.425Z",
    type: "post",
  },
  {
    content: "( ÒωÓ)",
    date: "2025-09-04T01:48:32.425Z",
    type: "post",
    thumb: [
      "owo.png",
    ],
  },
  {
    content: "This is a test post, plz ignore",
    date: "2025-09-04T01:48:32.425Z",
    type: "post",
  },
  // {
  //   content: "Added the ability to do math in my dialogue plugin.",
  //   date: "2025-09-04T01:48:32.425Z",
  //   type: "post",
  //   thumb: [
  //     "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:iwluqzosr2cjuzldtanzewke/bafkreif2xqdkgfwj4r4nd7zesorcojgssqlbjq6cxzlfe6ptxfvhstf2pu@jpeg"
  //   ],
  // },
  {
    content: "🎮🎮🎮🎮🎮🎮",
    date: "2025-08-07T09:17:57.220Z",
    type: "post",
    thumb: [
      "gaaming.png"
    ],
  },
  {
    content: "I legitimately don't know what to put in this for the time being, as I don't really have that many content or posts uploaded. So, enjoy these placeholders for now.",
    date: "2025-09-04T01:48:32.425Z",
    type: "post",
  },
  {
    content: "🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧",
    date: "2025-08-07T09:17:57.220Z",
    type: "post",
    thumb: [
      "penguin-onesie.png"
    ],
  },
  {
    content: "👻🐱",
    date: "2025-08-07T09:17:57.220Z",
    type: "illust",
    thumb: [
      "spookcat.png"
    ],
  },
] as Post[];