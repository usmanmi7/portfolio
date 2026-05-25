"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    title: "N&Rans",
    tag: "E-Commerce",
    year: "2022",
    image: "/project-1.jpg",
    desc: "Premium fashion e-commerce with immersive product storytelling and seamless purchasing flow.",
    tools: ["Webflow", "Custom JS"],
  },
  {
    title: "LangChain",
    tag: "Web App",
    year: "2023",
    image: "/project-2.jpg",
    desc: "AI-powered platform with dynamic data visualization and real-time collaboration interfaces.",
    tools: ["Next.js", "Tailwind"],
  },
  {
    title: "SalzCorp",
    tag: "Corporate",
    year: "2023",
    image: "/project-3.jpg",
    desc: "Corporate brand identity with cutting-edge animations and responsive design system.",
    tools: ["WordPress", "GSAP"],
  },
  {
    title: "Airnet&Co",
    tag: "Agency",
    year: "2025",
    image: "/project-4.jpg",
    desc: "Digital agency portfolio featuring creative transitions, 3D elements, and interactive storytelling.",
    tools: ["Webflow", "Three.js"],
  },
];

/* ═══════════════════════════════════════════
   NAVIGATION (minimal for work page)
   ═══════════════════════════════════════════ */

function WorkNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]" : ""
      }`}
    >
      <div className="flex items-center px-6 md:px-10 py-4 md:py-5">
        <Link href="/" className="relative z-50 flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
            <span className="text-[0.975rem] font-display font-800 text-white">U</span>
          </div>
          <span className="font-display font-700 text-lg tracking-tight hidden sm:block">
            Usman<span className="text-white/30">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 ml-8">
          <Link href="/#about" className="text-[0.975rem] text-white/40 hover:text-white transition-colors duration-300 tracking-wide">About</Link>
          <span className="text-[0.975rem] text-[#ff6b35] transition-colors duration-300 tracking-wide">Work</span>
          <Link href="/#services" className="text-[0.975rem] text-white/40 hover:text-white transition-colors duration-300 tracking-wide">Services</Link>
          <Link href="/#contact" className="text-[0.975rem] text-white/40 hover:text-white transition-colors duration-300 tracking-wide">Contact</Link>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium bg-white text-[#050505] hover:bg-white/90 transition-all"
          >
            Let&apos;s Talk
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   WORK PAGE
   ═══════════════════════════════════════════ */

export default function WorkPage() {
  return (
    <div className="noise min-h-screen bg-[#050505] text-white">
      <WorkNav />

      {/* Hero banner */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-10 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.02] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">02</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-xs tracking-[0.2em] text-white/30 uppercase">Selected Work</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 leading-[0.92] tracking-tight mb-6">
            Projects I&apos;m{" "}
            <span className="gradient-text">proud of</span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-xl">
            A curated selection of work that showcases my approach to design, development, and digital storytelling.
          </p>
        </div>
      </section>

      {/* Zigzag project rows */}
      <section className="pb-24 md:pb-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 md:space-y-20">
            {PROJECTS.map((project, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={project.title}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.04] ${
                    !isEven ? "lg:order-2" : ""
                  }`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
                    <div className="absolute top-6 left-6 text-6xl md:text-7xl font-display font-800 text-white/[0.04] select-none">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Text content */}
                  <div className={`flex flex-col ${!isEven ? "lg:order-1 lg:text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-4 ${!isEven ? "lg:justify-end" : ""}`}>
                      <span className="text-xs text-white/20 px-2.5 py-1 rounded-full border border-white/[0.06]">{project.tag}</span>
                      <span className="text-xs text-white/20">{project.year}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-700 mb-4 group-hover:text-[#ff6b35] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-base text-white/35 leading-relaxed mb-6 max-w-md">
                      {project.desc}
                    </p>
                    <div className={`flex gap-2 ${!isEven ? "lg:justify-end" : ""}`}>
                      {project.tools.map((tool) => (
                        <span key={tool} className="text-xs text-white/25 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className={`mt-6 ${!isEven ? "lg:text-right" : ""}`}>
                      <span className="inline-flex items-center gap-2 text-[0.975rem] text-white/30 group-hover:text-[#ff6b35] transition-colors cursor-pointer">
                        View Project
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-display font-700 text-lg tracking-tight">
            Usman<span className="text-white/30">.</span>
          </Link>
          <p className="text-[0.975rem] text-white/20">
            &copy; {new Date().getFullYear()} Usman Milas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
