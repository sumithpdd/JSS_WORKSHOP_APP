"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { QuizConcept, QuizPool, QuizQuestion } from "@/lib/quiz";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function draw(pool: QuizPool, concept: string): QuizQuestion[] {
  const source = concept ? pool.questions.filter((question) => question.concept === concept) : pool.questions;
  return shuffle(source)
    .slice(0, pool.limit)
    .map((question) => ({ ...question, choices: shuffle(question.choices) }));
}

export function QuizSession({
  concepts,
  pool,
  initialConcept = "",
}: {
  concepts: QuizConcept[];
  pool: QuizPool;
  initialConcept?: string;
}) {
  const labels = useMemo(
    () => Object.fromEntries(concepts.map((concept) => [concept.id, concept.label])),
    [concepts]
  );
  const [concept, setConcept] = useState(
    concepts.some((item) => item.id === initialConcept) ? initialConcept : ""
  );
  const [round, setRound] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const available = concept
    ? pool.questions.filter((question) => question.concept === concept).length
    : pool.questions.length;
  const asked = Math.min(pool.limit, available);

  function start() {
    setRound(draw(pool, concept));
    setIndex(0);
    setAnswers({});
    setDone(false);
  }

  if (!round) {
    return (
      <div>
        <p className="mb-6 max-w-2xl text-stone-600">
          Each attempt draws {pool.limit} questions from the pool of {pool.questions.length}. Edit the
          questions, the right and wrong answers, and the limit in{" "}
          <code>content/quiz/pool.json</code>. Concept names live in <code>content/quiz/concepts.json</code>.
          Lesson tags live on each page in <code>src/content/course.json</code>.
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          <ConceptChip active={concept === ""} onClick={() => setConcept("")} label="All concepts" />
          {concepts.map((item) => (
            <ConceptChip
              key={item.id}
              active={concept === item.id}
              onClick={() => setConcept(item.id)}
              label={item.label}
            />
          ))}
        </div>
        <p className="mb-6 text-sm text-stone-500">
          {asked} question{asked === 1 ? "" : "s"} in this sitting
          {available < pool.limit ? `, because this concept has ${available} in the pool` : ""}.
        </p>
        <button
          type="button"
          onClick={start}
          disabled={asked === 0}
          className="rounded-full bg-sitecore-red px-6 py-3 text-sm font-semibold text-white hover:bg-sitecore-red-dark disabled:opacity-40"
        >
          Start the quiz
        </button>
      </div>
    );
  }

  if (done) {
    const score = round.filter((question) => {
      const chosen = question.choices.find((choice) => choice.id === answers[question.id]);
      return chosen?.correct;
    }).length;
    return (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-sitecore-red">Result</p>
        <h2 className="mb-6 text-3xl font-semibold">
          {score} of {round.length}
        </h2>
        <ol className="mb-8 space-y-4">
          {round.map((question, questionIndex) => {
            const chosen = question.choices.find((choice) => choice.id === answers[question.id]);
            const right = question.choices.find((choice) => choice.correct);
            const correct = Boolean(chosen?.correct);
            return (
              <li key={question.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {questionIndex + 1}. {labels[question.concept] || question.concept}
                </p>
                <p className="mt-1 font-medium">{question.prompt}</p>
                <p className={`mt-2 text-sm ${correct ? "text-emerald-700" : "text-sitecore-red"}`}>
                  {correct ? "Correct" : `Your answer: ${chosen?.text || "No answer"}`}
                </p>
                {!correct ? <p className="text-sm text-stone-700">Right answer: {right?.text}</p> : null}
                <p className="mt-2 text-sm text-stone-600">{question.explain}</p>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => setRound(null)}
          className="rounded-full bg-sitecore-navy px-6 py-3 text-sm font-semibold text-white"
        >
          Draw another set
        </button>
      </div>
    );
  }

  const question = round[index];
  const selected = answers[question.id];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-stone-500">
        <span>
          Question {index + 1} of {round.length}
        </span>
        <span>{labels[question.concept] || question.concept}</span>
      </div>
      <h2 className="mb-6 text-2xl font-semibold leading-snug">{question.prompt}</h2>
      <div className="mb-8 space-y-3">
        {question.choices.map((choice) => {
          const active = selected === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}
              className={`block w-full rounded-2xl border px-4 py-3 text-left ${
                active ? "border-sitecore-navy bg-sitecore-navy text-white" : "border-stone-200 bg-white hover:border-stone-400"
              }`}
            >
              {choice.text}
            </button>
          );
        })}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((value) => value - 1)}
          className="rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold disabled:opacity-40"
        >
          Back
        </button>
        {index < round.length - 1 ? (
          <button
            type="button"
            disabled={!selected}
            onClick={() => setIndex((value) => value + 1)}
            className="rounded-full bg-sitecore-red px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!selected}
            onClick={() => setDone(true)}
            className="rounded-full bg-sitecore-red px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Finish
          </button>
        )}
        <Link href="/" className="ml-auto self-center text-sm text-stone-500">
          Leave quiz
        </Link>
      </div>
    </div>
  );
}

function ConceptChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm ${
        active ? "bg-sitecore-navy text-white" : "bg-white text-stone-700 ring-1 ring-stone-200"
      }`}
    >
      {label}
    </button>
  );
}
