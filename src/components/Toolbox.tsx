'use client';

import { motion } from 'framer-motion';

const tools = [
  { name: 'Figma', desc: 'Primary design tool for UI/UX', category: 'design' },
  { name: 'Adobe XD', desc: 'Alternative design prototyping', category: 'design' },
  { name: 'Photoshop', desc: 'Image editing & manipulation', category: 'design' },
  { name: 'Canva', desc: 'Quick visuals & social content', category: 'design' },
  { name: 'HTML', desc: 'Semantic web structure', category: 'code' },
  { name: 'CSS', desc: 'Styling & responsive layouts', category: 'code' },
  { name: 'JavaScript', desc: 'Interactive functionality', category: 'code' },
  { name: 'PHP', desc: 'Server-side development', category: 'code' },
  { name: 'MySQL', desc: 'Database management', category: 'code' },
  { name: 'WordPress', desc: 'CMS & custom themes', category: 'platform' },
  { name: 'Webflow', desc: 'No-code web platform', category: 'platform' },
  { name: 'Squarespace', desc: 'Website builder platform', category: 'platform' },
  { name: 'XAMPP', desc: 'Local development server', category: 'dev' },
  { name: 'GitHub', desc: 'Version control & collaboration', category: 'dev' },
  { name: 'Vercel', desc: 'Deployment & hosting', category: 'dev' },
  { name: 'Swiper.js', desc: 'Touch slider library', category: 'lib' },
  { name: 'GSAP', desc: 'Professional animations', category: 'lib' },
  { name: 'AOS', desc: 'Scroll animations library', category: 'lib' },
  { name: 'Font Awesome', desc: 'Icon library & toolkit', category: 'lib' },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  design: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.25)', text: '#3B82F6' },
  code: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.25)', text: '#10B981' },
  platform: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.25)', text: '#8B5CF6' },
  dev: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.25)', text: '#F59E0B' },
  lib: { bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.25)', text: '#EC4899' },
};

export default function Toolbox() {
  return (
    <section className="section-padding relative" id="toolbox">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
            Toolbox
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate">
            THE TOOLS BEHIND
            <br />
            <span className="gradient-text">THE WORK.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {tools.map((tool, i) => {
            const colors = categoryColors[tool.category];
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="group p-4 sm:p-5 rounded-xl transition-all duration-300 hover:scale-105 cursor-default text-center"
                  style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <h4
                    className="font-[family-name:var(--font-jakarta)] font-bold text-sm sm:text-base mb-1 transition-colors duration-300"
                    style={{ color: colors.text }}
                  >
                    {tool.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-gray leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tool.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
