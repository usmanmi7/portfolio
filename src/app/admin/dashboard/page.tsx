"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminTheme } from "@/lib/useAdminTheme";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  read: boolean;
  createdAt: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const [stats, setStats] = useState({ total: 0, unread: 0, thisWeek: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/messages?limit=1000");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thisWeek = data.messages.filter(
        (m: Message) => new Date(m.createdAt) >= weekAgo
      ).length;

      setStats({
        total: data.total,
        unread: data.unreadCount,
        thisWeek,
      });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border-4)] px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
              <span className="text-[0.975rem] font-display font-800 text-white">U</span>
            </div>
            <span className="font-display font-700 text-lg text-[var(--text-100)]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/admin/messages"
              className="text-sm text-[var(--text-40)] hover:text-[var(--text-100)] transition-colors"
            >
              Messages
            </a>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-5)] border border-[var(--border-6)] hover:bg-[var(--surface-5)]/80 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-[var(--text-40)] hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1 className="text-3xl md:text-4xl font-display font-800 text-[var(--text-100)] mb-2">
          Dashboard
        </h1>
        <p className="text-[var(--text-40)] mb-10">
          Overview of your portfolio message activity.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {/* Total Messages */}
          <div className="rounded-2xl border border-[var(--border-5)] bg-[var(--surface-2)] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--text-30)]">Total Messages</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b35]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-4xl font-display font-800 text-[var(--text-100)]">
              {loading ? "..." : stats.total}
            </p>
          </div>

          {/* Unread */}
          <div className="rounded-2xl border border-[var(--border-5)] bg-[var(--surface-2)] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--text-30)]">Unread</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6b35]" />
              </span>
            </div>
            <p className="text-4xl font-display font-800 text-[var(--text-100)]">
              {loading ? "..." : stats.unread}
            </p>
          </div>

          {/* This Week */}
          <div className="rounded-2xl border border-[var(--border-5)] bg-[var(--surface-2)] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--text-30)]">This Week</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c084fc]">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <p className="text-4xl font-display font-800 text-[var(--text-100)]">
              {loading ? "..." : stats.thisWeek}
            </p>
          </div>
        </div>

        {/* Quick action */}
        <a
          href="/admin/messages"
          className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white text-[0.975rem] font-medium hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-500"
        >
          View All Messages
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </main>
    </div>
  );
}
