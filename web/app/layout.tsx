import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Big Potato Companion App',
  description: 'Scan your Big Potato game box to unlock rules, timers, and expansion content.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFD700] text-black">
        <Providers>
          <div className="flex flex-col flex-1 items-center">
            <main className="flex flex-1 w-full max-w-3xl flex-col py-8 px-4 gap-6 sm:py-16 sm:px-8 sm:gap-8">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://bigpotato.co.uk/cdn/shop/files/logo_538dd2fc-091e-47dd-a078-cc4a7ce23c62.png?v=1747324418&width=420"
                  alt="Big Potato"
                  className="h-8 w-auto sm:h-10"
                />
                <h1 className="text-xl sm:text-2xl">Companion App</h1>
              </div>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
