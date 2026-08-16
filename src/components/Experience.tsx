'use client';

import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2020',
    title: 'Started Web Design',
    description: 'Began learning HTML, CSS, and design fundamentals. Built first websites.',
  },
  {
    year: '2021',
    title: 'Freelance Projects',
    description: 'Took on first freelance clients. Focused on WordPress and responsive design.',
  },
  {
    year: '2022',
    title: 'Working with Clients',
    description: 'Expanded client base. Built business websites with professional polish.',
  },
  {
    year: '2023',
    title: 'Building SaaS Products',
    description: 'Designed SaaS dashboards and platforms. Deepened UI/UX expertise with Figma.',
  },
  {
    year: '2024',
    title: 'Expanding into Development',
    description: 'Combined design with front-end development. JavaScript, animations, Webflow.',
  },
  {
    year: 'Now',
    title: 'Current Projects',
    description: 'Full-service web design & development. Creating digital experiences that matter.',
  },
];

export default function Experience() {
  return (
    <section className="section-padding relative overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Journey
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            THE PATH THAT
            <br />
            <span className="gradient-text">GOT ME HERE.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-muted-gray/10 hidden md:block" />

          <div className="grid md:grid-cols-6 gap-8 md:gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Dot on timeline */}
                <div className="hidden md:flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full border-2 border-accent-blue bg-dark relative z-10">
                    <div className="absolute inset-1 rounded-full bg-accent-blue/40" />
                  </div>
                </div>

                {/* Mobile vertical connector */}
                <div className="md:hidden flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-accent-blue bg-dark relative z-10">
                      <div className="absolute inset-0.5 rounded-full bg-accent-blue/40" />
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-[2px] h-full bg-muted-gray/10 min-h-[60px]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold text-accent-blue tracking-wider mb-1 block">
                      {m.year}
                    </span>
                    <h4 className="font-[family-name:var(--font-jakarta)] text-base font-bold text-slate mb-2">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-gray leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Desktop card */}
                <div className="hidden md:block text-center">
                  <span className="text-xs font-bold text-accent-blue tracking-wider mb-2 block">
                    {m.year}
                  </span>
                  <h4 className="font-[family-name:var(--font-jakarta)] text-sm font-bold text-slate mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs text-muted-gray leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
