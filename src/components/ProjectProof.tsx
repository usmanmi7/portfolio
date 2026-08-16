'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 10, suffix: '+', label: 'Digital Tools' },
  { value: null, suffix: '∞', label: 'Ideas Turned Into Interfaces' },
];

function AnimatedCounter({ value, suffix }: { value: number | null; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || value === null) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  if (value === null) {
    return <span ref={ref}>{suffix}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ProjectProof() {
  return (
    <section className="section-padding relative" id="proof">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center p-6 sm:p-8 rounded-2xl bg-navy/30 border border-muted-gray/8"
            >
              <div className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-blue mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm sm:text-base text-muted-gray font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
