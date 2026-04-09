"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type StudySession = {
  id: number;
  duration_seconds: number;
  duration_minutes: number;
  completed: boolean;
  subject: string | null;
  created_at: string;
};

export default function RecentSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadSessions = async () => {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Log in to view your recent sessions.");
      setSessions([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("study_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      setMessage(`Error loading sessions: ${error.message}`);
      setSessions([]);
      setLoading(false);
      return;
    }

    setSessions(data || []);
    setMessage("");
    setLoading(false);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">
          Recent Sessions
        </h2>
        <button
          onClick={loadSessions}
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-slate-600">Loading sessions...</p>}

      {!loading && message && <p className="text-slate-600">{message}</p>}

      {!loading && !message && sessions.length === 0 && (
        <p className="text-slate-600">No sessions yet.</p>
      )}

      {!loading && sessions.length > 0 && (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="font-semibold text-slate-900">
                {session.duration_minutes} minutes
              </p>
              <p className="text-sm text-slate-600">
                {new Date(session.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                {session.subject ? `Subject: ${session.subject}` : "No subject"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}