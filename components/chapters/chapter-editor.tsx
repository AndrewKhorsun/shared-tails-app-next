"use client";

import dynamic from "next/dynamic";
import type { MDXEditorProps } from "@mdxeditor/editor";

const ChapterEditorClient = dynamic(() => import("./chapter-editor-client"), { ssr: false });

export function ChapterEditor(props: MDXEditorProps) {
  return <ChapterEditorClient {...props} />;
}
