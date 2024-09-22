import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status, priority, dueDate, userMail } = body;

    if (!title || !status || !priority || !dueDate || !userMail) {
      return new NextResponse('Missing Add Task Values', { status: 400 });
    }

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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');
    const userEmail = url.searchParams.get('userEmail');

    if (!taskId || !userEmail) {
      return new NextResponse('Missing taskId or userEmail in query', {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return new NextResponse(
        "This user does not exist and hence can't delete tasks",
        { status: 400 }
      );
    }

    const response = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
}
