'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="InsureRocket" className="h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/medicare-advantage/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Medicare Advantage</Link>
            <Link href="/medicare-supplement/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Supplement Plans</Link>
            <Link href="/prescription-drug-plans/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Part D</Link>
            <Link href="/insurance-guides/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Guides</Link>
            <Link href="/insurance-companies/aetna/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Company Reviews</Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/medicare-advantage/" className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-light rounded" onClick={() => setMobileOpen(false)}>Medicare Advantage</Link>
            <Link href="/medicare-supplement/" className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-light rounded" onClick={() => setMobileOpen(false)}>Supplement Plans</Link>
            <Link href="/prescription-drug-plans/" className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-light rounded" onClick={() => setMobileOpen(false)}>Part D</Link>
            <Link href="/insurance-guides/" className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-light rounded" onClick={() => setMobileOpen(false)}>Guides</Link>
            <Link href="/insurance-companies/aetna/" className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-light rounded" onClick={() => setMobileOpen(false)}>Company Reviews</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
