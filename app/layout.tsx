import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task-Manager',
  description:
    'One-stop solution to help users organize, track, and manage tasks or activities efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
