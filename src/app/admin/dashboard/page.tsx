"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-[#050505]">
      {/* Top bar */}
      <header className="border-b border-white/5 px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
              <span className="text-[0.975rem] font-display font-800 text-white">U</span>
            </div>
            <span className="font-display font-700 text-lg text-white">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/admin/messages"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Messages
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-white/40 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1 className="text-3xl md:text-4xl font-display font-800 text-white mb-2">
          Dashboard
        </h1>
        <p className="text-white/40 mb-10">
          Overview of your portfolio message activity.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {/* Total Messages */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-white/30">Total Messages</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b35]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-4xl font-display font-800 text-white">
              {loading ? "..." : stats.total}
            </p>
          </div>

          {/* Unread */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-white/30">Unread</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6b35]" />
              </span>
            </div>
            <p className="text-4xl font-display font-800 text-white">
              {loading ? "..." : stats.unread}
            </p>
          </div>

          {/* This Week */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-white/30">This Week</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c084fc]">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <p className="text-4xl font-display font-800 text-white">
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </main>
    </div>
  );
}
