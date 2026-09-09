'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap, Building2, Star } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for small teams getting started with work management.',
    badge: null,
    cta: 'Start Free',
    ctaHref: '/login',
    features: [
      'Up to 10 team members',
      'Task & project tracking',
      'Basic attendance logs',
      'Leave management',
      '5GB storage',
      'Email support',
    ],
    color: 'border-[hsl(215_13%_22%)]',
    cardBg: 'bg-[hsl(215_14%_13%)]',
  },
  {
    name: 'Professional',
    price: 12,
    period: 'per user/mo',
    description: 'For growing teams that need deeper insight and automation.',
    badge: 'Most Popular',
    cta: 'Start 14-day Trial',
    ctaHref: '/login',
    features: [
      'Unlimited team members',
      'Everything in Starter',
      'OKR & goal tracking',
      'Blocker intelligence',
      'Weekly check-ins',
      'AI-powered insights',
      'Audit logs & compliance',
      'Priority support',
    ],
    color: 'border-[hsl(252_60%_35%)]',
    cardBg: 'bg-gradient-to-b from-[hsl(252_60%_16%)] to-[hsl(215_14%_13%)]',
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'custom pricing',
    description: 'White-glove onboarding, SSO, advanced security, and SLAs for your organization.',
    badge: null,
    cta: 'Contact Sales',
    ctaHref: '/contact',
    features: [
      'Everything in Professional',
      'SAML SSO / SCIM sync',
      'Custom roles & permissions',
      'Dedicated success manager',
      'SLA guarantees',
      'On-prem deployment option',
      'Custom integrations',
      'Security review & BAA',
    ],
    color: 'border-[hsl(215_13%_22%)]',
    cardBg: 'bg-[hsl(215_14%_13%)]',
  },
];

const testimonials = [
  {
    quote: 'WorkPulse transformed how we manage our 80-person engineering org. Visibility went from zero to real-time.',
    name: 'Priya Sharma',
    title: 'VP Engineering, Axiom Tech',
    initials: 'PS',
    color: 'bg-[hsl(252_95%_70%)]',
  },
  {
    quote: "The blocker tracking alone saved us 3 sprint cycles in Q3. It's the pulse we didn't know we needed.",
    name: 'Daniel Okonkwo',
    title: 'Head of Product, NovaBridge',
    initials: 'DO',
    color: 'bg-[hsl(38_92%_50%)]',
  },
  {
    quote: 'Leave management and workload rebalancing in one click. Our HR team is obsessed.',
    name: 'Lisa Tanaka',
    title: 'HR Director, Cortex Labs',
    initials: 'LT',
    color: 'bg-[hsl(142_76%_45%)]',
  },
];

export function PricingSection() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-20 bg-[hsl(210_13%_10%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[hsl(38_92%_50%)] fill-[hsl(38_92%_50%)]" />
              ))}
            </div>
            <h2 className="text-3xl font-black text-[hsl(210_40%_96%)] tracking-tight">
              Trusted by teams that ship
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-[hsl(215_14%_13%)] border border-[hsl(215_13%_18%)] space-y-4"
              >
                <p className="text-sm text-[hsl(215_16%_70%)] leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-black text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[hsl(210_40%_96%)]">{t.name}</p>
                    <p className="text-[11px] text-[hsl(215_12%_42%)]">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[hsl(210_13%_9%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(215_14%_13%)] border border-[hsl(215_13%_18%)] text-[hsl(215_16%_60%)] text-xs font-semibold">
              Simple, transparent pricing
            </div>
            <h2 className="text-4xl font-black text-[hsl(210_40%_96%)] tracking-tight">
              Start free, scale seamlessly
            </h2>
            <p className="text-[hsl(215_16%_60%)] max-w-md mx-auto">
              No hidden fees. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${tier.cardBg} ${tier.color} ${
                  tier.badge ? 'shadow-xl shadow-[hsl(252_95%_70%/15%)] ring-1 ring-[hsl(252_60%_40%)]' : ''
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(252_95%_70%)] text-white text-[11px] font-bold shadow-lg">
                      <Zap className="w-3 h-3 fill-white" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-1 mb-6">
                  <h3 className="text-sm font-bold text-[hsl(210_40%_96%)]">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    {tier.price !== null ? (
                      <>
                        <span className="text-4xl font-black text-[hsl(210_40%_96%)]">${tier.price}</span>
                        <span className="text-xs text-[hsl(215_12%_42%)]">{tier.period}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-black text-[hsl(210_40%_96%)]">Custom</span>
                    )}
                  </div>
                  <p className="text-[13px] text-[hsl(215_16%_60%)] leading-relaxed">{tier.description}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[hsl(215_16%_65%)]">
                      <div className="w-4 h-4 rounded-full bg-[hsl(142_60%_15%)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[hsl(142_76%_45%)]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all ${
                    tier.badge
                      ? 'bg-[hsl(252_95%_70%)] text-white hover:bg-[hsl(252_85%_65%)] shadow-lg shadow-[hsl(252_95%_70%/25%)]'
                      : 'bg-[hsl(215_14%_17%)] text-[hsl(210_40%_96%)] hover:bg-[hsl(215_14%_22%)] border border-[hsl(215_13%_22%)]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-[hsl(215_12%_42%)] mt-8">
            All plans include SOC2 compliance, 99.9% uptime SLA, and free migrations from other tools.
          </p>
        </div>
      </section>
    </>
  );
}
