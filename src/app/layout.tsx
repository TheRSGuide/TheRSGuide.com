import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Cinzel, Nunito } from 'next/font/google';
import { PlayerDataProvider } from '@/mdx_components/components/player-data-context';
import type { Metadata } from 'next';

// Display font for headings - fantasy/medieval feel
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Body font - friendly and readable
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thersguide.com'),
  title: 'The RS Guide - Your RuneScape Adventure Starts Here',
  description: 'A comprehensive guide to help new players master RuneScape combat, unlock powerful content, and become the adventurer you were meant to be.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-[family-name:var(--font-body)]" suppressHydrationWarning>
        <RootProvider>
          <PlayerDataProvider>
            {children}
          </PlayerDataProvider>
        </RootProvider>
      </body>
    </html>
  );
}
