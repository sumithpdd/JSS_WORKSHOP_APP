function Cube({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g className="topology-node" style={{ animationDelay: delay }}>
      <rect x={x} y={y} width="54" height="54" rx="3" fill="white" stroke="#4b5563" strokeWidth="2.5" />
      <rect x={x + 15} y={y + 15} width="24" height="24" fill="#8bc53f" />
    </g>
  );
}

function Globe({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g className="topology-node" style={{ animationDelay: delay }}>
      <circle cx={x} cy={y} r="22" fill="none" stroke="#1aa3d8" strokeWidth="3" />
      <ellipse cx={x} cy={y} rx="10" ry="22" fill="none" stroke="#1aa3d8" strokeWidth="2" />
      <path d={`M${x - 22} ${y} H${x + 22}`} stroke="#1aa3d8" strokeWidth="2" />
    </g>
  );
}

function Balancer({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g className="topology-node" style={{ animationDelay: delay }}>
      <polygon points={`${x},${y} ${x + 52},${y + 12} ${x + 52},${y + 36} ${x},${y + 48}`} fill="#1aa3d8" />
      <path
        d={`M${x + 16} ${y + 28} V${y + 16} M${x + 26} ${y + 28} V${y + 12} M${x + 36} ${y + 28} V${y + 16}`}
        stroke="white"
        strokeWidth="2"
      />
    </g>
  );
}

function Page({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g className="topology-node" style={{ animationDelay: delay }}>
      <rect x={x} y={y} width="36" height="44" rx="2" fill="none" stroke="#9ca3af" strokeWidth="2" />
      <circle cx={x + 18} cy={y + 24} r="8" fill="none" stroke="#6b7280" strokeWidth="1.5" />
    </g>
  );
}

function Visitor({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g className="topology-node" style={{ animationDelay: delay }}>
      <circle cx={x} cy={y} r="7" fill="white" stroke="#d1d5db" strokeWidth="2" />
    </g>
  );
}

function Link({ d, delay }: { d: string; delay: string }) {
  return <path className="topology-link" d={d} style={{ animationDelay: delay }} />;
}

function Integrated() {
  return (
    <svg viewBox="0 0 760 230" role="img" aria-label="Integrated topology. Node runs beside each Sitecore instance. Both instances meet a load balancer, which serves the visitor.">
      <Link d="M78 55 H128" delay="0.2s" />
      <Link d="M78 155 H128" delay="0.35s" />
      <Link d="M172 55 H210 V105 H250" delay="0.7s" />
      <Link d="M172 155 H210 V105" delay="0.7s" />
      <Link d="M310 105 H700" delay="1.3s" />
      <Link d="M460 105 L560 36" delay="1.7s" />
      <Link d="M596 58 L700 98" delay="2s" />
      <Cube x={24} y={28} delay="0.15s" />
      <Cube x={24} y={128} delay="0.3s" />
      <Globe x={150} y={55} delay="0.55s" />
      <Globe x={150} y={155} delay="0.7s" />
      <Balancer x={250} y={77} delay="1.15s" />
      <Page x={560} y={14} delay="1.9s" />
      <Visitor x={700} y={105} delay="2.2s" />
      <text x={51} y={104} textAnchor="middle">Node</text>
      <text x={150} y={96} textAnchor="middle">Sitecore</text>
      <text x={276} y={154} textAnchor="middle">Load balancer</text>
      <text x={700} y={128} textAnchor="middle">Visitor</text>
    </svg>
  );
}

function Headless() {
  return (
    <svg viewBox="0 0 820 230" role="img" aria-label="Headless topology. Sitecore Content Delivery sits behind a load balancer. A separate Node tier sits behind a second load balancer, which serves the visitor.">
      <Link d="M72 55 H110 V105 H150" delay="0.25s" />
      <Link d="M72 155 H110 V105" delay="0.25s" />
      <Link d="M210 105 H250" delay="0.8s" />
      <Link d="M250 105 V55 H290" delay="0.95s" />
      <Link d="M250 105 V155 H290" delay="0.95s" />
      <Link d="M344 55 H390 V105" delay="1.4s" />
      <Link d="M344 155 H390 V105" delay="1.4s" />
      <Link d="M450 105 H760" delay="1.8s" />
      <Link d="M560 105 L650 36" delay="2.15s" />
      <Link d="M686 58 L760 98" delay="2.4s" />
      <Globe x={50} y={55} delay="0.1s" />
      <Globe x={50} y={155} delay="0.2s" />
      <Balancer x={150} y={77} delay="0.65s" />
      <Cube x={290} y={28} delay="1.15s" />
      <Cube x={290} y={128} delay="1.25s" />
      <Balancer x={390} y={77} delay="1.7s" />
      <Page x={650} y={14} delay="2.3s" />
      <Visitor x={760} y={105} delay="2.55s" />
      <text x={50} y={196} textAnchor="middle">Sitecore</text>
      <text x={317} y={204} textAnchor="middle">Node</text>
      <text x={760} y={128} textAnchor="middle">Visitor</text>
    </svg>
  );
}

export function TopologyDiagram({ kind }: { kind: "integrated" | "headless" }) {
  return (
    <figure className="topology-diagram">
      {kind === "headless" ? <Headless /> : <Integrated />}
    </figure>
  );
}
