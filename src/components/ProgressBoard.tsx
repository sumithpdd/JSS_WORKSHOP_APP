"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readAttendee, type AttendeeRecord } from "@/lib/attendee";
import { getChapters, lessonCount, lessonHref } from "@/lib/course";

export function ProgressBoard() {
  const [record, setRecord] = useState<AttendeeRecord | null>(null);
  const chapters = getChapters();
  const total = lessonCount();

  useEffect(() => {
    const sync = () => setRecord(readAttendee());
    sync();
    window.addEventListener("jss-workshop-progress", sync);
    return () => window.removeEventListener("jss-workshop-progress", sync);
  }, []);

  if (!record) return null;
  const opened = record.visited.length;
  const ticks = Object.values(record.checks).filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Lessons opened" value={`${opened} / ${total}`} />
        <Stat label="Tasks ticked" value={String(ticks)} />
        <Stat label="Studio stage" value={record.studioStage || "Not opened"} />
      </div>
      {!record.name ? (
        <p className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
          Add your name in the bar at the top. Until then, progress stays in this browser only.
        </p>
      ) : null}
      {record.heroTitle ? (
        <p className="text-sm text-stone-600">
          Latest hero title in the studio: <span className="font-semibold text-ink">{record.heroTitle}</span>
        </p>
      ) : null}
      <div className="space-y-6">
        {chapters.map((chapter) => (
          <section key={chapter.id}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              {chapter.title}
            </h2>
            <ul className="space-y-1">
              {chapter.pages.map((page) => {
                const seen = record.visited.includes(page.id);
                return (
                  <li key={page.id}>
                    <Link
                      href={lessonHref(chapter.id, page.id)}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm hover:bg-stone-50"
                    >
                      <span>{page.title}</span>
                      <span className={seen ? "text-ink" : "text-stone-400"}>
                        {seen ? "Opened" : "Not yet"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  );
}
