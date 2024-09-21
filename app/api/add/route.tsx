import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, status, priority, dueDate, userEmail } = body;

  // Validate the required fields
  if (
    !title ||
    !description ||
    !status ||
    !priority ||
    !dueDate ||
    !userEmail
  ) {
    return new NextResponse('Missing Add Task Values', { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  // Create the new task associated with the user
  const addTask = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      user: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json({ task: addTask });
}
