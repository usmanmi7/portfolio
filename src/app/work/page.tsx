"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export default function WorkPage() {
  return (
    <div className="noise min-h-screen bg-[var(--bg-base)] text-[var(--text-100)]">
      <Nav />

      {/* Hero banner */}
      <section className="pt-36 md:pt-[125px] pb-16 md:pb-20 px-6 md:px-10 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#c084fc]/[0.02] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 leading-[0.92] tracking-tight mb-6">
            Projects I&apos;m{" "}
            <span className="gradient-text">proud of</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-40)] max-w-xl">
            A curated selection of work that showcases my approach to design, development, and digital storytelling.
          </p>
        </div>
      </section>

      {/* Zigzag project rows */}
      <section className="pb-24 md:pb-[125px] px-6 md:px-10">
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
                  <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-4)] ${
                    !isEven ? "lg:order-2" : ""
                  }`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-alt)]/40 to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className={`flex flex-col ${!isEven ? "lg:order-1 lg:text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-4 ${!isEven ? "lg:justify-end" : ""}`}>
                      <span className="text-xs text-[var(--text-30)] px-2.5 py-1 rounded-full border border-[var(--border-6)]">{project.tag}</span>
                      <span className="text-xs text-[var(--text-30)]">{project.year}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-700 mb-4 group-hover:text-[#ff6b35] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-base text-[var(--text-35)] leading-relaxed mb-6 max-w-md">
                      {project.desc}
                    </p>
                    <div className={`flex gap-2 ${!isEven ? "lg:justify-end" : ""}`}>
                      {project.tools.map((tool) => (
                        <span key={tool} className="text-xs text-[var(--text-30)] px-3 py-1.5 rounded-full bg-[var(--surface-3)] border border-[var(--border-5)]">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className={`mt-6 ${!isEven ? "lg:text-right" : ""}`}>
                      <span className="inline-flex items-center gap-2 text-[0.975rem] font-medium text-[var(--text-40)] group-hover:text-[#ff6b35] transition-colors cursor-pointer">
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

      <Footer />
    </div>
  );
}
