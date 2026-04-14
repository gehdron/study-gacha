import SummonPanel from "@/app/components/SummonPanel";

export default function SummonPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Summon</h1>
        <p className="mb-6 text-slate-600">
          Spend gems to pull a random reward.
        </p>

        <SummonPanel />
      </div>
    </main>
  );
}