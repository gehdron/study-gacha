import RecentSessions from "../components/RecentSessions";

export default function RecentSessionsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
        <h1 className="mb-6 text-black text-3xl font-bold">Study Timer</h1>
        <RecentSessions />
    </main>
  );
}