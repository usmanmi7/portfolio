"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminTheme } from "@/lib/useAdminTheme";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center px-6">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-5)] border border-[var(--border-6)] hover:bg-[var(--surface-5)]/80 transition-all"
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

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
            <span className="text-2xl font-display font-800 text-white">U</span>
          </div>
        </div>

        <h1 className="text-2xl font-display font-700 text-[var(--text-100)] text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-sm text-[var(--text-40)] text-center mb-8">
          Enter your password to access the dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-[var(--text-30)] mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[var(--surface-3)] border border-[var(--border-6)] rounded-xl px-5 py-4 text-[var(--text-100)] placeholder:text-[var(--text-20)] focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white font-display font-600 text-[0.975rem] tracking-wide hover:shadow-[0_0_40px_rgba(255,107,53,0.25)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
