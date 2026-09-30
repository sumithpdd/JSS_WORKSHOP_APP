"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SitecoreLogo } from "@/components/SiteHeader";
import { readAttendee } from "@/lib/attendee";
import {
  getChapters,
  lessonHref,
  type Chapter,
} from "@/lib/course";

export function Sidebar() {
  const pathname = usePathname();
  const chapters = getChapters();
  const [open, setOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setVisited(readAttendee().visited);
    sync();
    window.addEventListener("jss-workshop-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("jss-workshop-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const total = chapters.reduce((sum, chapter) => sum + chapter.pages.length, 0);
  const done = chapters
    .flatMap((chapter) => chapter.pages)
    .filter((page) => visited.includes(page.id)).length;

  return (
    <>
      <div className="sticky top-16 z-30 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/" className="text-sm font-semibold tracking-wide text-sitecore-navy">
          Lessons
        </Link>
        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-1.5 text-sm"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Close" : "Lessons"}
        </button>
      </div>
      {open ? (
        <button
          type="button"
          aria-label="Close lessons"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 w-72 overflow-y-auto border-r border-stone-200 bg-white px-4 py-5 transition-transform lg:static lg:top-auto lg:z-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="mb-4 block">
          <SitecoreLogo variant="dark" className="h-6 w-auto" />
        </Link>
        <p className="mb-1 text-lg font-semibold text-sitecore-navy">JSS Workshop</p>
        <p className="mb-4 text-xs text-stone-500">
          {done} of {total} lessons opened
        </p>
        <div className="mb-5 space-y-1">
          <SideLink href="/quiz" pathname={pathname} label="Quiz" />
          <SideLink href="/studio" pathname={pathname} label="Hero studio" />
          <SideLink href="/progress" pathname={pathname} label="Your progress" />
          <SideLink href="/attendees" pathname={pathname} label="Attendees" />
        </div>
        <nav className="space-y-5">
          {chapters.map((chapter, index) => (
            <ChapterNav
              key={chapter.id}
              chapter={chapter}
              index={index}
              pathname={pathname}
              visited={visited}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function SideLink({
  href,
  pathname,
  label,
}: {
  href: string;
  pathname: string;
  label: string;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2 text-sm font-medium ${
        active ? "bg-sitecore-navy text-white" : "bg-paper text-sitecore-navy hover:bg-stone-200"
      }`}
    >
      {label}
    </Link>
  );
}

function ChapterNav({
  chapter,
  index,
  pathname,
  visited,
}: {
  chapter: Chapter;
  index: number;
  pathname: string;
  visited: string[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {String(index + 1).padStart(2, "0")} {chapter.title}
      </p>
      <ul className="space-y-1">
        {chapter.pages.map((page) => {
          const href = lessonHref(chapter.id, page.id);
          const active = pathname === href;
          const seen = visited.includes(page.id);
          return (
            <li key={page.id}>
              <Link
                href={href}
                className={`flex items-start gap-2 rounded-md px-2 py-1.5 text-sm leading-5 ${
                  active ? "bg-paper font-medium text-ink" : "text-stone-600 hover:bg-paper"
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    active ? "bg-sitecore-red" : seen ? "bg-stone-400" : "bg-stone-300"
                  }`}
                />
                <span>{page.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
