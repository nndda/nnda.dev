import fs from "fs";
import path from "path";

export function updateSocialRedirects(data: any[]): void {
  const
    sourceStr = fs.readFileSync(path.resolve(__dirname, "../misc/_redirects")).toString(),
    startComment = '#SOCIAL_REDIRECTS_START',
    endComment = '#SOCIAL_REDIRECTS_ENDS';

  let updatedContents = "";

  data.forEach((value) => {
    if (Object.prototype.hasOwnProperty.call(value, "redirect")) {
      updatedContents += `${value.redirect}    ${value.url}    301\n`;
    }
  });

  if (!sourceStr.includes(startComment) || !sourceStr.includes(endComment)) {
    console.error(`${startComment} and ${endComment} doesn't exist.`);
    return;
  }

  if (sourceStr.indexOf(startComment) > sourceStr.indexOf(endComment)) {
    console.error(`${startComment} must appear before ${endComment}.`);
    return;
  }

  fs.writeFileSync(path.resolve(__dirname, "../misc/_redirects"),
    sourceStr.replace(
      /(#SOCIAL_REDIRECTS_START\s*\n)([\s\S]*?)(\n?#SOCIAL_REDIRECTS_ENDS)/,
      `$1${updatedContents}$3`
    )
  );
}