'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const name = fd.get('name') || '';
    const email = fd.get('email');
    const password = fd.get('password');
    console.log({ name, email, password });
    if (isLogin) {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
      });
      console.log(result);
    } else {
      try {
        const response = await axios.post('/api/register', {
          name,
          email,
          password,
        });
        if (response.status === 200) {
          setIsLogin(true);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Login.tsx Error', error);
      }
    }
    setSubmitting(false);
  }
  return (
    <div className="text-center">
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
                  required={!isLogin}
                />
              )}
              <Input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="email"
                name="email"
                required
              />
              <Input
                autoComplete="current-password"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                required
              />
              <Button disabled={isSubmitting} type="submit" className="text-xl">
                {!isLogin ? 'Sign up' : 'Login'}
              </Button>
              <Label className="text-center">
                {isLogin
                  ? "Don't have an account "
                  : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="hover:underline">
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </Label>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
