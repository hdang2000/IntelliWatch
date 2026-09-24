import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IntelliWatch — AI Competitor Intelligence',
  description:
    'AI-powered competitor and industry intelligence. Enter competitors, click Analyze, get a full intelligence report in minutes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0F172A] text-[#F8FAFC] antialiased">
        {children}
      </body>
    </html>
  );
}
