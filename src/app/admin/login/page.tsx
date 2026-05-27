"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
            <span className="text-2xl font-display font-800 text-white">U</span>
          </div>
        </div>

        <h1 className="text-2xl font-display font-700 text-white text-center mb-2">
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
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
