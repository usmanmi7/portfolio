"use client";

import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "http://wa.me/+779194083" },
  { label: "Facebook", href: "https://web.facebook.com/mhd.usman.mi/" },
  { label: "X", href: "https://x.com/" },
  { label: "Fiverr", href: "https://www.fiverr.com/webworks_456/" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  "Website Design",
  "Web Development",
  "Brand Identity",
  "Digital Campaigns",
  "E-Commerce Solutions",
  "Motion & Animation",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Multi-column footer content */}
      <div className="border-t border-[var(--border-4)] px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Logo + Description */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#c084fc] flex items-center justify-center">
                  <span className="text-[0.975rem] font-display font-800 text-white">U</span>
                </div>
                <span className="font-display font-700 text-xl tracking-tight">
                  Usman<span className="text-[var(--text-30)]">.</span>
                </span>
              </Link>
              <p className="text-[0.975rem] text-[var(--text-30)] leading-relaxed max-w-xs mb-6">
                Freelance designer & developer from Sri Lanka, crafting modern, responsive, and unforgettable digital experiences for brands worldwide.
              </p>
              {/* Social links row */}
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[var(--surface-3)] border border-[var(--border-6)] flex items-center justify-center text-[var(--text-30)] hover:text-[#ff6b35] hover:border-[#ff6b35]/20 transition-all"
                    aria-label={s.label}
                  >
                    {s.label === "WhatsApp" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    )}
                    {s.label === "Facebook" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    )}
                    {s.label === "X" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    )}
                    {s.label === "Fiverr" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div className="lg:col-span-2">
              <h4 className="text-xs text-[var(--text-40)] uppercase tracking-widest mb-5 font-medium">Navigation</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.975rem] text-[var(--text-25)] hover:text-[#ff6b35] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div className="lg:col-span-3">
              <h4 className="text-xs text-[var(--text-40)] uppercase tracking-widest mb-5 font-medium">Services</h4>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-[0.975rem] text-[var(--text-25)] hover:text-[#ff6b35] transition-colors duration-300"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="lg:col-span-3">
              <h4 className="text-xs text-[var(--text-40)] uppercase tracking-widest mb-5 font-medium">Get in Touch</h4>
              <ul className="space-y-4">
                <li>
                  <p className="text-[0.975rem] text-[var(--text-25)]">Email</p>
                  <a
                    href="mailto:Webworks456@gmail.com"
                    className="text-[0.975rem] text-[var(--text-50)] hover:text-[#ff6b35] transition-colors duration-300"
                  >
                    Webworks456@gmail.com
                  </a>
                </li>
                <li>
                  <p className="text-[0.975rem] text-[var(--text-25)]">WhatsApp</p>
                  <a
                    href="http://wa.me/+779194083"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.975rem] text-[var(--text-50)] hover:text-[#ff6b35] transition-colors duration-300"
                  >
                    +94 77 919 4083
                  </a>
                </li>
                <li>
                  <p className="text-[0.975rem] text-[var(--text-25)]">Location</p>
                  <p className="text-[0.975rem] text-[var(--text-40)]">Colombo, Sri Lanka</p>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8f5e] text-white text-[0.975rem] font-medium hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-500"
              >
                Start a Project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-[var(--border-4)] px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[var(--text-30)]">
            &copy; {new Date().getFullYear()} Usman Milas. All rights reserved.
          </span>
          <p className="text-[10px] text-[var(--text-20)] uppercase tracking-widest">
            Designed & built from Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
