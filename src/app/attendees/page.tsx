import { Sidebar } from "@/components/Sidebar";
import { AttendeeRoster } from "@/components/AttendeeRoster";

export default function AttendeesPage() {
  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="px-6 py-8 lg:px-10 lg:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sitecore-red">
          Instructor
        </p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">Attendees</h1>
        <p className="mb-6 max-w-2xl text-sm leading-6 text-stone-600">
          Names and progress are stored on the machine running this workshop, in{" "}
          <code>data/progress</code>. The list refreshes every few seconds. Anyone who can open
          this site can see it, so keep the workshop server on the training network.
        </p>
        <AttendeeRoster />
      </main>
    </div>
  );
}
