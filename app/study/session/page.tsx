import StudyTimer from "@/app/components/StudyTimer";

type StudySessionPageProps = {
  searchParams: Promise<{
    topic?: string;
    duration?: string;
  }>;
};

export default async function StudySessionPage({
  searchParams,
}: StudySessionPageProps) {
  const params = await searchParams;

  const topic = params.topic ?? "General Study";
  const duration = Number(params.duration ?? "25");

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Active Study Session
        </h1>
        <p className="mb-2 text-slate-700">
          <span className="font-semibold">Topic:</span> {topic}
        </p>
        <p className="mb-6 text-slate-700">
          <span className="font-semibold">Target:</span> {duration} minutes
        </p>

        <StudyTimer topic={topic} targetMinutes={duration} />
      </div>
    </main>
  );
}