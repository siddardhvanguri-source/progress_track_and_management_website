'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  FolderKanban,
  Users,
  Info,
  Mail,
  LogIn,
  LogOut,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Zap,
} from 'lucide-react';
import { LogLeaveModal } from './LogLeaveModal';
import { LoginModal } from './LoginModal';

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, isDarkMode, toggleDarkMode, leaves } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogLeaveOpen, setIsLogLeaveOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const pendingLeavesCount = leaves.filter((l) => l.status === 'PENDING_APPROVAL').length;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Calendar & Leaves', href: '/calendar', badge: pendingLeavesCount > 0 ? pendingLeavesCount : undefined },
    { label: 'Projects & Tasks', href: '/projects' },
    { label: 'Teams', href: '/teams' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-foreground leading-none">
              SaaS App Company
            </span>
            <span className="text-[11px] text-muted-foreground font-medium mt-0.5 tracking-wide">
              Operations & Work Management
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-purple-500 text-white text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, User/Login, Log Leave CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors text-left"
              title="Switch Employee Persona"
            >
              <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="xs" status={currentUser.attendanceStatus} />
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-foreground leading-tight">{currentUser.name.split(' ')[0]}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{currentUser.jobTitle}</p>
              </div>
            </button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
              className="gap-1.5 text-xs font-semibold"
            >
              <LogIn className="h-3.5 w-3.5" />
              Employee Login
            </Button>
          )}

          {/* Log Leave CTA Button */}
          <Button
            size="md"
            variant="primary"
            onClick={() => setIsLogLeaveOpen(true)}
            className="gap-2 text-xs font-bold shadow-saas rounded-xl"
          >
            <Calendar className="h-4 w-4" />
            <span>Log Leave</span>
          </Button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-border bg-card text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  pathname === link.href ? 'bg-primary text-white font-bold' : 'text-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginOpen(true);
              }}
              className="w-full text-xs"
            >
              Switch Account
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLogLeaveOpen(true);
              }}
              className="w-full text-xs"
            >
              Log Leave
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <LogLeaveModal isOpen={isLogLeaveOpen} onClose={() => setIsLogLeaveOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}
