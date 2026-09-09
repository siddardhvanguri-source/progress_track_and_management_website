import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingPageSections } from '@/components/landing/LandingPageSections';

export const metadata: Metadata = {
  title: 'VEIXON Command Center — Operational Clarity for Internal Engineering & Projects',
  description:
    'One calm operational view for projects, people, meetings, deadlines, and everything that needs your attention across VEIXON.Tech.',
};

export default function RootLandingPage() {
  return (
    <div className="min-h-screen bg-[#06080E] text-white">
      <LandingNavbar />
      <LandingPageSections />
    </div>
  );
}
