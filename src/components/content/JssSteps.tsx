const STEP_COLORS = ["#1b4f8a", "#8e949b", "#149a9a", "#f08a12", "#e23d32"];

export function JssSteps({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;
  return (
    <ol className="jss-steps" aria-label="Sitecore Headless: JavaScript Services">
      {steps.map((step, index) => (
        <li
          key={`${index}-${step}`}
          className="jss-step"
          style={{
            backgroundColor: STEP_COLORS[index % STEP_COLORS.length],
            animationDelay: `${index * 0.28}s, ${index * 1.6}s`,
          }}
        >
          <span className="jss-step-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="jss-step-text">{step}</span>
        </li>
      ))}
    </ol>
  );
}
