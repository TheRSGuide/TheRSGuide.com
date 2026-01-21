import Link from "next/link";
import { Sword, Target, Skull, BookOpen, Settings, Map, ChevronRight, Wand2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="homepage relative min-h-screen overflow-hidden bg-[var(--bg-base)]">
      {/* Atmospheric background layers */}
      <div className="homepage-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />

      {/* Subtle vignette */}
      <div className="homepage-vignette absolute inset-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 pt-32">
          {/* Main title */}
          <h1 className="text-center animate-fade-in-up">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text-primary)]">
              The <span className="text-[var(--gold)]">RS</span> Guide
            </span>
          </h1>

          {/* Decorative ornament */}
          <div className="flex items-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--ornament)]" />
            <div className="w-2 h-2 rotate-45 border border-[var(--ornament)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--ornament)]" />
          </div>

          {/* Tagline */}
          <p className="text-center text-lg md:text-xl text-[var(--text-secondary)] max-w-md leading-relaxed mt-6">
            A no-fluff guide to RuneScape.
          </p>

          {/* Combat style cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12 w-full max-w-2xl">
            <Link href="/getting-started/melee" className="combat-card group">
              <Sword className="w-5 h-5 mb-3 combat-card-icon" />
              <span className="combat-card-label">Melee</span>
            </Link>

            <Link href="/getting-started/ranged" className="combat-card group">
              <Target className="w-5 h-5 mb-3 combat-card-icon" />
              <span className="combat-card-label">Ranged</span>
            </Link>

            <Link href="/getting-started/magic" className="combat-card group">
              <Wand2 className="w-5 h-5 mb-3 combat-card-icon" />
              <span className="combat-card-label">Magic</span>
            </Link>

            <Link href="/getting-started/necromancy" className="combat-card group">
              <Skull className="w-5 h-5 mb-3 combat-card-icon" />
              <span className="combat-card-label">Necromancy</span>
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/setup"
            className="mt-12 group inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
          >
            <span className="text-[var(--text-muted)] text-sm tracking-wide group-hover:text-[var(--text-secondary)]">
              Begin Your Journey
            </span>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-1 group-hover:text-[var(--text-secondary)]" />
          </Link>
        </section>

        {/* Documentation Cards Section */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--border-subtle)]" />
              <span className="text-[var(--text-muted)] text-xs tracking-[0.3em] uppercase">Documentation</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--border-subtle)]" />
            </div>

            {/* Doc cards grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/setup" className="doc-card group">
                <div className="doc-card-icon">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="doc-card-title">Setup</h3>
                <p className="doc-card-desc">Interface, keybinds, and essential settings</p>
                <span className="doc-card-link">
                  Explore <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link href="/getting-started" className="doc-card group">
                <div className="doc-card-icon">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="doc-card-title">Getting Started</h3>
                <p className="doc-card-desc">Combat fundamentals and skill basics</p>
                <span className="doc-card-link">
                  Explore <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link href="/guides" className="doc-card group">
                <div className="doc-card-icon">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="doc-card-title">Guides</h3>
                <p className="doc-card-desc">Quests, bosses, and progression paths</p>
                <span className="doc-card-link">
                  Explore <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-[var(--border-subtle)] px-6 py-8">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              Built by Griffin, Josh, Pup & Ryan
            </p>
            <p className="text-xs text-[var(--text-muted)] opacity-70">
              The RS Guide © 2025
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
