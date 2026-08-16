'use client';

import { motion } from 'framer-motion';
import { Globe, Code2, Layout, PenTool, RefreshCw } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: Globe,
    title: 'Website Design',
    description:
      'Complete website design from concept to visual execution. Responsive, polished, and built around your brand.',
    tools: ['Figma', 'Adobe XD', 'Canva'],
    accent: '#3B82F6',
  },
  {
    num: '02',
    icon: Code2,
    title: 'Website Development',
    description:
      'Clean, responsive development that brings designs to life. WordPress, Webflow, or custom code.',
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'],
    accent: '#10B981',
  },
  {
    num: '03',
    icon: Layout,
    title: 'SaaS / Web Applications',
    description:
      'Designing intuitive dashboards, platforms, and web apps that users actually enjoy navigating.',
    tools: ['Figma', 'JavaScript', 'Webflow'],
    accent: '#8B5CF6',
  },
  {
    num: '04',
    icon: PenTool,
    title: 'UI/UX Design',
    description:
      'User interface and experience design that balances aesthetics with usability. Research-informed decisions.',
    tools: ['Figma', 'Adobe XD'],
    accent: '#F59E0B',
  },
  {
    num: '05',
    icon: RefreshCw,
    title: 'Website Redesign',
    description:
      'Transforming outdated websites into modern, high-performing digital experiences that align with current standards.',
    tools: ['Figma', 'CSS', 'JavaScript', 'WordPress'],
    accent: '#EC4899',
  },
];

export default function Services() {
  return (
    <section className="section-padding relative" id="services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            WHAT I CAN
            <br />
            <span className="gradient-text">DO FOR YOU.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="group p-6 sm:p-8 rounded-2xl transition-all duration-[350ms] hover:scale-[1.005] cursor-default border border-muted-gray/8 hover:border-muted-gray/15"
                style={{ background: `${s.accent}06` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-4 sm:gap-6 sm:min-w-[280px]">
                    <span
                      className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold opacity-20"
                      style={{ color: s.accent }}
                    >
                      {s.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${s.accent}12`,
                        border: `1px solid ${s.accent}25`,
                      }}
                    >
                      <s.icon size={18} style={{ color: s.accent }} />
                    </div>
                    <h3
                      className="font-[family-name:var(--font-jakarta)] text-lg sm:text-xl font-bold tracking-wide"
                      style={{ color: s.accent }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-gray leading-relaxed flex-1">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:min-w-[200px] sm:justify-end">
                    {s.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs px-2.5 py-1 rounded-md bg-dark/50 text-muted-gray border border-muted-gray/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
