export type StudioStage = "" | "hardcoded" | "props" | "layout";

export type AttendeeRecord = {
  id: string;
  name: string;
  updatedAt: string;
  visited: string[];
  checks: Record<string, boolean>;
  studioStage: StudioStage;
  heroTitle: string;
};

const KEY = "jss-workshop-attendee";

export function emptyRecord(): AttendeeRecord {
  return {
    id: "",
    name: "",
    updatedAt: "",
    visited: [],
    checks: {},
    studioStage: "",
    heroTitle: "",
  };
}

export function readAttendee(): AttendeeRecord {
  if (typeof window === "undefined") return emptyRecord();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyRecord();
    const parsed = JSON.parse(raw) as AttendeeRecord;
    return { ...emptyRecord(), ...parsed };
  } catch {
    return emptyRecord();
  }
}

function writeAttendee(record: AttendeeRecord) {
  window.localStorage.setItem(KEY, JSON.stringify(record));
  window.dispatchEvent(new Event("jss-workshop-progress"));
  scheduleSync(record);
}

let syncTimer = 0;

function scheduleSync(record: AttendeeRecord) {
  if (!record.name || !record.id) return;
  window.clearTimeout(syncTimer);
  syncTimer = window.setTimeout(() => {
    void fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  }, 400);
}

export function ensureAttendeeId(): string {
  const current = readAttendee();
  if (current.id) return current.id;
  const id = crypto.randomUUID();
  writeAttendee({ ...current, id });
  return id;
}

export function setAttendeeName(name: string) {
  const current = readAttendee();
  writeAttendee({
    ...current,
    id: current.id || crypto.randomUUID(),
    name: name.trim(),
    updatedAt: new Date().toISOString(),
  });
}

export function markLessonVisited(pageId: string) {
  const current = readAttendee();
  if (current.visited.includes(pageId)) return;
  writeAttendee({
    ...current,
    id: current.id || crypto.randomUUID(),
    visited: [...current.visited, pageId],
    updatedAt: new Date().toISOString(),
  });
}

export function setLessonCheck(key: string, checked: boolean) {
  const current = readAttendee();
  writeAttendee({
    ...current,
    id: current.id || crypto.randomUUID(),
    checks: { ...current.checks, [key]: checked },
    updatedAt: new Date().toISOString(),
  });
}

export function readChecks(): Record<string, boolean> {
  return readAttendee().checks;
}

export function setStudioProgress(studioStage: StudioStage, heroTitle: string) {
  const current = readAttendee();
  writeAttendee({
    ...current,
    id: current.id || crypto.randomUUID(),
    studioStage,
    heroTitle,
    updatedAt: new Date().toISOString(),
  });
}
