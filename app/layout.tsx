import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

export const metadata: Metadata = {
  title: 'Task-Manager',
  description:
    'One-stop solution to help users organize, track, and manage tasks or activities efficiently',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
