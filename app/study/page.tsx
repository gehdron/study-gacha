"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudyLaunchPage() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("25");

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTopic = topic.trim() || "General Study";

    const durationNumber = Number(duration);

    if (!durationNumber || durationNumber < 1) {
      alert("Please enter a valid duration (at least 1 minute).");
      return;
    }

    if (durationNumber > 300) {
      alert("Maximum session is 300 minutes.");
      return;
  }

  const encodedTopic = encodeURIComponent(trimmedTopic);
  const encodedDuration = encodeURIComponent(durationNumber.toString());

  router.push(`/study/session?topic=${encodedTopic}&duration=${encodedDuration}`);
};

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Start Study Session
        </h1>
        <p className="mb-6 text-slate-600">
          Choose what you want to study and how long you want to focus.
        </p>

        <form onSubmit={handleStartSession} className="space-y-6">
          <div>
            <label
              htmlFor="topic"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Study Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Chemistry, Math, History"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Study Duration (minutes)
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              max="300"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Launch Session
          </button>
        </form>
      </div>
    </main>
  );
}