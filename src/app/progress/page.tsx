import { Sidebar } from "@/components/Sidebar";
import { ProgressBoard } from "@/components/ProgressBoard";

export default function ProgressPage() {
  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="px-6 py-8 lg:px-10 lg:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sitecore-red">
          Attendee
        </p>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your progress</h1>
        <ProgressBoard />
      </main>
    </div>
  );
}
