"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--border-8)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ═══════════════════════════════════════════
   SERVICES PAGE
   ═══════════════════════════════════════════ */

export default function ServicesPage() {
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

  const maxIndex = Math.max(0, SERVICES.length - 3);

  const scroll = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") return Math.max(0, prev - 1);
      return Math.min(maxIndex, prev + 1);
    });
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
            <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">03</span>
            <div className="w-12 h-px bg-[var(--border-10)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--text-30)] uppercase">What I Do</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 leading-[0.92] tracking-tight mb-6">
            Services &{" "}
            <span className="gradient-text">expertise</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-40)] max-w-xl">
            From concept to launch, I deliver end-to-end digital solutions that help brands thrive in the modern web.
          </p>
        </div>
      </section>

      {/* Service cards carousel */}
      <section className="pb-24 md:pb-36 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px] pointer-events-none" />

        {/* Section header with carousel arrows */}
        <div className="px-6 md:px-10 max-w-7xl mx-auto relative z-10 mb-16">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[var(--border-8)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-30)] hover:text-[var(--text-100)] hover:border-[var(--border-10)] hover:bg-[var(--surface-5)] transition-all"
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12 2L5 9L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[var(--border-8)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-30)] hover:text-[var(--text-100)] hover:border-[var(--border-10)] hover:bg-[var(--surface-5)] transition-all"
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 2L13 9L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards row — transform-based carousel */}
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35]/10 to-[#c084fc]/5 border border-[var(--border-6)] flex items-center justify-center mb-8 text-[var(--text-30)] group-hover:text-[#ff6b35] group-hover:border-[#ff6b35]/20 transition-all duration-400">
                  {service.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-display font-700 mb-4 group-hover:text-[#ff6b35] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[0.975rem] font-medium text-[var(--text-30)] leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[var(--text-30)] px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-4)]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom link */}
                <div className="flex items-center gap-2 text-[0.975rem] font-medium text-[var(--text-30)] group-hover:text-[#ff6b35] transition-colors cursor-pointer">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Large number watermark */}
                <span className="absolute -bottom-4 -right-2 text-8xl font-display font-800 text-[var(--text-2)] select-none pointer-events-none">
                  {service.number}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack marquee */}
        <div className="px-6 md:px-10 max-w-7xl mx-auto mt-16 relative z-10">
          <div className="overflow-hidden py-4 border-y border-[var(--border-4)]">
            <div className="animate-marquee whitespace-nowrap flex">
              {[...Array(2)].map((_, si) => (
                <span key={si} className="flex-shrink-0 flex items-center">
                  {TECH_STACK.map((tech, i) => (
                    <span key={`${si}-${i}`} className="mx-8 text-lg md:text-xl font-display font-600 text-[var(--text-15)] hover:text-[var(--text-30)] transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-24 md:py-36 px-6 md:px-10 relative">
        {/* Background accent */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c084fc]/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header — centered */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase">04</span>
              <div className="w-12 h-px bg-[var(--border-10)]" />
              <span className="text-xs tracking-[0.2em] text-[var(--text-30)] uppercase">Pricing</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-700 mb-16 text-center">
            What you{" "}
            <span className="gradient-text">get</span>
          </h2>

          {/* Clean bordered comparison table */}
          <div className="border border-[var(--border-6)] rounded-2xl overflow-hidden">
            {/* Table header — plan names only */}
            <div className="grid grid-cols-4 border-b border-[var(--border-6)]">
              <div className="px-6 md:px-8 py-5">
                <span className="text-[0.975rem] font-medium text-[var(--text-30)] uppercase tracking-widest">Deliverable</span>
              </div>
              <div className="px-6 md:px-8 py-5 text-center border-l border-[var(--border-6)]">
                <div className="text-[0.975rem] font-medium text-[var(--text-40)] uppercase tracking-widest">Static</div>
              </div>
              <div className="px-6 md:px-8 py-5 text-center border-l border-[var(--border-6)] bg-[var(--surface-2)]">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[0.975rem] font-medium text-[#ff6b35]/80 uppercase tracking-widest">Business</span>
                  <span className="text-[9px] font-medium text-[#ff6b35] px-2 py-0.5 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 uppercase tracking-widest">Popular</span>
                </div>
              </div>
              <div className="px-6 md:px-8 py-5 text-center border-l border-[var(--border-6)]">
                <div className="text-[0.975rem] font-medium text-[var(--text-40)] uppercase tracking-widest">Custom</div>
              </div>
            </div>

            {/* Table rows */}
            {DELIVERABLES.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-4 ${i < DELIVERABLES.length - 1 ? "border-b border-[var(--border-4)]" : ""} hover:bg-[var(--surface-2)] transition-colors`}
              >
                <div className="px-6 md:px-8 py-4">
                  <span className="text-[0.975rem] font-medium text-[var(--text-50)]">{row.item}</span>
                </div>
                <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-[var(--border-4)]">
                  {row.static ? <CheckIcon /> : <CrossIcon />}
                </div>
                <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-[var(--border-4)] bg-[var(--surface-2)]">
                  {row.business ? <CheckIcon /> : <CrossIcon />}
                </div>
                <div className="px-6 md:px-8 py-4 flex items-center justify-center border-l border-[var(--border-4)]">
                  {row.custom ? <CheckIcon /> : <CrossIcon />}
                </div>
              </div>
            ))}

            {/* Table footer with prices and CTA */}
            <div className="grid grid-cols-4 border-t border-[var(--border-6)]">
              <div className="px-6 md:px-8 py-6">
                <span className="text-[0.975rem] font-medium text-[var(--text-30)]">Price</span>
              </div>
              <div className="px-6 md:px-8 py-6 text-center border-l border-[var(--border-6)]">
                <div className="text-2xl md:text-3xl font-display font-800 text-[var(--text-80)]">$150</div>
                <div className="text-xs text-[var(--text-30)] mt-1">5 pages / project</div>
              </div>
              <div className="px-6 md:px-8 py-6 text-center border-l border-[var(--border-6)] bg-[var(--surface-2)]">
                <div className="text-2xl md:text-3xl font-display font-800 gradient-text">$300</div>
                <div className="text-xs text-[var(--text-30)] mt-1">10 pages / project</div>
              </div>
              <div className="px-6 md:px-8 py-6 text-center border-l border-[var(--border-6)]">
                <div className="text-[0.975rem] font-medium text-[var(--text-30)]">Negotiable</div>
                <div className="text-xs text-[var(--text-25)] mt-1">All options available</div>
              </div>
            </div>

            {/* CTA row */}
            <div className="grid grid-cols-4 border-t border-[var(--border-6)]">
              <div className="px-6 md:px-8 py-6">
                <span className="text-[0.975rem] font-medium text-[var(--text-30)]">Ready?</span>
              </div>
              <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-[var(--border-6)]">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium border border-[var(--border-10)] text-[var(--text-50)] hover:text-[var(--text-100)] hover:border-[var(--border-10)] transition-all">
                  Get Started
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
              <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-[var(--border-6)] bg-[var(--surface-2)]">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white hover:shadow-[0_0_30px_rgba(255,107,53,0.25)] transition-all duration-500">
                  Get Started
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
              <div className="px-6 md:px-8 py-6 flex items-center justify-center border-l border-[var(--border-6)]">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium border border-[#ff6b35]/20 text-[#ff6b35]/60 hover:text-[#ff6b35] hover:border-[#ff6b35]/30 transition-all">
                  Contact Us
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
