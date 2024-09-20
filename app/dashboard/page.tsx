'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Button
        onClick={async () => {
          try {
            await signOut({ callbackUrl: '/' });
          } catch (error) {
            console.error('Failed to sign out:', error);
          }
        }}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
