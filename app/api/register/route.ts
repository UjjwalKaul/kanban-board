import { hash } from 'bcrypt';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return new NextResponse('Missing name, email or password', { status: 400 });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (exist) {
    return new NextResponse('User already exists', { status: 400 });
  }
  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPassword,
    },
  });
  return NextResponse.json(user);
}
