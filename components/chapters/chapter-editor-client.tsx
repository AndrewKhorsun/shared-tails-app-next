"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  Separator,
  UndoRedo,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  StrikeThroughSupSubToggles,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import type { ChapterEditorProps } from "./chapter-editor";

export default function ChapterEditorClient({ onSave, isDirty, saveState, ...props }: ChapterEditorProps) {
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
              <StrikeThroughSupSubToggles />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              {onSave && (
                <button
                  onClick={onSave}
                  disabled={!isDirty || saveState === "saving"}
                  className="ml-auto px-3 py-1 text-sm rounded transition-colors bg-moss text-canvas disabled:opacity-30 enabled:hover:bg-sage"
                >
                  {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved" : "Save"}
                </button>
              )}
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
}
