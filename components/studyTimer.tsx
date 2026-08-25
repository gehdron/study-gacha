"use client"

import { useEffect, useRef, useState } from "react";
import { logStudySession } from "@/app/study/actions";

const SESSION_SECONDS = 50 * 60;

export default function StudyTimer() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [running, setRunning] = useState(false);
  const [reward, setReward] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown, while running
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleFinish(SESSION_SECONDS);
            return SESSION_SECONDS;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Live clock, while idle
  useEffect(() => {
    if (running) return;
    const clockInterval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, [running]);

  async function handleFinish(secondsElapsedOverride?: number) {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const elapsedSeconds = secondsElapsedOverride ?? SESSION_SECONDS - secondsLeft;
    const minutes = Math.max(1, Math.round(elapsedSeconds / 60));

    const formData = new FormData();
    formData.set("minutes", String(minutes));
    const result = await logStudySession(undefined, formData);

    if (!result.error && result.currencyAwarded != null) {
      setReward(result.currencyAwarded);
      setTimeout(() => setReward(null), 4000);
    }

    setSecondsLeft(SESSION_SECONDS);
  }

  function handleStartStop() {
    if (running) {
      handleFinish();
    } else {
      setRunning(true);
    }
  }

  const countdownMinutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const countdownSeconds = String(secondsLeft % 60).padStart(2, "0");

  const clockDisplay = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-neutral-950/95 backdrop-blur border border-neutral-800 rounded-full px-4 py-2 shadow-xl text-white">
      <span className="font-mono text-lg tabular-nums">
        {running ? `${countdownMinutes}:${countdownSeconds}` : clockDisplay}
      </span>
      <button
        onClick={handleStartStop}
        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
          running
            ? "bg-red-600 hover:bg-red-500"
            : "bg-purple-600 hover:bg-purple-500"
        }`}
      >
        {running ? "Stop" : "Start"}
      </button>
      {reward != null && (
        <span className="text-green-400 text-sm">+{reward}</span>
      )}
    </div>
  );
}