"use client";

import type { HeroContent } from "@/data/uor-hero";

export function CampusHero({
  content,
  sourceLabel,
}: {
  content: HeroContent;
  sourceLabel: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl bg-sitecore-navy text-white shadow-card">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
            {content.eyebrow || "Eyebrow"}
          </p>
          <h2 className="mb-4 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
            {content.title || "Untitled hero"}
          </h2>
          <p className="mb-6 max-w-xl text-base leading-7 text-slate-200">
            {content.summary || "Summary field is empty."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={content.ctaHref || "#"}
              className="inline-flex w-fit rounded-full bg-sitecore-red px-5 py-2.5 text-sm font-semibold text-white"
              onClick={(event) => event.preventDefault()}
            >
              {content.ctaText || "Call to action"}
            </a>
            {content.showSearchSlot ? (
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-slate-200">
                <span className="shrink-0 text-xs uppercase tracking-wide">Search slot</span>
                <input
                  readOnly
                  value="Preview search would mount here"
                  className="w-full bg-transparent text-white outline-none placeholder:text-rose-200"
                />
              </label>
            ) : null}
          </div>
        </div>
        <div className="relative min-h-40 rounded-xl bg-gradient-to-br from-sitecore-red/80 to-sitecore-navy p-4">
          <p className="absolute bottom-4 left-4 right-4 text-xs leading-5 text-slate-100">
            {content.imageAlt}
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-3 text-xs uppercase tracking-wide text-slate-300">
        Rendered from {sourceLabel}
      </p>
    </section>
  );
}
