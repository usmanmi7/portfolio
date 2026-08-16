'use client';

import { motion } from 'framer-motion';
import { Palette, Code2, Sparkles } from 'lucide-react';

const capabilities = [
  {
    icon: Palette,
    title: 'DESIGN',
    items: ['Figma', 'UI/UX', 'Responsive Design', 'Visual Systems'],
    color: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.3)',
    accent: '#3B82F6',
  },
  {
    icon: Code2,
    title: 'BUILD',
    items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'Webflow'],
    color: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.3)',
    accent: '#10B981',
  },
  {
    icon: Sparkles,
    title: 'CREATE',
    items: ['SaaS Platforms', 'Dashboards', 'Landing Pages', 'Business Websites'],
    color: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.3)',
    accent: '#8B5CF6',
  },
];

export default function Introduction() {
  return (
    <section className="section-padding relative" id="introduction">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            What I Actually Do
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate mb-6">
            I TURN COMPLEX IDEAS INTO
            <br />
            <span className="gradient-text">SIMPLE DIGITAL EXPERIENCES.</span>
          </h2>
          <p className="text-muted-gray text-base sm:text-lg max-w-2xl leading-relaxed">
            Every project starts with understanding the goal. I don&apos;t just make
            things look good — I make them work, feel right, and serve a purpose.
            Whether it&apos;s a SaaS dashboard or a local business website, the process
            is the same: clarity first, creativity always.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="group p-6 sm:p-8 rounded-2xl transition-all duration-[350ms] hover:scale-[1.02] h-full"
                style={{
                  background: cap.color,
                  border: `1px solid ${cap.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-[350ms] group-hover:scale-110"
                  style={{ background: cap.border }}
                >
                  <cap.icon size={22} style={{ color: cap.accent }} />
                </div>
                <h3
                  className="font-[family-name:var(--font-jakarta)] text-xl font-bold tracking-wider mb-4"
                  style={{ color: cap.accent }}
                >
                  {cap.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-muted-gray px-3 py-1.5 rounded-full border border-muted-gray/15 transition-colors duration-300 group-hover:text-slate"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
