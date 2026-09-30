import Link from "next/link";
import { lessonHref, type LessonLocation } from "@/lib/course";

export function LessonNav({
  previous,
  next,
}: {
  previous?: LessonLocation;
  next?: LessonLocation;
}) {
  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-between">
      {previous ? (
        <Link
          href={lessonHref(previous.chapter.id, previous.page.id)}
          className="rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm hover:border-stone-400"
        >
          <span className="block text-xs uppercase tracking-wide text-stone-500">Previous</span>
          {previous.page.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={lessonHref(next.chapter.id, next.page.id)}
          className="rounded-lg bg-sitecore-red px-4 py-3 text-sm text-white hover:bg-sitecore-red-dark sm:text-right"
        >
          <span className="block text-xs uppercase tracking-wide text-red-100">Next</span>
          {next.page.title}
        </Link>
      ) : (
        <Link
          href="/studio"
          className="rounded-lg bg-sitecore-red px-4 py-3 text-sm text-white hover:bg-red-700 sm:text-right"
        >
          <span className="block text-xs uppercase tracking-wide text-red-100">Finish in</span>
          Hero studio
        </Link>
      )}
    </div>
  );
}
