import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LessonNav } from "@/components/LessonNav";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { getLesson, getChapters, neighbourLessons } from "@/lib/course";
import { loadQuiz } from "@/lib/quiz";
import { getLessonMarkdown } from "@/lib/content";

export function generateStaticParams() {
  return getChapters().flatMap((chapter) =>
    chapter.pages.map((page) => ({
      chapterId: chapter.id,
      pageId: page.id,
    }))
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ chapterId: string; pageId: string }>;
}) {
  const { chapterId, pageId } = await params;
  const lesson = getLesson(chapterId, pageId);
  if (!lesson) notFound();

  const markdown = await getLessonMarkdown(lesson.page.file);
  const { previous, next } = neighbourLessons(chapterId, pageId);
  const { concepts } = await loadQuiz();
  const tags = lesson.page.concepts
    .map((id) => concepts.find((concept) => concept.id === id))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept));

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <article className="mx-auto w-full max-w-3xl px-6 py-8 lg:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sitecore-red">
          {lesson.chapter.title}
        </p>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {lesson.page.title}
        </h1>
        <p className="mb-4 text-sm text-stone-500">
          About {lesson.page.minutes} minutes · lesson {lesson.pageIndex + 1} of{" "}
          {lesson.chapter.pages.length} in this chapter
        </p>
        {tags.length > 0 ? (
          <p className="mb-8 flex flex-wrap gap-2">
            {tags.map((concept) => (
              <Link
                key={concept.id}
                href={`/quiz?concept=${concept.id}`}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sitecore-navy ring-1 ring-stone-200"
              >
                {concept.label}
              </Link>
            ))}
          </p>
        ) : null}
        <MarkdownContent content={markdown} pageId={lesson.page.id} />
        <LessonNav previous={previous} next={next} />
      </article>
    </div>
  );
}
