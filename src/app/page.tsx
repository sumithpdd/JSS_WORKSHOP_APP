import Link from "next/link";
import { courseMinutes, firstLessonHref, getChapters, lessonCount } from "@/lib/course";

const PATH = ["React portal", "MVC", "SXA", "JSS", "Hero"];

export default function HomePage() {
  const chapters = getChapters();

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sitecore-red">
          Guided workshop
        </p>
        <h1 className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          Take a homepage hero from MVC to JSS.
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-8 text-stone-600">
          This workshop shows how Sitecore content and layout reach a React application. You
          follow one hero through a coupled MVC rendering, the site structure SXA still owns,
          and the JSS component that draws the fields an author edits.
        </p>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={firstLessonHref()}
            className="rounded-full bg-sitecore-red px-6 py-3 text-center text-sm font-semibold text-white hover:bg-sitecore-red-dark"
          >
            Start the workshop
          </Link>
          <Link
            href="/quiz"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold"
          >
            Take the quiz
          </Link>
          <Link
            href="/studio"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold"
          >
            Open the hero studio
          </Link>
        </div>

        <ol className="mb-12 flex flex-wrap gap-2">
          {PATH.map((step, index) => (
            <li
              key={step}
              className="rounded-full bg-white px-3 py-1 text-sm text-stone-700 shadow-sm"
            >
              <span className="mr-2 text-stone-400">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <Stat label="Lessons" value={String(lessonCount())} />
          <Stat label="Chapters" value={String(chapters.length)} />
          <Stat label="Guided time" value={`${courseMinutes()} min`} />
        </div>

        <section className="mb-12 rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="mb-2 text-xl font-semibold">What you will be able to do</h2>
          <ul className="space-y-2 text-stone-700">
            <li>Explain coupled MVC, pure headless, and hybrid headless without a slide.</li>
            <li>Name what SXA still owns when the front end is React.</li>
            <li>Read a Layout Service document and point at placeholder, component, and fields.</li>
            <li>Migrate one homepage hero from a hard-coded banner to layout data.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Lessons</h2>
          <div className="grid gap-4">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                href={`/learn/${chapter.id}/${chapter.pages[0].id}`}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:border-sitecore-red"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Chapter {index + 1}
                </p>
                <h3 className="text-lg font-semibold">{chapter.title}</h3>
                <p className="text-sm text-stone-600">{chapter.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  );
}
