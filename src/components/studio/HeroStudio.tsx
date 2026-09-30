"use client";

import { useMemo, useState } from "react";
import { CampusHero } from "@/components/studio/CampusHero";
import {
  HARD_CODED_HERO,
  PROP_DRIVEN_HERO,
  createLayoutDocument,
  heroFromLayout,
  type LayoutDocument,
} from "@/data/uor-hero";

type Stage = "hardcoded" | "props" | "layout";

const STAGES: { id: Stage; label: string; detail: string }[] = [
  {
    id: "hardcoded",
    label: "1. Hard-coded React",
    detail: "The banner is a constant inside the component. This is where the portal starts, and where an MVC view often ends up in practice: the shape is code.",
  },
  {
    id: "props",
    label: "2. Component props",
    detail: "The same Hero accepts content from outside. SXA’s promise, in one rendering: reuse the component, vary the content.",
  },
  {
    id: "layout",
    label: "3. Layout Service",
    detail: "Content is a layout document: context, route, placeholder, component, fields. Edit a field. The React component stays still.",
  },
];

export function HeroStudio() {
  const [stage, setStage] = useState<Stage>("hardcoded");
  const [layout, setLayout] = useState<LayoutDocument>(() => createLayoutDocument());
  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(createLayoutDocument(), null, 2)
  );
  const [jsonError, setJsonError] = useState("");

  const content = useMemo(() => {
    if (stage === "hardcoded") return HARD_CODED_HERO;
    if (stage === "props") return PROP_DRIVEN_HERO;
    return heroFromLayout(layout);
  }, [stage, layout]);

  const sourceLabel =
    stage === "hardcoded"
      ? "a constant in the component"
      : stage === "props"
        ? "props passed into Hero"
        : "layout data in jss-main";

  function updateLayout(next: LayoutDocument) {
    setLayout(next);
    setJsonText(JSON.stringify(next, null, 2));
    setJsonError("");
  }

  function patchField(patch: (current: LayoutDocument) => void) {
    const next = structuredClone(layout);
    patch(next);
    updateLayout(next);
  }

  const rendering = layout.sitecore.route.placeholders["jss-main"][0];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        {STAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStage(item.id)}
            className={`rounded-xl border px-4 py-3 text-left ${
              stage === item.id
                ? "border-sitecore-navy bg-sitecore-navy text-white"
                : "border-stone-200 bg-white hover:border-stone-400"
            }`}
          >
            <span className="block text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      <p className="text-sm leading-6 text-stone-600">
        {STAGES.find((item) => item.id === stage)?.detail}
      </p>

      <CampusHero content={content} sourceLabel={sourceLabel} />

      {stage === "layout" ? (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Datasource fields
            </h3>
            <Field
              label="Eyebrow"
              value={rendering.fields.Eyebrow.value}
              onChange={(value) =>
                patchField((next) => {
                  next.sitecore.route.placeholders["jss-main"][0].fields.Eyebrow.value = value;
                })
              }
            />
            <Field
              label="Title"
              value={rendering.fields.Title.value}
              onChange={(value) =>
                patchField((next) => {
                  next.sitecore.route.placeholders["jss-main"][0].fields.Title.value = value;
                })
              }
            />
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Summary</span>
              <textarea
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
                rows={4}
                value={rendering.fields.Summary.value}
                onChange={(event) =>
                  patchField((next) => {
                    next.sitecore.route.placeholders["jss-main"][0].fields.Summary.value =
                      event.target.value;
                  })
                }
              />
            </label>
            <Field
              label="CTA text"
              value={rendering.fields.Cta.value.text}
              onChange={(value) =>
                patchField((next) => {
                  next.sitecore.route.placeholders["jss-main"][0].fields.Cta.value.text = value;
                })
              }
            />
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Rendering parameter: Variant</span>
              <select
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
                value={rendering.params.Variant}
                onChange={(event) =>
                  patchField((next) => {
                    next.sitecore.route.placeholders["jss-main"][0].params.Variant =
                      event.target.value as "campus" | "search";
                  })
                }
              >
                <option value="campus">campus</option>
                <option value="search">search</option>
              </select>
            </label>
            <p className="text-xs leading-5 text-stone-500">
              Component name stays <code>Hero</code>. Placeholder stays <code>jss-main</code>.
              Datasource path stays <code>{rendering.dataSource}</code>. You are editing content
              and one parameter, which is the authoring job.
            </p>
          </form>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="layout-json">
              Layout document
            </label>
            <textarea
              id="layout-json"
              className="h-[420px] w-full rounded-xl border border-stone-300 bg-ink p-4 font-mono text-xs leading-5 text-stone-100"
              value={jsonText}
              spellCheck={false}
              onChange={(event) => {
                const text = event.target.value;
                setJsonText(text);
                try {
                  const parsed = JSON.parse(text) as LayoutDocument;
                  if (!parsed.sitecore?.route?.placeholders?.["jss-main"]?.[0]) {
                    throw new Error("Expected sitecore.route.placeholders.jss-main[0]");
                  }
                  setLayout(parsed);
                  setJsonError("");
                } catch (error) {
                  setJsonError(error instanceof Error ? error.message : "Invalid JSON");
                }
              }}
            />
            {jsonError ? <p className="mt-2 text-sm text-sitecore-red">{jsonError}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
