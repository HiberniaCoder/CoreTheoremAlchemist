import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/server';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/layout/app-header';

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
  const { data: { session }} = await supabase.auth.getSession();
  
  const isLoggedIn = !!session;

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        {isLoggedIn ? (
          <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                <main className="flex-1 bg-background p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </SidebarInset>
          </SidebarProvider>
        ) : (
          <main>{children}</main>
        )}
        <Toaster />
      </body>
    </html>
  );
}
