'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Task Manager</CardTitle>
          <CardDescription>
            One-stop solution to help users organize, track, and manage tasks or
            activities efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-4">
              {!isLogin && (
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  autoComplete="name"
                />
              )}
              <Input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="email"
              />
              <Input
                autoComplete="current-password"
                type="password"
                id="password"
                placeholder="Password"
              />
              <Button className="text-xl">
                {!isLogin ? 'Sign up' : 'Login'}
              </Button>
              <Label className="text-center">
                {isLogin
                  ? "Don't have an account "
                  : 'Already have an account? '}
                <Link
                  onClick={() => setIsLogin(!isLogin)}
                  className="underline"
                  href="/">
                  {isLogin ? 'Sign up' : 'Login'}
                </Link>
              </Label>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
