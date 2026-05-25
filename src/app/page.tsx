"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

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
  {
    title: "Giros",
    tag: "Creative",
    year: "2025",
    image: "/project-5.jpg",
    desc: "Creative brand website with bold visuals, smooth interactions, and a modern design language.",
    tools: ["Webflow", "GSAP"],
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Website Design",
    desc: "Pixel-perfect, custom websites that captivate visitors and convert them into loyal customers. Every layout, animation, and interaction is crafted with intention.",
    tags: ["UI/UX", "Responsive", "Figma"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Web Development",
    desc: "Clean, performant code that brings designs to life. From Webflow to custom solutions — fast, accessible, and built to scale with your business.",
    tags: ["Webflow", "WordPress", "Next.js"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Brand Identity",
    desc: "Cohesive visual systems that make brands unforgettable. Logos, color palettes, typography, and guidelines that tell your story at every touchpoint.",
    tags: ["Logo", "Guidelines", "Strategy"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Digital Campaigns",
    desc: "Data-driven marketing strategies combined with creative storytelling. SEO, content, and social campaigns that grow your audience organically.",
    tags: ["SEO", "Content", "Social"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "E-Commerce Solutions",
    desc: "End-to-end online stores built for conversion. Shopify, WooCommerce, or custom platforms — seamless checkout, inventory management, and growth-ready.",
    tags: ["Shopify", "WooCommerce", "Payments"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Motion & Animation",
    desc: "Engaging micro-interactions and page animations that bring interfaces to life. GSAP, Lottie, and CSS animations that enhance user experience without compromise.",
    tags: ["GSAP", "Lottie", "CSS Anim"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const TECH_STACK = [
  "HTML", "Webflow", "WordPress", "Wix", "Next.js", "React",
  "Tailwind CSS", "Figma", "GSAP", "Three.js", "Shopify",
];

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "http://wa.me/+779194083" },
  { label: "Facebook", href: "https://web.facebook.com/mhd.usman.mi/" },
  { label: "X", href: "https://x.com/" },
  { label: "Fiverr", href: "https://www.fiverr.com/webworks_456/" },
];

/* ═══════════════════════════════════════════
   LOADING SCREEN
   ═══════════════════════════════════════════ */

function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <div className="text-6xl md:text-8xl font-display font-800 gradient-text mb-4">
          UM
        </div>
        <p className="text-xs tracking-[0.3em] text-white/30 uppercase">
          Loading experience
        </p>
      </div>
      <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #ff6b35, #c084fc)",
          }}
        />
      </div>
      <p className="text-xs text-white/20 mt-4 font-mono">{progress}%</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]" : ""
        }`}
      >
        <div className="flex items-center px-6 md:px-10 py-4 md:py-5">
          {/* Logo */}
          <a href="#hero" className="relative z-50 flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
              <span className="text-[0.975rem] font-display font-800 text-white">U</span>
            </div>
            <span className="font-display font-700 text-lg tracking-tight hidden sm:block">
              Usman<span className="text-white/30">.</span>
            </span>
          </a>

          {/* Desktop links — left aligned after logo */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {["About", "Work", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href={link === 'Work' ? '/work' : `#${link.toLowerCase()}`}
                className="text-[0.975rem] text-white/40 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Spacer to push CTA right */}
          <div className="flex-1" />

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium bg-white text-[#050505] hover:bg-white/90 transition-all"
            >
              Let&apos;s Talk
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-white/5 border border-white/[0.06]"
              aria-label="Toggle menu"
            >
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] transition-all duration-600 flex flex-col items-center justify-center ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.5s ease" }}
      >
        <nav className="flex flex-col items-center gap-6">
          {["About", "Work", "Services", "Contact"].map((link) => (
            <a
              key={link}
              href={link === 'Work' ? '/work' : `#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-display font-700 gradient-text-subtle hover:gradient-text transition-all"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex gap-5">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-[#ff6b35] transition-colors uppercase tracking-widest">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO — Split-screen Editorial Layout (KEPT)
   ═══════════════════════════════════════════ */

function Hero() {
  return (
  <>
    <section id="hero" className="relative flex items-stretch overflow-hidden" style={{ height: '100vh' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/hero-2026.jpg" alt="" fill className="object-cover opacity-15" priority />
        <div className="absolute inset-0 bg-[#050505]/85" />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff6b35]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch px-6 md:px-10">
        {/* Left side — Text */}
        <div className="flex-1 flex flex-col justify-center pt-28 pb-20 lg:py-0 relative z-[3]">
          {/* Available badge */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b35]" />
            </span>
            <span className="text-[0.975rem] text-white/50 tracking-wide">Available for freelance work</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-display font-800 leading-[0.92] tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Crafting <span className="gradient-text">digital</span>
            <br />
            experiences that <span className="italic font-500 text-white/60">matter</span>
          </h1>

          {/* Subline */}
          <p className="text-lg md:text-xl text-white/40 max-w-md mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Freelance designer & developer from Sri Lanka — building modern, responsive, and unforgettable websites.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white text-[0.975rem] font-medium hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-500"
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[0.975rem] font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Bottom stats row */}
          <div className="flex items-center gap-8 mt-14 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "4+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "30+", label: "Clients" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-display font-800 gradient-text">{stat.value}</span>
                <span className="text-xs text-white/20 uppercase tracking-widest">{stat.label}</span>
                {i < 2 && <div className="w-px h-6 bg-white/[0.06] ml-5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right side — Scrolling work photos */}
        <div className="hidden lg:flex items-stretch relative py-20 z-[1] w-[40%]">
          {/* Half-round fade overlay on top */}
          <div className="absolute top-0 left-0 right-0 h-[45%] z-[5] pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #050505 0%, #050505d0 25%, #05050580 50%, transparent 100%)' }} />
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[20%] z-[5] pointer-events-none" style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />
          {/* Column 1 — scrolls UP */}
          <div className="flex-1 relative mx-1.5">
            <div className="animate-scroll-up">
              {[...Array(3)].map((_, setIdx) => (
                <div key={`up-${setIdx}`}>
                  {PROJECTS.map((project, i) => (
                    <div key={`up-${setIdx}-${i}`} className="relative aspect-video overflow-hidden mb-3">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[#ff6b35]/[0.03]" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-display font-600 text-white/50">{project.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — scrolls DOWN */}
          <div className="flex-1 relative mx-1.5">
            <div className="animate-scroll-down">
              {[...Array(3)].map((_, setIdx) => (
                <div key={`down-${setIdx}`}>
                  {[...PROJECTS].reverse().map((project, i) => (
                    <div key={`down-${setIdx}-${i}`} className="relative aspect-video overflow-hidden mb-3">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[#c084fc]/[0.03]" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-display font-600 text-white/50">{project.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Marquee — company logos below hero */}
    <div className="border-t border-white/[0.04] py-6 overflow-hidden bg-[#050505]">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(2)].map((_, si) => (
          <span key={si} className="flex-shrink-0 flex items-center">
            {["Vercel", "Stripe", "Notion", "Linear", "Figma", "Supabase", "Resend", "Clerk", "Prisma", "Railway"].map((company, i) => (
              <span key={`${si}-${i}`} className="inline-flex items-center mx-6 md:mx-10 text-lg md:text-xl font-display font-600 text-white/[0.07] hover:text-white/[0.15] transition-colors cursor-default select-none">
                {company}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  </>
  );
}

/* ═══════════════════════════════════════════
   ABOUT — Quote-style with floating portrait
   ═══════════════════════════════════════════ */

function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.02] blur-[100px] pointer-events-none" />

      {/* Decorative grid dots */}
      <div className="absolute top-20 right-20 hidden lg:grid grid-cols-5 gap-3 opacity-[0.03]">
        {Array(25).fill(0).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">01</span>
          <div className="w-12 h-px bg-white/10" />
          <span className="text-xs tracking-[0.2em] text-white/30 uppercase">About</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-700 mb-16 max-w-2xl">
          A brief intro,{" "}
          <span className="gradient-text">who I am</span>
        </h2>

        {/* Two-column layout: text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div className="lg:col-span-7">
            {/* Accent quote mark */}
            <span className="text-[#ff6b35]/15 text-7xl md:text-9xl font-display font-800 leading-none select-none block mb-[-30px]">&ldquo;</span>

            <p className="text-2xl md:text-3xl lg:text-[2rem] font-display font-600 leading-snug text-white/80 mb-8">
              I craft modern, responsive, and user-focused digital experiences that help brands stand out.
            </p>

            <p className="text-base md:text-lg text-white/40 leading-relaxed mb-8 max-w-xl">
              With over 4 years of hands-on experience and currently pursuing an HND in IT, the combination of my passion for <span className="text-white font-medium">design</span>,{" "}
              <span className="text-white font-medium">code</span> &{" "}
              <span className="text-white font-medium">interaction</span> positions me in a unique place in the web design world. Together we will set the new status quo — no nonsense, always on the cutting edge.
            </p>

            {/* Mini skill tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["UI/UX Designer", "Developer", "AI Tools Specialist", "Video Editor", "Social Media Handler", "Self Learner", "Video Coder"].map((skill) => (
                <span key={skill} className="text-xs text-white/25 px-3.5 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-[#ff6b35]/20 hover:text-white/40 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats bar */}
            <div className="pt-8 border-t border-white/[0.06] grid grid-cols-4 gap-6">
              {[
                { value: "4+", label: "Years Exp" },
                { value: "50+", label: "Projects" },
                { value: "30+", label: "Clients" },
                { value: "10+", label: "Tools" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-display font-800 gradient-text mb-1">{stat.value}</span>
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Portrait with graphical decorations */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main portrait */}
              <div className="relative w-[280px] h-[370px] md:w-[320px] md:h-[420px] rounded-none overflow-hidden border border-white/[0.06] z-10">
                <Image
                  src="/about.jpg"
                  alt="Usman Milas portrait"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
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
                <span className="text-xs text-white/50">Available for work</span>
              </div>

              {/* Decorative circle */}
              <div className="absolute -top-10 right-[-20px] w-24 h-24 rounded-full border border-white/[0.03] z-0" />
              <div className="absolute -bottom-8 -right-12 w-16 h-16 rounded-full border border-[#c084fc]/10 z-0" />

              {/* Corner accent lines */}
              <div className="absolute top-4 -right-8 w-8 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
              <div className="absolute top-4 -right-8 h-8 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WORK — Zigzag Alternating Layout
   ═══════════════════════════════════════════ */

function Work() {
  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">02</span>
          <div className="w-12 h-px bg-white/10" />
          <span className="text-xs tracking-[0.2em] text-white/30 uppercase">Selected Work</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-700 mb-16 max-w-2xl">
          Projects I&apos;m{" "}
          <span className="gradient-text">proud of</span>
        </h2>

        {/* Zigzag project rows */}
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
                  {/* Project number overlay */}
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
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-700 mb-4 group-hover:text-[#ff6b35] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-base text-white/35 leading-relaxed mb-6 max-w-md ${!isEven ? 'lg:ml-auto' : ''}">
                    {project.desc}
                  </p>
                  <div className={`flex gap-2 ${!isEven ? "lg:justify-end" : ""}`}>
                    {project.tools.map((tool) => (
                      <span key={tool} className="text-xs text-white/25 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
                        {tool}
                      </span>
                    ))}
                  </div>
                  {/* View project link */}
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
  );
}

/* ═══════════════════════════════════════════
   SERVICES — Horizontal Carousel
   ═══════════════════════════════════════════ */

function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const card = carouselRef.current.querySelector('[data-service-card]');
        if (card) {
          const style = window.getComputedStyle(carouselRef.current);
          const gap = parseInt(style.gap) || 20;
          setCardWidth(card.offsetWidth + gap);
        }
      }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const maxIndex = Math.max(0, SERVICES.length - 3); // show 3 at a time on desktop

  const scroll = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") return Math.max(0, prev - 1);
      return Math.min(maxIndex, prev + 1);
    });
  };

  return (
    <section id="services" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px] pointer-events-none" />

      {/* Section header — constrained width */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">03</span>
              <div className="w-12 h-px bg-white/10" />
              <span className="text-xs tracking-[0.2em] text-white/30 uppercase">What I Do</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-700 max-w-2xl">
              Services &{" "}
              <span className="gradient-text">expertise</span>
            </h2>
          </div>

          {/* Carousel arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all"
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12 2L5 9L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all"
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 2L13 9L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards row — full width with hero-matching padding, transform-based carousel */}
      <div className="pl-6 md:pl-10 pt-2 -mt-2 relative z-10" style={{ overflowX: 'clip', overflowY: 'visible' }}>
        <div
          ref={carouselRef}
          className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{ transform: `translateX(-${activeIndex * cardWidth}px)` }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="bento-card p-8 md:p-10 group relative overflow-hidden flex-shrink-0 w-[85vw] md:w-[34%] min-h-[420px] snap-start" data-service-card
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35]/10 to-[#c084fc]/5 border border-white/[0.06] flex items-center justify-center mb-8 text-white/30 group-hover:text-[#ff6b35] group-hover:border-[#ff6b35]/20 transition-all duration-400">
                {service.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-display font-700 mb-4 group-hover:text-[#ff6b35] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[0.975rem] text-white/30 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs text-white/20 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom link */}
              <div className="flex items-center gap-2 text-[0.975rem] text-white/20 group-hover:text-[#ff6b35] transition-colors cursor-pointer">
                Learn more
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Large number watermark */}
              <span className="absolute -bottom-4 -right-2 text-8xl font-display font-800 text-white/[0.02] select-none pointer-events-none">
                {service.number}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mt-16 relative z-10">
        <div className="overflow-hidden py-4 border-y border-white/[0.04]">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(2)].map((_, si) => (
              <span key={si} className="flex-shrink-0 flex items-center">
                {TECH_STACK.map((tech, i) => (
                  <span key={`${si}-${i}`} className="mx-8 text-lg md:text-xl font-display font-600 text-white/[0.06] hover:text-white/20 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING — What You Get + Plans
   ═══════════════════════════════════════════ */

const DELIVERABLES = [
  { item: "Custom Design", static: true, business: true, custom: true },
  { item: "Responsive Development", static: true, business: true, custom: true },
  { item: "SEO Optimization", static: true, business: true, custom: true },
  { item: "Fast Performance", static: true, business: true, custom: true },
  { item: "Animations & Interactions", static: true, business: true, custom: true },
  { item: "Analytics Setup", static: false, business: true, custom: true },
  { item: "CMS / Admin Dashboard", static: false, business: true, custom: true },
  { item: "E-Commerce Integration", static: false, business: true, custom: true },
  { item: "Up to 5 Pages", static: true, business: true, custom: true },
  { item: "Up to 10 Pages", static: false, business: true, custom: true },
  { item: "Custom Page Sizes", static: false, business: false, custom: true },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-36 px-6 md:px-10 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c084fc]/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header — centered */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">04</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-xs tracking-[0.2em] text-white/30 uppercase">Pricing</span>
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-700 mb-16 text-center">
          What you{" "}
          <span className="gradient-text">get</span>
        </h2>

        {/* Clean bordered comparison table */}
        <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Table header — plan names only */}
          <div className="grid grid-cols-4 border-b border-white/[0.06]">
            <div className="px-6 md:px-8 py-5">
              <span className="text-[0.975rem] text-white/30 uppercase tracking-widest">Deliverable</span>
            </div>
            <div className="px-6 md:px-8 py-5 text-center border-l border-white/[0.06]">
              <div className="text-[0.975rem] text-white/40 uppercase tracking-widest">Static</div>
            </div>
            <div className="px-6 md:px-8 py-5 text-center border-l border-white/[0.06] bg-white/[0.01]">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[0.975rem] text-[#ff6b35]/80 uppercase tracking-widest">Business</span>
                <span className="text-[9px] font-medium text-[#ff6b35] px-2 py-0.5 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 uppercase tracking-widest">Popular</span>
              </div>
            </div>
            <div className="px-6 md:px-8 py-5 text-center border-l border-white/[0.06]">
              <div className="text-[0.975rem] text-white/40 uppercase tracking-widest">Custom</div>
            </div>
          </div>

          {/* Table rows */}
          {DELIVERABLES.map((row, i) => (
            <div
              key={row.item}
              className={`grid grid-cols-4 ${i < DELIVERABLES.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.01] transition-colors`}
            >
              <div className="px-6 md:px-8 py-4">
                <span className="text-[0.975rem] text-white/50">{row.item}</span>
              </div>
              <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-white/[0.04]">
                {row.static ? <CheckIcon /> : <CrossIcon />}
              </div>
              <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-white/[0.04] bg-white/[0.005]">
                {row.business ? <CheckIcon /> : <CrossIcon />}
              </div>
              <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-white/[0.04]">
                {row.custom ? <CheckIcon /> : <CrossIcon />}
              </div>
            </div>
          ))}

          {/* Table footer with prices and CTA */}
          <div className="grid grid-cols-4 border-t border-white/[0.06]">
            <div className="px-6 md:px-8 py-6">
              <span className="text-[0.975rem] text-white/20">Price</span>
            </div>
            <div className="px-6 md:px-8 py-6 text-center border-l border-white/[0.06]">
              <div className="text-2xl md:text-3xl font-display font-800 text-white/70">$150</div>
              <div className="text-xs text-white/20 mt-1">5 pages / project</div>
            </div>
            <div className="px-6 md:px-8 py-6 text-center border-l border-white/[0.06] bg-white/[0.01]">
              <div className="text-2xl md:text-3xl font-display font-800 gradient-text">$300</div>
              <div className="text-xs text-white/20 mt-1">10 pages / project</div>
            </div>
            <div className="px-6 md:px-8 py-6 text-center border-l border-white/[0.06]">
              <div className="text-[0.975rem] text-white/30">Negotiable</div>
              <div className="text-xs text-white/15 mt-1">All options available</div>
            </div>
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-4 border-t border-white/[0.06]">
            <div className="px-6 md:px-8 py-6">
              <span className="text-[0.975rem] text-white/20">Ready?</span>
            </div>
            <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-white/[0.06]">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all">
                Get Started
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
            <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-white/[0.06] bg-white/[0.01]">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white hover:shadow-[0_0_30px_rgba(255,107,53,0.25)] transition-all duration-500">
                Get Started
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
            <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-white/[0.06]">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium border border-[#ff6b35]/20 text-[#ff6b35]/60 hover:text-[#ff6b35] hover:border-[#ff6b35]/30 transition-all">
                Contact Us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT — Full-width centered form
   ═══════════════════════════════════════════ */

function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#ff6b35]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Big heading centered */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">05</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-xs tracking-[0.2em] text-white/30 uppercase">Contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-800 leading-[0.95] mb-6">
            Let&apos;s build{" "}
            <span className="gradient-text">something</span>
            <br />great together
          </h2>
          <p className="text-lg text-white/30 max-w-md mx-auto">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
        </div>

        {/* Form card */}
        <div className="bento-card p-8 md:p-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center mb-6 animate-scale-in">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14L12 20L22 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-700 mb-2">Message Sent!</h3>
              <p className="text-[0.975rem] text-white/30">I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-white/20 mb-3">Name</label>
                  <input
                    id="name" type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-white/20 mb-3">Email</label>
                  <input
                    id="email" type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-white/20 mb-3">Message</label>
                <textarea
                  id="message" required rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#ff6b35]/30 focus:ring-1 focus:ring-[#ff6b35]/10 transition-all resize-none"
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

        {/* Contact info links below form */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="mailto:Webworks456@gmail.com" className="bento-card p-5 flex items-center gap-3 group hover:border-[#ff6b35]/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/5 flex items-center justify-center flex-shrink-0 text-[#ff6b35]/50 group-hover:text-[#ff6b35] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-white/20 block">Email</span>
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors break-all">Webworks456@gmail.com</span>
            </div>
          </a>
          <a href="https://www.fiverr.com/webworks_456/" target="_blank" rel="noopener noreferrer" className="bento-card p-5 flex items-center gap-3 group hover:border-[#ff6b35]/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/5 flex items-center justify-center flex-shrink-0 text-[#ff6b35]/50 group-hover:text-[#ff6b35] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-white/20 block">Hire Me</span>
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Fiverr.com/webworks456</span>
            </div>
          </a>
          <a href="http://wa.me/+779194083" target="_blank" rel="noopener noreferrer" className="bento-card p-5 flex items-center gap-3 group hover:border-[#ff6b35]/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/5 flex items-center justify-center flex-shrink-0 text-[#ff6b35]/50 group-hover:text-[#ff6b35] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-white/20 block">WhatsApp</span>
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Chat with me</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — CTA + Socials
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      {/* CTA row */}
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[0.975rem] text-white/20 uppercase tracking-widest mb-3">Ready to start?</p>
            <h3 className="text-3xl md:text-4xl font-display font-700">
              Let&apos;s work <span className="gradient-text">together</span>
            </h3>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white text-[0.975rem] font-medium hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-500"
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.04]" />

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
              <span className="text-[10px] font-display font-800 text-white">U</span>
            </div>
            <span className="text-[0.975rem] text-white/20">
              &copy; {new Date().getFullYear()} Usman Milas
            </span>
          </div>

          <p className="text-xs text-white/15 text-center">
            Designed & built from Sri Lanka
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-xs text-white/20 hover:text-[#ff6b35] transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {loading && <Loader onComplete={handleLoadingComplete} />}
      <div className={`noise min-h-screen transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero />
          <About />
          <Services />
          <Pricing />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
