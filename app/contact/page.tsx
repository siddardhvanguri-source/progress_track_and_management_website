'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How do employees log leaves on the calendar?',
      a: 'Click the "Log Leave" button in the top navigation bar from any page. Choose the leave type, start/end dates, reason, and an optional backup teammate for work coverage. Your request immediately updates the calendar.',
    },
    {
      q: 'Can managers approve or decline leave requests?',
      a: 'Yes! On the Calendar page, managers can view all pending requests in the List View and approve or decline with a single click.',
    },
    {
      q: 'How are tasks organized across teams and projects?',
      a: 'In the Projects & Tasks tab, you can view tasks grouped either by Project (e.g. NextGen Web App, Cloud Native API) or by Team Squad (Frontend, Backend, Design, DevOps, AI).',
    },
    {
      q: 'Can I switch between different employee personas?',
      a: 'Yes! Click the Employee Login button or your user avatar in the top right header to instantly switch between 25+ real team profiles across all squads.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-20 py-4 animate-in fade-in duration-300">
      {/* 1. Hero Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold">
          <Mail className="h-4 w-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
          Contact SaaS App Company
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have questions about our operations platform, leave planning system, or custom enterprise deployments? We'd love to hear from you.
        </p>
      </section>

      {/* 2. Form & Contact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Column */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-foreground">Company Information</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Email Inquiries</p>
                  <p className="text-muted-foreground">contact@saasappcompany.io</p>
                  <p className="text-muted-foreground">support@saasappcompany.io</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Phone Support</p>
                  <p className="text-muted-foreground">+1 (800) 555-0199</p>
                  <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Global Headquarters</p>
                  <p className="text-muted-foreground">100 Innovation Boulevard, Suite 400</p>
                  <p className="text-muted-foreground">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out, {name}. Our operations team will review your message and reply to {email} within 24 hours.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="text-xs"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Send Us a Direct Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Leave Calendar Integration inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can our operations platform help your team?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="w-full sm:w-auto gap-2 text-xs font-bold shadow-saas rounded-xl"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Inquiry</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Frequently Asked Questions */}
      <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Quick answers about logging leave, managing project tasks, and employee authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-muted/15 space-y-2">
              <h3 className="text-xs font-bold text-foreground">{faq.q}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
