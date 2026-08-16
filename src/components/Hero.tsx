'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const floatingLayers = [
  {
    label: 'Figma Design',
    icon: '◆',
    x: '65%',
    y: '15%',
    size: 180,
    color: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    rotate: -6,
  },
  {
    label: 'Website',
    icon: '▢',
    x: '75%',
    y: '35%',
    size: 200,
    color: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    rotate: 3,
  },
  {
    label: 'SaaS Dashboard',
    icon: '▦',
    x: '58%',
    y: '50%',
    size: 160,
    color: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    rotate: -3,
  },
  {
    label: 'Code',
    icon: '{ }',
    x: '82%',
    y: '60%',
    size: 130,
    color: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
    rotate: 5,
  },
  {
    label: 'Mobile',
    icon: '☐',
    x: '70%',
    y: '72%',
    size: 110,
    color: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.2)',
    rotate: -8,
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-blue/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse-glow" />
              <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase">
                Available for Projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate mb-6"
            >
              I DESIGN DIGITAL
              <br />
              EXPERIENCES THAT
              <br />
              <span className="gradient-text-blue">PEOPLE REMEMBER.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-muted-gray text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
            >
              Freelance web designer and developer creating purposeful digital
              products — from SaaS platforms to business websites — that look
              sharp, feel intuitive, and deliver results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
              >
                View My Work
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-muted-gray/30 text-slate font-semibold hover:bg-slate/5 transition-all duration-300"
              >
                <Play size={16} />
                Let&apos;s Work Together
              </a>
            </motion.div>

            {/* Credibility indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted-gray"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate font-bold text-base sm:text-lg">4+</span>
                <span>YEARS EXPERIENCE</span>
              </div>
              <div className="w-px h-4 bg-muted-gray/30" />
              <div className="flex items-center gap-2">
                <span className="text-slate font-bold text-base sm:text-lg">20+</span>
                <span>PROJECTS</span>
              </div>
              <div className="w-px h-4 bg-muted-gray/30 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-slate font-bold text-base sm:text-lg">WEB DESIGN • DEVELOPMENT • UI/UX</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating workspace layers */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] hidden md:block">
            {floatingLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, scale: 0.8, rotate: layer.rotate - 10 }}
                animate={{ opacity: 1, scale: 1, rotate: layer.rotate }}
                transition={{
                  duration: 1,
                  delay: 0.8 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute"
                style={{
                  left: layer.x,
                  top: layer.y,
                  width: layer.size,
                  height: layer.size * 0.7,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -8 - i * 3, 0],
                    rotate: [layer.rotate, layer.rotate + 1, layer.rotate],
                  }}
                  transition={{
                    duration: 5 + i * 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full rounded-2xl p-4 flex flex-col justify-between"
                  style={{
                    background: layer.color,
                    border: `1px solid ${layer.borderColor}`,
                  }}
                >
                  <div className="text-2xl opacity-60 text-slate">{layer.icon}</div>
                  <div className="text-xs font-medium text-muted-gray tracking-wider uppercase">
                    {layer.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative dots */}
            <div className="absolute top-[10%] left-[50%] w-1.5 h-1.5 rounded-full bg-accent-blue/40" />
            <div className="absolute top-[30%] left-[90%] w-1 h-1 rounded-full bg-accent-blue/30" />
            <div className="absolute bottom-[20%] left-[55%] w-1.5 h-1.5 rounded-full bg-purple-400/30" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
