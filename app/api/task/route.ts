import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check if session exists
  if (!session || !session.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse('Fetch tasks for given user failed', {
        status: 400,
      });
    }

    // Fetch tasks for the given user
    const tasks = await prisma.task.findMany({
      where: {
        userEmail: user.email as string,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
}
