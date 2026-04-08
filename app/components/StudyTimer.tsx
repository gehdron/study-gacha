"use client";

import { useEffect, useState } from "react";

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

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
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <div className="text-center text-5xl font-bold">{formattedTime}</div>

      <div className="flex justify-center gap-4">
        <button
        onClick={handleStart}
        disabled={isRunning}
        className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
            Start
        </button>

        <button
        onClick={handleStop}
        disabled={!isRunning}
        className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
            Stop
        </button>

        <button
          onClick={handleReset}
          className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white"
        >
          Reset
        </button>
      </div>

      <p className="text-center text-slate-600">
        {isRunning ? "Study session in progress..." : "Timer is paused."}
      </p>
    </div>
  );
}