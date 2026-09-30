export function FlowDiagram({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;
  return (
    <div className="my-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      {steps.map((step, index) => (
        <div key={`${step}-${index}`} className="flex flex-1 flex-col items-center gap-3 sm:flex-row">
          <div
            className="flow-step w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-center text-sm font-semibold text-ink shadow-sm"
            style={{ animationDelay: `${index * 180}ms` }}
          >
            {step}
          </div>
          {index < steps.length - 1 ? (
            <span className="text-stone-400" aria-hidden>
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
