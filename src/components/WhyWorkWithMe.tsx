'use client';

import { motion } from 'framer-motion';
import { Layers, Target, MessageCircle, Fingerprint } from 'lucide-react';

const values = [
  {
    icon: Layers,
    title: 'DESIGN + DEVELOPMENT',
    description: 'I understand both the visual and technical sides of a website. No handoff gaps, no lost details.',
    accent: '#3B82F6',
  },
  {
    icon: Target,
    title: 'BUSINESS-FIRST THINKING',
    description: 'I design around the purpose of the website, not just how it looks. Every decision serves the goal.',
    accent: '#10B981',
  },
  {
    icon: MessageCircle,
    title: 'DIRECT COMMUNICATION',
    description: 'Clear communication from the first idea to the final launch. No surprises, no middlemen.',
    accent: '#8B5CF6',
  },
  {
    icon: Fingerprint,
    title: 'CUSTOM EXPERIENCES',
    description: 'No copy-paste templates pretending to be custom work. Every project is built from scratch for you.',
    accent: '#F59E0B',
  },
];

export default function WhyWorkWithMe() {
  return (
    <section className="section-padding relative" id="why">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Why Work With Me
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            WHAT MAKES THIS
            <br />
            <span className="gradient-text">DIFFERENT.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="group p-6 sm:p-8 rounded-2xl bg-navy/30 border border-muted-gray/8 hover:border-muted-gray/15 transition-all duration-[350ms] h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${v.accent}12`,
                    border: `1px solid ${v.accent}25`,
                  }}
                >
                  <v.icon size={22} style={{ color: v.accent }} />
                </div>
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg sm:text-xl font-bold text-slate mb-3 tracking-wide">
                  {v.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-gray leading-relaxed">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
