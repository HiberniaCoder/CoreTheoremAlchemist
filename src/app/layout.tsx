import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/server';
import { AuthenticatedLayout } from './layout-authenticated';

export const metadata: Metadata = {
  title: 'ClarityBoard',
  description: 'AI-Powered KPI Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        {user ? (
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        ) : (
          <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            {children}
          </main>
        )}
        <Toaster />
      </body>
    </html>
  );
}
