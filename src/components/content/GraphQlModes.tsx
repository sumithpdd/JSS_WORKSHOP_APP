const modes = [
  {
    kicker: "In process",
    title: "Integrated GraphQL",
    tone: "integrated",
    points: [
      "Reshape Layout Service rendering data without server-side customization.",
      "Queries are executed by the Layout Service in-process.",
    ],
  },
  {
    kicker: "From the client",
    title: "Connected GraphQL",
    tone: "connected",
    points: [
      "GraphQL HTTP or WebSocket requests initiated by the client.",
      "Client libraries such as Apollo Client are recommended.",
    ],
  },
];

export function GraphQlModes() {
  return (
    <figure className="graphql-modes" aria-label="Integrated GraphQL versus Connected GraphQL">
      {modes.map((mode, index) => (
        <div key={mode.title} className="graphql-modes-slot">
          {index === 1 ? (
            <div className="graphql-vs" aria-hidden="true">
              VS
            </div>
          ) : null}
          <article className={`graphql-card graphql-card-${mode.tone}`}>
            <p className="graphql-kicker">{mode.kicker}</p>
            <h3>{mode.title}</h3>
            <ul>
              {mode.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      ))}
    </figure>
  );
}
