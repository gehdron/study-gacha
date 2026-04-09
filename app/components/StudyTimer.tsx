"use client";

import { useEffect, useState } from "react";
import { createClient} from "@/lib/client";

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setMessage("");
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMessage("");
  };

  
  const handleCompleteSession = async () => {

    setIsSaving(true);
    setIsRunning(false);
    setMessage("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to save a session.");
      setIsSaving(false);
      return;
    }

    const durationMinutes = Number((seconds / 60).toFixed(2));

    const { error } = await supabase.from("study_sessions").insert([
      {
        user_id: user.id,
        duration_seconds: seconds,
        duration_minutes: durationMinutes,
        completed: true,
        subject: null,
      },
    ]);

    if (error) {
      setMessage(`Error saving session: ${error.message}`);
      setIsSaving(false);
      return;
    }

    setMessage(`Session saved successfully. Logged ${durationMinutes} minutes.`);
    setIsSaving(false);
    setSeconds(0);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <div className="text-center text-black text-5xl font-bold">{formattedTime}</div>
        <div className = "">
            <div className="flex flex-wrap justify-center gap-4">
                <button
                onClick={handleStart}
                disabled={isRunning || isSaving}
                className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                  Start
                </button>

                <button
                onClick={handleStop}
                disabled={!isRunning || isSaving}
                className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                  Stop
                </button>

                <button
                onClick={handleReset}
                disabled={isSaving}
                className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                  Reset
                </button>

                <button
                onClick={handleCompleteSession}
                disabled={isSaving}
                className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                {isSaving ? "Saving..." : "Complete Session"}
                </button>
            </div>
      </div>

      <p className="text-center text-slate-600">
        {isRunning ? "Study session in progress..." : "Timer is paused."}
      </p>

      {message && (
        <p className="text-center text-sm font-medium text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}