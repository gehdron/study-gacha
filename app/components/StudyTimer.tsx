"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    // const minimumSeconds = 25 * 60;

    // if (seconds < minimumSeconds) {
    //   setMessage("Session must be at least 25 minutes to count.");
    //   return;
    // }

    setIsSaving(true);
    setIsRunning(false);
    setMessage("");

    const durationMinutes = Number((seconds / 60).toFixed(2));

    const { data, error } = await supabase
      .from("study_sessions")
      .insert([
        {
          duration_seconds: seconds,
          duration_minutes: durationMinutes,
          completed: true,
          subject: null,
        },
      ])
      .select();

    if (error) {
      setMessage(`Error saving session: ${error.message}`);
      setIsSaving(false);
      return;
    }

    setMessage(
      `Session saved successfully. Logged ${durationMinutes} minutes.`
    );
    console.log("Saved session:", data);

    setIsSaving(false);
    setSeconds(0);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  //const hasMetGoal = seconds >= 25 * 60;

  return (
    <div className="space-y-6">
      <div className="text-center text-5xl font-bold">{formattedTime}</div>

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
          //disabled={!hasMetGoal || isSaving}
          disabled={isSaving}
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Complete Session"}
        </button>
      </div>

      <p className="text-center text-slate-600">
        {isRunning ? "Study session in progress..." : "Timer is paused."}
      </p>
{/*     
      <p className="text-center font-medium">
        {hasMetGoal
          ? "Study goal reached. You can complete this session."
          : "Study for at least 25 minutes to complete this session."}
      </p> */}

      {message && (
        <p className="text-center text-sm font-medium text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}