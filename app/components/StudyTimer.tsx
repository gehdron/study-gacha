"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type StudyTimerProps = {
  topic: string;
  targetMinutes: number;
  onSessionSaved?: () => void;
};

export default function StudyTimer({
  topic,
  targetMinutes,
  onSessionSaved,
}: StudyTimerProps) {
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
    const minimumSeconds = targetMinutes * 60;
    const calculateGems = (minutes: number) => {
      if (minutes >= 120) return 80;
      if (minutes >= 60) return 30;
      if (minutes >= 25) return 10;
      return 0;
    };
    if (seconds < minimumSeconds) {
      setMessage(`Session must be at least ${targetMinutes} minutes to count.`);
      return;
    }

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

    const gemsEarned = calculateGems(durationMinutes);

    const { error } = await supabase.from("study_sessions").insert([
      {
        user_id: user.id,
        duration_seconds: seconds,
        duration_minutes: durationMinutes,
        completed: true,
        subject: topic,
      },
    ]);

    if (error) {
      setMessage(`Error saving session: ${error.message}`);
      setIsSaving(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("gems")
    .eq("id", user.id)
    .single();

    if (profileError) {
      setMessage("Error fetching profile.");
      setIsSaving(false);
      return;
    }

    const newGems = (profile.gems || 0) + gemsEarned;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ gems: newGems })
      .eq("id", user.id);

    if (updateError) {
      setMessage("Error updating gems.");
      setIsSaving(false);
      return;
    }

    setMessage(`Session saved successfully. Logged ${durationMinutes} minutes.`);
    setIsSaving(false);
    setSeconds(0);
    onSessionSaved?.();
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  const hasMetGoal = seconds >= targetMinutes * 60;
  const progressPercent = Math.min((seconds / (targetMinutes * 60)) * 100, 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 p-7">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-600">
          Studying: {topic}
        </p>
        <p className="mb-4 text-sm text-slate-500">
          Goal: {targetMinutes} minutes
        </p>
      </div>
    </div>
  );
}