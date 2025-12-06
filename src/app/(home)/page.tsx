import Link from 'next/link';
import { BookOpen, Sword, Settings, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-32 min-h-screen">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          The {" "}
          <span className="text-red-500">
            RS {" "}
          </span>
          Guide
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-fd-muted-foreground sm:text-xl">
          Your comprehensive guide to getting started in RuneScape
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/setup"
            className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Get Started
          </Link>
          <Link
            href="/getting-started/combat-basics"
            className="inline-flex items-center rounded-lg border border-fd-border px-6 py-3 font-semibold transition-colors hover:bg-fd-accent"
          >
            Learn Combat
          </Link>
        </div>
      </section>


      {/* Quick Links Section */}
      <section className="border-t border-fd-border bg-fd-muted/30 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Popular Topics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/docs/setup/action-bar"
              className="rounded-lg border border-fd-border bg-fd-card p-4 transition-all hover:border-fd-primary hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold">Action Bar Setup</h3>
              <p className="text-sm text-fd-muted-foreground">
                Configure your abilities and understand the interface
              </p>
            </Link>
            <Link
              href="/docs/getting-started/keybinds"
              className="rounded-lg border border-fd-border bg-fd-card p-4 transition-all hover:border-fd-primary hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold">Keybinds</h3>
              <p className="text-sm text-fd-muted-foreground">
                Optimize your keyboard layout for efficient combat
              </p>
            </Link>
            <Link
              href="/docs/guides/early-game"
              className="rounded-lg border border-fd-border bg-fd-card p-4 transition-all hover:border-fd-primary hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold">Early Game Quests</h3>
              <p className="text-sm text-fd-muted-foreground">
                Essential quests to complete for account progression
              </p>
            </Link>
            <Link
              href="/docs/getting-started/prayers-curses"
              className="rounded-lg border border-fd-border bg-fd-card p-4 transition-all hover:border-fd-primary hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold">Prayers & Curses</h3>
              <p className="text-sm text-fd-muted-foreground">
                Master the prayer system for combat advantages
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-fd-border bg-fd-muted/20 px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-fd-muted-foreground" />
          <h2 className="mb-4 text-3xl font-bold">Ready to Begin Your Journey?</h2>
          <p className="mb-8 text-lg text-fd-muted-foreground">
            Start with the setup guide to configure your client, then dive into combat basics to master the fundamentals.
          </p>
          <Link
            href="/docs/setup"
            className="inline-flex items-center rounded-lg bg-fd-primary px-8 py-4 text-lg font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Start Your Adventure
          </Link>
          <p className="mt-6 text-sm text-fd-muted-foreground">
            Created by The RS Guide Team (Griffin, Josh, Pup & Ryan)
          </p>
        </div>
      </section>
    </main>
  );
}
