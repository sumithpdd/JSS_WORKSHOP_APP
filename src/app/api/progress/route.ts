import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { AttendeeRecord, StudioStage } from "@/lib/attendee";

const directory = path.join(process.cwd(), "data", "progress");
const idPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const stages = new Set<StudioStage>(["", "hardcoded", "props", "layout"]);

function asRecord(value: unknown): AttendeeRecord | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Partial<AttendeeRecord>;
  if (typeof body.id !== "string" || !idPattern.test(body.id)) return null;
  if (typeof body.name !== "string" || body.name.trim().length === 0) return null;

  const visited = Array.isArray(body.visited)
    ? body.visited.filter((item): item is string => typeof item === "string").slice(0, 80)
    : [];

  const checks: Record<string, boolean> = {};
  if (body.checks && typeof body.checks === "object") {
    for (const [key, checked] of Object.entries(body.checks).slice(0, 200)) {
      if (typeof checked === "boolean") checks[key.slice(0, 120)] = checked;
    }
  }

  const studioStage = stages.has(body.studioStage as StudioStage)
    ? (body.studioStage as StudioStage)
    : "";

  return {
    id: body.id,
    name: body.name.trim().slice(0, 80),
    updatedAt: new Date().toISOString(),
    visited,
    checks,
    studioStage,
    heroTitle: typeof body.heroTitle === "string" ? body.heroTitle.slice(0, 180) : "",
  };
}

export async function GET() {
  await fs.mkdir(directory, { recursive: true });
  const files = await fs.readdir(directory);
  const records: AttendeeRecord[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = await fs.readFile(path.join(directory, file), "utf8");
      const record = asRecord(JSON.parse(raw));
      if (record) records.push(record);
    } catch {
      continue;
    }
  }
  records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const record = asRecord(await request.json());
  if (!record) {
    return NextResponse.json({ error: "A name is required." }, { status: 400 });
  }
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(
    path.join(directory, `${record.id}.json`),
    JSON.stringify(record, null, 2),
    "utf8"
  );
  return NextResponse.json(record);
}
