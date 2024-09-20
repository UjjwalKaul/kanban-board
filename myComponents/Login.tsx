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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const name = fd.get('name') || '';
    const email = fd.get('email');
    const password = fd.get('password');
    console.log({ name, email, password });
  }
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              {!isLogin && (
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  autoComplete="name"
                  name="name"
                />
              )}
              <Input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="email"
                name="email"
              />
              <Input
                autoComplete="current-password"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
              />
              <Button type="submit" className="text-xl">
                {!isLogin ? 'Sign up' : 'Login'}
              </Button>
              <Label className="text-center">
                {isLogin
                  ? "Don't have an account "
                  : 'Already have an account? '}
                <Link
                  onClick={() => setIsLogin(!isLogin)}
                  className="hover:underline"
                  href="#">
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
