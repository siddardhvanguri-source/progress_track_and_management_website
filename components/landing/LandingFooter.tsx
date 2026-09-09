'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '/ai' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-[hsl(210_13%_8%)] border-t border-[hsl(215_13%_15%)]">
      {/* CTA Banner */}
      <div className="border-b border-[hsl(215_13%_15%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-[hsl(210_40%_96%)] tracking-tight">
              Ready to run your team with clarity?
            </h3>
            <p className="text-[hsl(215_16%_60%)] text-sm">
              Join 10,000+ teams already using WorkPulse. No credit card required.
            </p>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[hsl(252_95%_70%)] hover:bg-[hsl(252_85%_65%)] transition-all shadow-xl shadow-[hsl(252_95%_70%/25%)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[hsl(252_95%_65%)] to-[hsl(290_80%_65%)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-extrabold text-sm text-[hsl(210_40%_96%)]">WorkPulse</span>
            </div>
            <p className="text-xs text-[hsl(215_12%_42%)] max-w-xs leading-relaxed">
              All-in-one work intelligence platform for tracking employee presence, sprints, leaves, OKRs, and team performance.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-[hsl(215_14%_13%)] border border-[hsl(215_13%_18%)] text-[hsl(215_12%_42%)] hover:text-[hsl(210_40%_96%)] hover:bg-[hsl(215_14%_17%)] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading} className="space-y-3">
              <h4 className="text-[11px] font-bold text-[hsl(215_16%_60%)] uppercase tracking-widest">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[hsl(215_12%_42%)] hover:text-[hsl(210_40%_96%)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[hsl(215_13%_15%)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[hsl(215_12%_38%)]">
          <span>© {new Date().getFullYear()} WorkPulse Inc. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142_76%_45%)] animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
