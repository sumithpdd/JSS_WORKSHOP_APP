"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidChart({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setError("");
    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral" });
        const { svg } = await mermaid.render(`diagram-${reactId}`, chart);
        if (!cancelled && containerRef.current) containerRef.current.innerHTML = svg;
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Diagram could not be drawn.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  return (
    <figure className="my-6 overflow-x-auto rounded-xl border border-stone-200 bg-white p-4">
      <div ref={containerRef} />
      {error ? <p className="text-sm text-sitecore-red">{error}</p> : null}
    </figure>
  );
}
