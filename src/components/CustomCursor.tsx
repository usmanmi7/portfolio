'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [projectHover, setProjectHover] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestLink = target.closest('a, button, [role="button"]');
      const closestProject = target.closest('[data-project]');

      if (closestProject) {
        setProjectHover(true);
        setHovered(true);
      } else if (closestLink) {
        setHovered(true);
        setProjectHover(false);
      } else {
        setHovered(false);
        setProjectHover(false);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, visible, x, y]);

  if (isMobile) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: projectHover ? 80 : hovered ? 48 : 16,
        height: projectHover ? 80 : hovered ? 48 : 16,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div
        className="w-full h-full rounded-full border border-white/60 flex items-center justify-center"
        style={{ background: projectHover ? 'rgba(59, 130, 246, 0.8)' : 'transparent' }}
      >
        <span
          ref={cursorTextRef}
          className="text-[10px] font-bold text-white tracking-wider"
          style={{ opacity: projectHover ? 1 : 0 }}
        >
          VIEW
        </span>
      </div>
    </motion.div>
  );
}
