"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SKILLS = [
  "UI/UX Designer",
  "Developer",
  "AI Tools Specialist",
  "Video Editor",
  "Social Media Handler",
  "Self Learner",
  "Video Coder",
];

const STATS = [
  { value: "4+", label: "Years Exp" },
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
  { value: "10+", label: "Tools" },
];

export default function AboutPage() {
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
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">01</span>
            <div className="w-12 h-px bg-[var(--border-10)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--text-30)] uppercase">About</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 leading-[0.92] tracking-tight mb-6">
            A brief intro,{" "}
            <span className="gradient-text">who I am</span>
          </h1>
        </div>
      </section>

      {/* About content */}
      <section className="pb-24 md:pb-36 px-6 md:px-10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.02] blur-[100px] pointer-events-none" />

        {/* Decorative grid dots */}
        <div className="absolute top-20 right-20 hidden lg:grid grid-cols-5 gap-3 opacity-[0.03]">
          {Array(25).fill(0).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--text-100)]" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Two-column layout: text left, photo right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — Text content */}
            <div className="lg:col-span-7">
              {/* Accent quote mark */}
              <span className="text-[#ff6b35]/15 text-7xl md:text-9xl font-display font-800 leading-none select-none block mb-[-30px]">&ldquo;</span>

              <p className="text-2xl md:text-3xl lg:text-[2rem] font-display font-600 leading-snug text-[var(--text-80)] mb-8">
                I craft modern, responsive, and user-focused digital experiences that help brands stand out.
              </p>

              <p className="text-base md:text-lg text-[var(--text-40)] leading-relaxed mb-8 max-w-xl">
                With over 4 years of hands-on experience and currently pursuing an HND in IT, the combination of my passion for <span className="text-[var(--text-100)] font-medium">design</span>,{" "}
                <span className="text-[var(--text-100)] font-medium">code</span> &{" "}
                <span className="text-[var(--text-100)] font-medium">interaction</span> positions me in a unique place in the web design world. Together we will set the new status quo — no nonsense, always on the cutting edge.
              </p>

              {/* Mini skill tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {SKILLS.map((skill) => (
                  <span key={skill} className="text-xs text-[var(--text-25)] px-3.5 py-2 rounded-full bg-[var(--surface-2)] border border-[var(--border-5)] hover:border-[#ff6b35]/20 hover:text-[var(--text-40)] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats bar */}
              <div className="pt-8 border-t border-[var(--border-6)] grid grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-display font-800 gradient-text mb-1">{stat.value}</span>
                    <span className="text-[10px] text-[var(--text-30)] uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Portrait with graphical decorations */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main portrait */}
                <div className="relative w-[280px] h-[370px] md:w-[320px] md:h-[420px] rounded-none overflow-hidden border border-[var(--border-6)] z-10">
                  <Image
                    src="/about.jpg"
                    alt="Usman Milas portrait"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-portrait-overlay)] to-transparent" />
                </div>

                {/* Offset decorative border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-none border border-[#ff6b35]/10 z-0" />

                {/* Floating accent shapes */}
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-xl border border-[#ff6b35]/15 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
                    <span className="text-xs font-display font-800 text-white">U</span>
                  </div>
                </div>

                {/* Floating status badge */}
                <div className="absolute -bottom-3 -left-8 z-20 glass-card rounded-xl px-4 py-3 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-xs text-[var(--text-50)]">Available for work</span>
                </div>

                {/* Decorative circle */}
                <div className="absolute -top-10 right-[-20px] w-24 h-24 rounded-full border border-[var(--border-3)] z-0" />
                <div className="absolute -bottom-8 -right-12 w-16 h-16 rounded-full border border-[#c084fc]/10 z-0" />

                {/* Corner accent lines */}
                <div className="absolute top-4 -right-8 w-8 h-px bg-gradient-to-r from-[var(--border-6)] to-transparent" />
                <div className="absolute top-4 -right-8 h-8 w-px bg-gradient-to-b from-[var(--border-6)] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
