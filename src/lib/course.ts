import course from "@/content/course.json";

export type CourseConfig = typeof course;
export type Chapter = CourseConfig["chapters"][number];
export type LessonPage = Chapter["pages"][number];

export type LessonLocation = {
  chapter: Chapter;
  page: LessonPage;
  chapterIndex: number;
  pageIndex: number;
};

export function getCourse(): CourseConfig {
  return course;
}

export function getChapters(): Chapter[] {
  return course.chapters;
}

export function flattenLessons(): LessonLocation[] {
  return course.chapters.flatMap((chapter, chapterIndex) =>
    chapter.pages.map((page, pageIndex) => ({
      chapter,
      page,
      chapterIndex,
      pageIndex,
    }))
  );
}

export function getLesson(
  chapterId: string,
  pageId: string
): LessonLocation | undefined {
  const chapterIndex = course.chapters.findIndex((chapter) => chapter.id === chapterId);
  if (chapterIndex < 0) return undefined;
  const chapter = course.chapters[chapterIndex];
  const pageIndex = chapter.pages.findIndex((page) => page.id === pageId);
  if (pageIndex < 0) return undefined;
  return { chapter, page: chapter.pages[pageIndex], chapterIndex, pageIndex };
}

export function lessonHref(chapterId: string, pageId: string): string {
  return `/learn/${chapterId}/${pageId}`;
}

export function firstLessonHref(): string {
  const first = course.chapters[0]?.pages[0];
  const chapter = course.chapters[0];
  if (!first || !chapter) return "/";
  return lessonHref(chapter.id, first.id);
}

export function neighbourLessons(chapterId: string, pageId: string): {
  previous?: LessonLocation;
  next?: LessonLocation;
} {
  const all = flattenLessons();
  const index = all.findIndex(
    (item) => item.chapter.id === chapterId && item.page.id === pageId
  );
  if (index < 0) return {};
  return {
    previous: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}

export function lessonCount(): number {
  return flattenLessons().length;
}

export function courseMinutes(): number {
  return flattenLessons().reduce((total, item) => total + item.page.minutes, 0);
}
