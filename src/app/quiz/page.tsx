import { QuizSession } from "@/components/QuizSession";
import { loadQuiz } from "@/lib/quiz";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ concept?: string }>;
}) {
  const { concept } = await searchParams;
  const { concepts, pool } = await loadQuiz();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sitecore-red">Quiz</p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">Twenty from the pool</h1>
      <QuizSession concepts={concepts} pool={pool} initialConcept={concept} />
    </main>
  );
}
