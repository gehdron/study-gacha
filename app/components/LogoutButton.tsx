"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-slate-800 px-4 py-2 text-white"
    >
      Log Out
    </button>
  );
}