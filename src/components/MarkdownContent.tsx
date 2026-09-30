"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Children, isValidElement, type ReactNode } from "react";
import { markLessonVisited, readChecks, setLessonCheck } from "@/lib/attendee";
import { CodeFirstPath } from "@/components/content/CodeFirstPath";
import { TopologyDiagram } from "@/components/content/TopologyDiagram";
import { FlowDiagram } from "@/components/content/FlowDiagram";
import { GraphQlModes } from "@/components/content/GraphQlModes";
import { JssSteps } from "@/components/content/JssSteps";
import { MermaidChart } from "@/components/content/MermaidChart";

function storageKey(pageId: string, index: number) {
  return `${pageId}:${index}`;
}

function fence(children: ReactNode): { lang: string; text: string } | null {
  const child = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) return null;
  const lang = /language-([\w-]+)/.exec(child.props.className || "")?.[1];
  if (!lang) return null;
  return { lang, text: String(child.props.children ?? "").replace(/\n$/, "") };
}

export function MarkdownContent({
  content,
  pageId,
}: {
  content: string;
  pageId: string;
}) {
  const body = content.replace(/^#\s+.+(?:\r?\n)+/, "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markLessonVisited(pageId);
  }, [pageId]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const boxes = [...root.querySelectorAll<HTMLInputElement>("input[type='checkbox']")];
    const saved = readChecks();
    const cleanups = boxes.map((box, index) => {
      box.disabled = false;
      box.checked = Boolean(saved[storageKey(pageId, index)]);
      const onChange = () => {
        setLessonCheck(storageKey(pageId, index), box.checked);
      };
      box.addEventListener("change", onChange);
      return () => box.removeEventListener("change", onChange);
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pageId, body]);

  return (
    <div ref={containerRef} className="lesson-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => {
            const block = fence(children);
            if (block?.lang === "mermaid") return <MermaidChart chart={block.text} />;
            if (block?.lang === "flow") {
              return (
                <FlowDiagram
                  steps={block.text
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)}
                />
              );
            }
            if (block?.lang === "code-first") return <CodeFirstPath />;
            if (block?.lang === "topology") {
              return <TopologyDiagram kind={block.text.trim() === "headless" ? "headless" : "integrated"} />;
            }
            if (block?.lang === "graphql-modes") return <GraphQlModes />;
            if (block?.lang === "jss") {
              return (
                <JssSteps
                  steps={block.text
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)}
                />
              );
            }
            return <pre>{children}</pre>;
          },
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src || ""} alt={alt || ""} className="my-6 w-full rounded-xl border border-stone-200" />
          ),
          a: ({ href, children }) => {
            if (href && href.startsWith("/")) {
              return (
                <Link href={href} className="font-medium text-sitecore-red underline">
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
