import { YAML } from "bun";

interface FrontmatterOutput {
  data?: any | null,
  content: string,
}

const reContent = /^---$.+^---$(.+)/sm;
const reData = /^---$(.+)^---$/sm;

export default function (src: string): FrontmatterOutput {
  const dataMatch = src.match(reData);
  let data: any = null;

  if (dataMatch?.at(1)) {
    data = YAML.parse(dataMatch[1]);
  }

  return {
    content: src.match(reContent)?.at(1) || src,
    data,
  };
}
