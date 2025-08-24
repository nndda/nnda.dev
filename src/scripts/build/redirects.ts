// // BUILD SCRIPT

// import {
//   readTextFile,
//   writeTextFile,
//   createResolver,
//   type DirResolver } from "./utils";
// const abs: DirResolver = createResolver(__dirname);

// export function updateSocialRedirects(data: any[]): void {
//   const
//     sourceStr: string = readTextFile(abs("../../misc/_redirects")),
//     startComment: string = '#SOCIAL_REDIRECTS_START',
//     endComment: string = '#SOCIAL_REDIRECTS_ENDS';

//   let updatedContents: string = "";

//   data.forEach((value) => {
//     if (Object.prototype.hasOwnProperty.call(value, "redirect")) {
//       updatedContents += `${value.redirect}    ${value.url}    301\n`;
//     }
//   });

//   if (!sourceStr.includes(startComment) || !sourceStr.includes(endComment)) {
//     console.error(`${startComment} and ${endComment} doesn't exist.`);
//     return;
//   }

//   if (sourceStr.indexOf(startComment) > sourceStr.indexOf(endComment)) {
//     console.error(`${startComment} must appear before ${endComment}.`);
//     return;
//   }

//   writeTextFile(abs("../../misc/_redirects"),
//     sourceStr.replace(
//       /(#SOCIAL_REDIRECTS_START\s*\n)([\s\S]*?)(\n?#SOCIAL_REDIRECTS_ENDS)/,
//       `$1${updatedContents}$3`
//     )
//   );
// }