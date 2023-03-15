"use client";
import { useState, useMemo } from "react";
import { BaseEditor, createEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
// TypeScript users only add this code
import { Descendant } from "slate";
import {} from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
// Add the initial value.

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "Testing" }],
    },
  ]);

  return (
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <Editable />
    </Slate>
  );
};

export default Editor;
