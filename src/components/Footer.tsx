'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted-gray/8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="font-[family-name:var(--font-jakarta)] font-bold text-sm tracking-wider text-slate">
            USMAN MILAS
          </span>
          <span className="text-muted-gray/40">•</span>
          <span className="text-xs text-muted-gray">
            Web Designer & Developer
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs text-muted-gray"
        >
          © {year} Usman Milas. All rights reserved.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {['Work', 'Services', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs text-muted-gray hover:text-slate transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
