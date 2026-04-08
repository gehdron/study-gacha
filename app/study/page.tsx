import StudyTimer from "@/app/components/StudyTimer";

export default function StudyPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">Study Timer</h1>
        <StudyTimer />
      </div>
    </main>
  );
}