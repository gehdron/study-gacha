import StudyTimer from "@/app/components/StudyTimer";

export default function StudyPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
        <h1 className="mb-6 text-black text-3xl font-bold">Study Timer</h1>
        <StudyTimer />
    </main>
  );
}