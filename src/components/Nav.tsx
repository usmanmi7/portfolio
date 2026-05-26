"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "http://wa.me/+779194083" },
  { label: "Facebook", href: "https://web.facebook.com/mhd.usman.mi/" },
  { label: "X", href: "https://x.com/" },
  { label: "Fiverr", href: "https://www.fiverr.com/webworks_456/" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[var(--bg-nav-blur)] backdrop-blur-xl border-b border-[var(--border-4)]" : ""
        }`}
      >
        <div className="flex items-center px-6 md:px-10 py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
              <span className="text-[0.975rem] font-display font-800 text-white">U</span>
            </div>
            <span className="font-display font-700 text-lg tracking-tight hidden sm:block">
              Usman<span className="text-[var(--text-30)]">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[0.975rem] transition-colors duration-300 tracking-wide ${
                  pathname === link.href
                    ? "text-[#ff6b35]"
                    : "text-[var(--text-40)] hover:text-[var(--text-100)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA + Theme toggle + Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.975rem] font-medium bg-[var(--text-100)] text-[var(--bg-base)] hover:bg-[var(--text-100)]/90 transition-all"
            >
              Let&apos;s Talk
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative z-50 w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-5)] border border-[var(--border-6)] hover:bg-[var(--surface-5)]/80 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-[var(--surface-5)] border border-[var(--border-6)] md:hidden"
              aria-label="Toggle menu"
            >
              <span className={`w-4 h-[1.5px] bg-[var(--text-100)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-[var(--text-100)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--bg-base)] flex flex-col items-center justify-center md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.5s ease" }}
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-4xl font-display font-700 transition-all ${
                pathname === link.href ? "gradient-text" : "gradient-text-subtle hover:gradient-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-16 flex gap-5">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-xs text-[var(--text-30)] hover:text-[#ff6b35] transition-colors uppercase tracking-widest">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
