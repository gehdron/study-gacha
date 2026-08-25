"use server"

import { createClient } from "@/app/lib/supabase/server";

export async function logStudySession(prevState: any, formData: FormData) {
  const minutesRaw = formData.get("minutes");
  const minutes = Number(minutesRaw);

  if (typeof minutesRaw !== "string" || isNaN(minutes) || minutes <= 0) {
    return { error: "Enter a valid number of minutes" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("log_study_session", {
    p_minutes: minutes,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null, currencyAwarded: data.currencyAwarded };
}

export async function createTask(prevState: any, formData: FormData) {
  const title = formData.get("title");
  const taskType = formData.get("taskType");
  const estimatedMinutesRaw = formData.get("estimatedMinutes");
  const estimatedMinutes = Number(estimatedMinutesRaw);

  if (
    typeof title !== "string" ||
    typeof taskType !== "string" ||
    !["daily", "weekly", "monthly"].includes(taskType) ||
    typeof estimatedMinutesRaw !== "string" ||
    isNaN(estimatedMinutes) ||
    estimatedMinutes <= 0
  ) {
    return { error: "Fill out all fields correctly" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "Not logged in" };
  }

  const { error } = await supabase.from("tasks").insert({
    user_id: userData.user.id,
    title,
    task_type: taskType,
    estimated_minutes: estimatedMinutes,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function completeTask(prevState: any, formData: FormData) {
  const taskId = formData.get("taskId");

  if (typeof taskId !== "string") {
    return { error: "Missing task id" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("complete_task", {
    p_task_id: taskId,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null, currencyAwarded: data.currencyAwarded };
}