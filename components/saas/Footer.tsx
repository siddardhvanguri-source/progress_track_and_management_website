'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Heart, Shield, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                <Zap className="h-4 w-4 fill-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-foreground">
                SaaS App Company
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Powerful software to help teams of all sizes streamline operations, log leaves, and track progress effortlessly.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-primary transition-colors">
                  Calendar & Leaves
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects & Tasks
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-primary transition-colors">
                  Teams Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-primary transition-colors">
                  Log Team Leave
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Task Boards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Stay Updated</h4>
            <p className="text-xs text-muted-foreground">
              Subscribe to get product updates and operational best practices.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter work email"
                className="px-3 py-1.5 text-xs bg-muted/30 border border-input rounded-xl focus:outline-none focus:ring-1 focus:ring-primary flex-1"
              />
              <button
                type="button"
                onClick={() => alert('Thank you for subscribing!')}
                className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} SaaS App Company. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">
              Privacy Charter
            </Link>
            <Link href="/about" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:underline">
              Support Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
