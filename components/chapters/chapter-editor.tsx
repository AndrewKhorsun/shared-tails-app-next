"use client";

import dynamic from "next/dynamic";
import type { MDXEditorProps } from "@mdxeditor/editor";

const MDXEditorClient = dynamic(
  async () => {
    const {
      MDXEditor,
      headingsPlugin,
      listsPlugin,
      quotePlugin,
      thematicBreakPlugin,
      markdownShortcutPlugin,
      toolbarPlugin,
      BoldItalicUnderlineToggles,
      BlockTypeSelect,
      ListsToggle,
      Separator,
      UndoRedo,
    } = await import("@mdxeditor/editor");
    await import("@mdxeditor/editor/style.css");

    return function Editor(props: MDXEditorProps) {
      return (
        <MDXEditor
          {...props}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <ListsToggle />
                </>
              ),
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
        />
      );
    };
  },
  { ssr: false },
);

export function ChapterEditor(props: MDXEditorProps) {
  return <MDXEditorClient {...props} />;
}
