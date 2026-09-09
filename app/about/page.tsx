'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Zap,
  Sparkles,
  Shield,
  Users,
  Calendar,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Target,
  Heart,
  Award,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 lg:space-y-24 py-4 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold">
          <Sparkles className="h-4 w-4" />
          <span>About SaaS App Company</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
          We Build Modern Software to Supercharge High-Velocity Teams
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          At our company, we specialize in developing software that helps businesses of all sizes streamline operations, increase transparency, and boost team productivity.
        </p>
      </section>

      {/* 2. Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Eliminate operational friction and communication blindspots. We create software that answers what is happening, why it is happening, and what to do next.
          </p>
        </div>

        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">People-First Philosophy</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Transparent leave schedules, empathetic workload distribution, and automatic backup handovers protect teams from burnout.
          </p>
        </div>

        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Engineering Excellence</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Built on a robust PostgreSQL database schema via Prisma, Next.js 14 App Router, and Tailwind CSS for instant responsiveness.
          </p>
        </div>
      </section>

      {/* 3. Tech Stack & Architecture Highlights */}
      <section className="rounded-3xl border border-border/80 bg-card p-8 shadow-card space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-xs uppercase font-bold text-primary">
            Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            Enterprise Architecture & Database
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Designed for scale, instant search, and relational consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/15 space-y-2">
            <span className="font-mono text-xs font-bold text-primary">01. Database</span>
            <h3 className="text-sm font-bold text-foreground">PostgreSQL & Prisma</h3>
            <p className="text-xs text-muted-foreground">
              Strict schema for users, leaves, projects, tasks, subtasks, and audit logs.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-border/60 bg-muted/15 space-y-2">
            <span className="font-mono text-xs font-bold text-purple-500">02. Frontend</span>
            <h3 className="text-sm font-bold text-foreground">Next.js 14 & React</h3>
            <p className="text-xs text-muted-foreground">
              Server components, streaming layouts, and client-side reactive state.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-border/60 bg-muted/15 space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-500">03. Styling</span>
            <h3 className="text-sm font-bold text-foreground">Tailwind & Modern CSS</h3>
            <p className="text-xs text-muted-foreground">
              Curated purple & teal palette with seamless dark/light theme switching.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-border/60 bg-muted/15 space-y-2">
            <span className="font-mono text-xs font-bold text-blue-500">04. Authentication</span>
            <h3 className="text-sm font-bold text-foreground">Employee Portal</h3>
            <p className="text-xs text-muted-foreground">
              Role-based identity switching, session persistence, and leave authorization.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent-teal/10 p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">
          Ready to See the Difference?
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          Explore our interactive leave calendar, create project tasks, and see how easy it is to manage company operations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/calendar">
            <Button size="lg" variant="primary" className="gap-2 text-sm font-bold shadow-saas rounded-xl">
              <Calendar className="h-4 w-4" />
              <span>Explore Calendar</span>
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="gap-2 text-sm font-semibold rounded-xl">
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
