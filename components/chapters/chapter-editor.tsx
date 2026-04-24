"use client";

import dynamic from "next/dynamic";
import type { MDXEditorProps } from "@mdxeditor/editor";

const ChapterEditorClient = dynamic(() => import("./chapter-editor-client"), { ssr: false });

export type ChapterEditorProps = MDXEditorProps & {
  onSave?: () => void;
  isDirty?: boolean;
  saveState?: "idle" | "saving" | "saved" | "error";
};

export function ChapterEditor(props: ChapterEditorProps) {
  return <ChapterEditorClient {...props} />;
}
