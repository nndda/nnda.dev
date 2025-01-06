import { icon, IconName, IconLookup } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faX } from "@fortawesome/free-solid-svg-icons";

function toHTML(name: IconName | IconLookup): string {
  return icon(name).html.join();
}

export const
  iconCaretDown = toHTML(faCaretDown),
  iconX = toHTML(faX);