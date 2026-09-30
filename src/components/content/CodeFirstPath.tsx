const NODES = [
  { id: "01", n: "01", cx: 118, cy: 56, fill: "#2f7ebf", delay: "0.35s" },
  { id: "02", n: "02", cx: 118, cy: 168, fill: "#f0a020", delay: "1.15s" },
  { id: "03", n: "03", cx: 318, cy: 140, fill: "#14b8b8", delay: "2.35s" },
  { id: "04", n: "04", cx: 518, cy: 78, fill: "#7b4ea3", delay: "3.35s" },
  { id: "05", n: "05", cx: 518, cy: 222, fill: "#e23d4a", delay: "4.15s" },
];

export function CodeFirstPath() {
  return (
    <figure className="code-first-path" aria-label="App import and code-first workflow, steps 1 to 5">
      <svg viewBox="0 0 600 280" role="img">
        <path
          className="code-first-route"
          d="M12 56 H118 V230 H318 V78 H518 V222"
        />
        {NODES.map((node) => (
          <g key={node.id} className="code-first-node" style={{ animationDelay: node.delay }}>
            <circle cx={node.cx} cy={node.cy} r="28" fill={node.fill} />
            <text x={node.cx} y={node.cy + 6} textAnchor="middle" fill="white">
              {node.n}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
