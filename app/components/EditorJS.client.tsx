import EditorJS from "@editorjs/editorjs";
import { ClientOnly } from "remix-utils/client-only";

export default function Editor() {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
  });
  return <div id="editorjs"></div>;
}
