'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
const Logout = () => {
  return (
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
  );
};

export default Logout;
