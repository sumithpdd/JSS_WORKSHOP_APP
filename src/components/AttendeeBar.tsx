"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readAttendee, setAttendeeName } from "@/lib/attendee";

export function AttendeeBar() {
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setName(readAttendee().name);
    sync();
    setReady(true);
    window.addEventListener("jss-workshop-progress", sync);
    return () => window.removeEventListener("jss-workshop-progress", sync);
  }, []);

  if (!ready) return null;

  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        {name ? (
          <p className="text-sm text-stone-600">
            Signed in as <span className="font-semibold text-ink">{name}</span>
          </p>
        ) : (
          <form
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.trim()) return;
              setAttendeeName(draft);
            }}
          >
            <label className="text-sm text-stone-600" htmlFor="attendee-name">
              Your name, so this workshop can keep your progress
            </label>
            <input
              id="attendee-name"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm"
              placeholder="Alex Rivera"
            />
            <button type="submit" className="rounded-lg bg-sitecore-red px-3 py-1.5 text-sm font-semibold text-white hover:bg-sitecore-red-dark">
              Save
            </button>
          </form>
        )}
        <div className="flex gap-4 text-sm">
          <Link href="/progress" className="font-medium text-ink underline decoration-stone-300">
            Your progress
          </Link>
          <Link href="/attendees" className="font-medium text-ink underline decoration-stone-300">
            Attendees
          </Link>
        </div>
      </div>
    </div>
  );
}
