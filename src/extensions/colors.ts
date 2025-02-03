import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Extensions } from "@tiptap/react";

const Colors: Extensions = [Color, Highlight.configure({ multicolor: true })];

export default Colors;
