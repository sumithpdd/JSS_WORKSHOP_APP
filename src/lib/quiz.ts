import { readFile } from "fs/promises";
import path from "path";

export type QuizConcept = {
  id: string;
  label: string;
};

export type QuizChoice = {
  id: string;
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  concept: string;
  prompt: string;
  choices: QuizChoice[];
  explain: string;
};

export type QuizPool = {
  limit: number;
  questions: QuizQuestion[];
};

export async function loadQuiz(): Promise<{ concepts: QuizConcept[]; pool: QuizPool }> {
  const root = process.cwd();
  const [conceptsRaw, poolRaw] = await Promise.all([
    readFile(path.join(root, "content/quiz/concepts.json"), "utf8"),
    readFile(path.join(root, "content/quiz/pool.json"), "utf8"),
  ]);
  return {
    concepts: JSON.parse(conceptsRaw) as QuizConcept[],
    pool: JSON.parse(poolRaw) as QuizPool,
  };
}
