'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = ['ALL', 'WEB DESIGN', 'SAAS', 'BUSINESS', 'E-COMMERCE', 'UI/UX'];

type Project = {
  name: string;
  category: string[];
  description: string;
  tech: string[];
  role: string;
  year: string;
  color: string;
  border: string;
};

const projects: Project[] = [
  {
    name: 'AutoElite',
    category: ['WEB DESIGN', 'UI/UX'],
    description: 'A premium car sales website built to showcase inventory with style and drive qualified leads.',
    tech: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    role: 'Web Designer & Developer',
    year: '2024',
    color: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.2)',
  },
  {
    name: 'Upmind',
    category: ['SAAS', 'WEB DESIGN', 'UI/UX'],
    description: 'A SaaS consulting and digital platform designed to simplify workflows and scale operations.',
    tech: ['Figma', 'Webflow', 'JavaScript'],
    role: 'UI/UX Designer',
    year: '2024',
    color: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.2)',
  },
  {
    name: 'One Way Line Striping',
    category: ['BUSINESS', 'WEB DESIGN'],
    description: 'Professional business website for a line striping and pavement marking company.',
    tech: ['WordPress', 'CSS', 'PHP'],
    role: 'Web Designer & Developer',
    year: '2023',
    color: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  {
    name: 'Bright Diamonds Enterprises',
    category: ['BUSINESS', 'WEB DESIGN'],
    description: 'Elegant business website for a diamond enterprise with refined visual identity.',
    tech: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    role: 'Web Designer',
    year: '2023',
    color: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  {
    name: 'Aries Consulting Group',
    category: ['BUSINESS', 'WEB DESIGN', 'UI/UX'],
    description: 'Consulting group website designed for credibility and client conversion.',
    tech: ['WordPress', 'Figma', 'CSS'],
    role: 'Web Designer & Developer',
    year: '2023',
    color: 'rgba(236, 72, 153, 0.08)',
    border: 'rgba(236, 72, 153, 0.2)',
  },
  {
    name: 'Pathway Healthcare Solution',
    category: ['WEB DESIGN', 'UI/UX'],
    description: 'Healthcare platform designed for clarity, trust, and seamless user experience.',
    tech: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    role: 'UI/UX Designer',
    year: '2024',
    color: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.2)',
  },
  {
    name: 'Legendary Cleaning Services',
    category: ['BUSINESS', 'WEB DESIGN'],
    description: 'Service business website with booking flow and clear service presentation.',
    tech: ['WordPress', 'CSS', 'PHP'],
    role: 'Web Designer & Developer',
    year: '2022',
    color: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  {
    name: 'So•BOHO',
    category: ['E-COMMERCE', 'WEB DESIGN', 'UI/UX'],
    description: 'Boutique e-commerce website with curated shopping experience and refined aesthetics.',
    tech: ['Squarespace', 'CSS', 'JavaScript'],
    role: 'Web Designer',
    year: '2023',
    color: 'rgba(168, 85, 247, 0.08)',
    border: 'rgba(168, 85, 247, 0.2)',
  },
];

export default function SelectedWork() {
  const [active, setActive] = useState('ALL');

  const filtered =
    active === 'ALL'
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <section className="section-padding relative" id="work">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            PROJECTS THAT
            <br />
            <span className="gradient-text">SPEAK FOR THEMSELVES.</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 sm:gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-[350ms] ${
                active === cat
                  ? 'bg-accent-blue text-white'
                  : 'bg-navy/60 text-muted-gray border border-muted-gray/15 hover:text-slate hover:border-muted-gray/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="group p-6 sm:p-8 rounded-2xl transition-all duration-[350ms] hover:scale-[1.01] cursor-pointer relative overflow-hidden"
                  style={{
                    background: project.color,
                    border: `1px solid ${project.border}`,
                  }}
                >
                  {/* Project header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-muted-gray font-medium tracking-wider">
                        {project.year} — {project.role}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-muted-gray/20 flex items-center justify-center transition-all duration-300 group-hover:bg-accent-blue group-hover:border-accent-blue group-hover:rotate-45">
                      <ArrowUpRight size={16} className="text-muted-gray group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-slate mb-3 group-hover:text-accent-blue transition-colors duration-300">
                    {project.name}
                  </h3>

                  <p className="text-muted-gray text-sm sm:text-base mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs px-3 py-1 rounded-full border border-muted-gray/15 text-muted-gray"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md bg-dark/40 text-muted-gray"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
