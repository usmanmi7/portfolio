'use client';

import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section className="section-padding relative" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate mb-6">
              USMAN
              <br />
              <span className="gradient-text-blue">MILAS.</span>
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium mb-6">
              Web Designer & Developer
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted-gray text-base sm:text-lg leading-relaxed mb-5">
              I&apos;m a freelance web designer and developer who creates digital
              experiences that balance aesthetics with purpose. From SaaS
              dashboards to business websites, I focus on work that looks sharp,
              feels intuitive, and delivers results.
            </p>
            <p className="text-muted-gray text-base sm:text-lg leading-relaxed mb-8">
              I work with Figma for design, and build with WordPress, Webflow, or
              custom code — depending on what the project needs. Every project
              starts with understanding the goal and ends with something I&apos;m
              proud to put my name on.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-muted-gray/30 text-slate font-semibold hover:bg-slate/5 transition-colors duration-300"
              >
                See My Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
