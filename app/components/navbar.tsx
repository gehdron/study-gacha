"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/client";

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
};

function NavLink({ href, label, pathname }: NavLinkProps) {
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-slate-900 text-red"
          : "text-slate-600 hover:bg-slate-100 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [gems, setGems] = useState<number | null>(null);

  useEffect(() => {
  const loadUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("gems")
        .eq("id", user.id)
        .single();

      setGems(data?.gems ?? 0);
    }
  };

  loadUser();
}, []);
  

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
        className="h-16 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/" className="mr-2 text-xl font-bold text-slate-900">
            Study Gacha
          </Link>

          <NavLink href="/" label="Home" pathname={pathname} />
          <NavLink href="/study" label="Study" pathname={pathname} />
          <NavLink href="/summon" label="Summon" pathname={pathname} />
          <NavLink href="/collection" label="Collection" pathname={pathname} />
          <NavLink href="/recent-sessions" label="Recent Sessions" pathname={pathname}/>
        </div>

        <div className="flex items-center gap-">
          {user && (
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-black">
                💎 {gems ?? "..."}
              </span>
            </div>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-600 md:inline">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}