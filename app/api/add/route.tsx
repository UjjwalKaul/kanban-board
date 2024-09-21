import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status, priority, dueDate, userMail } = body;

    // Validate required fields
    if (!title || !status || !priority || !dueDate || !userMail) {
      return new NextResponse('Missing Add Task Values', { status: 400 });
    }

    // Create the task using userEmail instead of userId
    const addTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
        userEmail: userMail,
      },
    });

    return NextResponse.json(addTask);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
}
