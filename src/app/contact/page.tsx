"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "http://wa.me/+779194083" },
  { label: "Facebook", href: "https://web.facebook.com/mhd.usman.mi/" },
  { label: "X", href: "https://x.com/" },
  { label: "Fiverr", href: "https://www.fiverr.com/webworks_456/" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="noise min-h-screen bg-[var(--bg-base)] text-[var(--text-100)]">
      <Nav />

      {/* Hero banner */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-10 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.02] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">05</span>
            <div className="w-12 h-px bg-[var(--border-10)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--text-30)] uppercase">Contact</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 leading-[0.92] tracking-tight mb-6">
            Let&apos;s build
            <br />
            <span className="gradient-text">something great</span>
            <br />
            together
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-40)] max-w-xl">
            Have a project in mind? I&apos;d love to hear from you. Reach out through any channel below or drop me a message.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="pb-24 md:pb-36 px-6 md:px-10 relative">
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* 2-column layout: left info, right form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column — Contact info */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-display font-700 mb-6">
                Get in <span className="gradient-text">touch</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-30)] mb-12 max-w-sm">
                Whether you have a question, a project idea, or just want to say hi — my inbox is always open.
              </p>

              {/* Contact info items */}
              <div className="space-y-5">
                {/* Email */}
                <a href="mailto:Webworks456@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-3)] border border-[var(--border-6)] flex items-center justify-center flex-shrink-0 text-[var(--text-30)] group-hover:text-[#ff6b35] group-hover:border-[#ff6b35]/20 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-30)] block mb-1">Email</span>
                    <span className="text-[0.975rem] font-medium text-[var(--text-50)] group-hover:text-[var(--text-80)] transition-colors">Webworks456@gmail.com</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a href="http://wa.me/+779194083" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-3)] border border-[var(--border-6)] flex items-center justify-center flex-shrink-0 text-[var(--text-30)] group-hover:text-[#ff6b35] group-hover:border-[#ff6b35]/20 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-30)] block mb-1">WhatsApp</span>
                    <span className="text-[0.975rem] font-medium text-[var(--text-50)] group-hover:text-[var(--text-80)] transition-colors">0779194083</span>
                  </div>
                </a>
              </div>

              {/* Social links row */}
              <div className="mt-10 pt-8 border-t border-[var(--border-6)] flex items-center gap-4">
                {SOCIAL_LINKS.filter((s) => s.label !== "WhatsApp").map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[var(--text-30)] hover:text-[#ff6b35] transition-colors uppercase tracking-widest">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right column — Form */}
            <div className="lg:col-span-7">
              <div className="bento-card p-8 md:p-10">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center mb-6 animate-scale-in">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M6 14L12 20L22 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-700 mb-2">Message Sent!</h3>
                    <p className="text-[0.975rem] font-medium text-[var(--text-30)]">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-[var(--text-30)] mb-3">Name</label>
                        <input
                          id="name" type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[var(--surface-3)] border border-[var(--border-6)] rounded-xl px-5 py-4 text-[var(--text-100)] placeholder:text-[var(--text-20)] focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-[var(--text-30)] mb-3">Email</label>
                        <input
                          id="email" type="email" required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[var(--surface-3)] border border-[var(--border-6)] rounded-xl px-5 py-4 text-[var(--text-100)] placeholder:text-[var(--text-20)] focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-[var(--text-30)] mb-3">Message</label>
                      <textarea
                        id="message" required rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[var(--surface-3)] border border-[var(--border-6)] rounded-xl px-5 py-4 text-[var(--text-100)] placeholder:text-[var(--text-20)] focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white font-display font-600 text-[0.975rem] tracking-wide hover:shadow-[0_0_40px_rgba(255,107,53,0.25)] transition-all duration-500"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
