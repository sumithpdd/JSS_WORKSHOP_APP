import fs from "fs/promises";
import path from "path";

export async function getLessonMarkdown(file: string): Promise<string> {
  const fullPath = path.join(process.cwd(), "content", "lessons", file);
  return fs.readFile(fullPath, "utf-8");
}
