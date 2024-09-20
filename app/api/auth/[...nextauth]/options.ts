import { prisma } from '@/lib/db';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword as string
        );
        if (!isPasswordValid) {
          return null;
        }
        return user;
      },
    }),
  ],
};
