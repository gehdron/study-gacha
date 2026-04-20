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
    <main>
      <div className="fixed inset-0 bg-[url('/wp11092661.jpg')] bg-cover bg-center -z-10" />
      <StudyTimer topic={topic} targetMinutes={duration} />
    </main>
  );
}