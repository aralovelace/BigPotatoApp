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
            <main className="flex flex-col py-12 px-4 gap-6 sm:py-16 sm:px-8 sm:gap-8 w-full max-w-2xl">
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  src="/images/logo.png"
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
