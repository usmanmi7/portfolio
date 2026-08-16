'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [projectClicked, setProjectClicked] = useState(false);

  const handleProjectClick = () => {
    setProjectClicked(true);
    setTimeout(() => setProjectClicked(false), 2500);
  };

  return (
    <section className="section-padding relative" id="contact">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-blue/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-accent-blue tracking-widest uppercase mb-6 block">
            Have Something Worth Building?
          </span>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate mb-6">
            HAVE AN IDEA?
            <br />
            <span className="gradient-text-blue">LET&apos;S TURN IT INTO</span>
            <br />
            SOMETHING REAL.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          <button
            onClick={handleProjectClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20 min-w-[200px] justify-center"
          >
            {projectClicked ? (
              <>
                MESSAGE RECEIVED ✓
              </>
            ) : (
              <>
                START A PROJECT
                <ArrowRight size={18} />
              </>
            )}
          </button>
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-muted-gray/30 text-slate font-semibold hover:bg-slate/5 transition-colors duration-300 min-w-[200px] justify-center"
          >
            VIEW MY WORK
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          <a
            href="mailto:usman@milas.dev"
            className="group flex items-center gap-2 text-muted-gray hover:text-slate transition-colors duration-300"
          >
            <Mail size={18} className="group-hover:text-accent-blue transition-colors duration-300" />
            <span className="text-sm font-medium">usman@milas.dev</span>
          </a>
          <a
            href="https://linkedin.com/in/usmanmilas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-muted-gray hover:text-slate transition-colors duration-300"
          >
            <Linkedin size={18} className="group-hover:text-accent-blue transition-colors duration-300" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com/usmanmilas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-muted-gray hover:text-slate transition-colors duration-300"
          >
            <Github size={18} className="group-hover:text-accent-blue transition-colors duration-300" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href="https://fiverr.com/usmanmilas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-muted-gray hover:text-slate transition-colors duration-300"
          >
            <ExternalLink size={18} className="group-hover:text-accent-blue transition-colors duration-300" />
            <span className="text-sm font-medium">Fiverr</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
