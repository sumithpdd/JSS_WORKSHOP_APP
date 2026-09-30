import { Sidebar } from "@/components/Sidebar";
import { HeroStudio } from "@/components/studio/HeroStudio";

export default function StudioPage() {
  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="px-6 py-8 lg:px-10 lg:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sitecore-red">
          Live exercise
        </p>
        <h1 className="mb-3 max-w-3xl text-3xl font-semibold tracking-tight text-sitecore-navy sm:text-4xl">
          Homepage hero
        </h1>
        <p className="mb-8 max-w-2xl text-stone-600">
          One banner, three sources of truth. The copy is workshop sample content. The third
          stage is the migration.
        </p>
        <HeroStudio />
      </main>
    </div>
  );
}
