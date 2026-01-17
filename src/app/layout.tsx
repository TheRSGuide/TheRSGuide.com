import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { PlayerDataProvider } from '@/mdx_components/components/player-data-context';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thersguide.com'),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>
          <PlayerDataProvider>
            {children}
          </PlayerDataProvider>
        </RootProvider>
      </body>
    </html>
  );
}
