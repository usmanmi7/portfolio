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

export default function AdminMessages() {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const filterParam = filter === "all" ? "" : `&filter=${filter}`;
      const res = await fetch(`/api/admin/messages?limit=100${filterParam}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
      setTotal(data.total || 0);
      setUnreadCount(data.unreadCount || 0);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setSelectedMessage((prev) =>
        prev && prev.id === id ? { ...prev, read: true } : prev
      );
    } catch {
      // silent
    }
  };

  const deleteMessage = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setTotal((prev) => prev - 1);
        if (selectedMessage?.id === id) setSelectedMessage(null);
        fetchMessages();
      }
    } catch {
      // silent
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
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
            <a href="/admin/dashboard" className="text-sm text-[var(--text-40)] hover:text-[var(--text-100)] transition-colors">
              Dashboard
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
            <button onClick={handleLogout} className="text-sm text-[var(--text-40)] hover:text-red-400 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-800 text-[var(--text-100)] mb-1">
              Messages
            </h1>
            <p className="text-[var(--text-40)]">
              {total} total{unreadCount > 0 && `, ${unreadCount} unread`}
            </p>
          </div>
          {/* Filters */}
          <div className="flex gap-2">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  filter === f
                    ? "bg-[#ff6b35] text-white"
                    : "bg-[var(--surface-5)] text-[var(--text-30)] hover:text-[var(--text-60)] border border-[var(--border-5)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Messages list + detail split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — List */}
          <div className="lg:col-span-5 space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {loading ? (
              <div className="text-center py-16 text-[var(--text-20)]">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 text-[var(--text-20)]">
                No messages yet.
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.read) markAsRead(msg.id);
                  }}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    selectedMessage?.id === msg.id
                      ? "bg-[#ff6b35]/10 border-[#ff6b35]/20"
                      : "bg-[var(--surface-2)] border-[var(--border-5)] hover:bg-[var(--surface-5)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-[#ff6b35] flex-shrink-0" />
                      )}
                      <span className="font-display font-600 text-[var(--text-100)] text-sm truncate">
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-20)] flex-shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-30)] truncate">{msg.email}</p>
                  <p className="text-xs text-[var(--text-20)] mt-2 line-clamp-2">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      msg.source === "contact"
                        ? "bg-[#c084fc]/10 text-[#c084fc]/60"
                        : "bg-[#ff6b35]/10 text-[#ff6b35]/60"
                    }`}>
                      {msg.source === "contact" ? "Contact Page" : "Landing Page"}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right — Detail */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="rounded-2xl border border-[var(--border-5)] bg-[var(--surface-2)] p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-display font-700 text-[var(--text-100)] mb-1">
                      {selectedMessage.name}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm text-[#ff6b35] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    disabled={deleting === selectedMessage.id}
                    className="text-xs text-[var(--text-20)] hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-[var(--border-5)] hover:border-red-400/20 disabled:opacity-40"
                  >
                    {deleting === selectedMessage.id ? "Deleting..." : "Delete"}
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    selectedMessage.source === "contact"
                      ? "bg-[#c084fc]/10 text-[#c084fc]/60"
                      : "bg-[#ff6b35]/10 text-[#ff6b35]/60"
                  }`}>
                    {selectedMessage.source === "contact" ? "Contact Page" : "Landing Page"}
                  </span>
                  <span className="text-xs text-[var(--text-20)]">
                    {new Date(selectedMessage.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="border-t border-[var(--border-5)] pt-6">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-20)] mb-3">
                    Message
                  </p>
                  <p className="text-[0.975rem] text-[var(--text-60)] leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border-5)]">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,107,53,0.25)] transition-all duration-500"
                  >
                    Reply via Email
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border-5)] bg-[var(--surface-2)] p-16 flex flex-col items-center justify-center text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-10)] mb-4">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-[var(--text-20)] text-sm">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
