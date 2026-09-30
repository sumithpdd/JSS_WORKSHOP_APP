"use client";

import { useEffect, useState } from "react";
import type { AttendeeRecord } from "@/lib/attendee";
import { lessonCount } from "@/lib/course";

export function AttendeeRoster() {
  const [records, setRecords] = useState<AttendeeRecord[] | null>(null);
  const [error, setError] = useState("");
  const total = lessonCount();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/progress", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load attendees");
        const data = (await response.json()) as AttendeeRecord[];
        if (!cancelled) {
          setRecords(data);
          setError("");
        }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Could not load attendees");
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (error) return <p className="text-sm text-sitecore-red">{error}</p>;
  if (!records) return <p className="text-sm text-stone-500">Loading attendees…</p>;
  if (records.length === 0) {
    return (
      <p className="rounded-xl bg-white p-4 text-sm text-stone-600">
        No one has saved a name on this server yet. Progress appears here after an attendee enters
        their name and opens a lesson.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Lessons</th>
            <th className="px-4 py-3 font-semibold">Tasks</th>
            <th className="px-4 py-3 font-semibold">Studio</th>
            <th className="px-4 py-3 font-semibold">Hero title</th>
            <th className="px-4 py-3 font-semibold">Updated</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-stone-100">
              <td className="px-4 py-3 font-medium">{record.name}</td>
              <td className="px-4 py-3">
                {record.visited.length} / {total}
              </td>
              <td className="px-4 py-3">{Object.values(record.checks).filter(Boolean).length}</td>
              <td className="px-4 py-3">{record.studioStage || "—"}</td>
              <td className="px-4 py-3">{record.heroTitle || "—"}</td>
              <td className="px-4 py-3 text-stone-500">
                {new Date(record.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
