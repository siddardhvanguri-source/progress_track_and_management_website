'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, LogIn, UserCheck, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { users, currentUser, setCurrentUser, setCurrentRole } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSelectUser = (user: (typeof users)[0]) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      handleSelectUser(matched);
    } else {
      alert(`Welcome back! Signed in as ${email}`);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-primary font-bold">
          <LogIn className="h-5 w-5" />
          <span>Employee Portal & Account Switcher</span>
        </div>
      }
      description="Select any teammate to log in as or sign in with work credentials."
    >
      <div className="space-y-5">
        {/* Quick Demo Personas */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Instant One-Click Employee Logins:
          </span>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {users.slice(0, 6).map((u) => {
              const isCurrent = currentUser?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'border-primary bg-primary/10 text-foreground font-bold shadow-xs'
                      : 'border-border/70 hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} src={u.avatarUrl} size="sm" status={u.attendanceStatus} />
                    <div>
                      <p className="text-xs font-bold text-foreground">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {u.jobTitle} • {u.departmentName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={u.role === 'ADMIN' ? 'purple' : u.role === 'MANAGER' ? 'info' : 'secondary'} className="text-[9px]">
                      {u.role}
                    </Badge>
                    {isCurrent && <UserCheck className="h-4 w-4 text-primary" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Traditional Form Login */}
        <form onSubmit={handleCustomLogin} className="space-y-3 pt-3 border-t border-border">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Or Sign in with Email:
          </span>
          <Input
            label="Work Email"
            type="email"
            placeholder="e.g. sarah.jenkins@workpulse.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
            Sign In to Employee Portal
          </Button>
        </form>
      </div>
    </Modal>
  );
}
