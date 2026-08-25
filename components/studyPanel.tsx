"use client"

import { useActionState, useEffect, useState } from "react";
import { logStudySession, createTask, completeTask } from "@/app/study/actions";
import { fetchTasks } from "@/app/lib/supabase/queries";

interface Task {
  id: string;
  title: string;
  taskType: "daily" | "weekly" | "monthly";
  estimatedMinutes: number;
  completed: boolean;
}

export default function StudyPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [sessionState, sessionAction, sessionPending] = useActionState<
    { error: string | null; currencyAwarded?: number },
    FormData
  >(logStudySession, { error: null });

  const [taskState, taskAction, taskPending] = useActionState<
    { error: string | null },
    FormData
  >(createTask, { error: null });

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  async function handleComplete(taskId: string) {
    const formData = new FormData();
    formData.set("taskId", taskId);
    const result = await completeTask(undefined, formData);
    if (!result.error) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  }

  return (
    <div className="flex flex-col gap-8 p-6 overflow-y-auto max-h-full">
      <section>
        <h2 className="text-lg font-semibold mb-3">New task</h2>
        <form action={taskAction} className="flex flex-col gap-3">
          <input
            name="title"
            type="text"
            placeholder="Title"
            required
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
          />
          <select
            name="taskType"
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            name="estimatedMinutes"
            type="number"
            min={1}
            placeholder="Est. minutes"
            required
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={taskPending}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-60 rounded-lg px-4 py-2 font-medium"
          >
            {taskPending ? "Adding..." : "Add task"}
          </button>
        </form>
        {taskState?.error && (
          <p className="text-red-400 text-sm mt-2">{taskState.error}</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Your tasks</h2>
        {tasks.length === 0 && <p className="text-neutral-500 text-sm">No tasks yet.</p>}
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-neutral-500">
                  {task.taskType} · {task.estimatedMinutes} min
                </p>
              </div>
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-green-700 hover:bg-green-600 text-sm rounded-lg px-3 py-1.5"
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}