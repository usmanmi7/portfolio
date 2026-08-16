'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Hammer, Rocket } from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'DISCOVER',
    icon: Search,
    description:
      'Understanding the business, the audience, and the goals. Research, competitor analysis, and defining the direction before anything gets designed.',
    color: '#3B82F6',
  },
  {
    num: '02',
    title: 'DESIGN',
    icon: PenTool,
    description:
      'Wireframes, visual concepts, and UI design in Figma. Iterative process with feedback loops until the design feels right and serves the purpose.',
    color: '#10B981',
  },
  {
    num: '03',
    title: 'BUILD',
    icon: Hammer,
    description:
      'Translating design into clean, responsive code. Pixel-perfect implementation with animations, interactions, and performance in mind.',
    color: '#8B5CF6',
  },
  {
    num: '04',
    title: 'LAUNCH',
    icon: Rocket,
    description:
      'Testing, optimization, and deployment. Making sure everything works flawlessly across devices before going live.',
    color: '#F59E0B',
  },
];

export default function Process() {
  return (
    <section className="section-padding relative" id="process">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Process
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            FROM IDEA TO
            <br />
            <span className="gradient-text">LAUNCH.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="group p-6 sm:p-8 rounded-2xl bg-navy/40 border border-muted-gray/8 hover:border-muted-gray/15 transition-all duration-[350ms] h-full">
                {/* Connecting line */}
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-muted-gray/10" />
                )}

                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-[family-name:var(--font-jakarta)] text-4xl font-bold opacity-15"
                    style={{ color: stage.color }}
                  >
                    {stage.num}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${stage.color}15`,
                      border: `1px solid ${stage.color}30`,
                    }}
                  >
                    <stage.icon size={18} style={{ color: stage.color }} />
                  </div>
                </div>

                <h3
                  className="font-[family-name:var(--font-jakarta)] text-lg font-bold tracking-wider mb-3 transition-colors duration-300"
                  style={{ color: stage.color }}
                >
                  {stage.title}
                </h3>

                <p className="text-sm text-muted-gray leading-relaxed">
                  {stage.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-6 h-1 rounded-full bg-muted-gray/8 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `${stage.color}40` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
