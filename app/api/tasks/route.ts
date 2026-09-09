import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assigneeId = searchParams.get('assigneeId');
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');

    const where: any = {};
    if (assigneeId) where.assigneeId = assigneeId;
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignee: true,
        project: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Fetch tasks error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || '',
        status: data.status || 'IN_PROGRESS',
        priority: data.priority || 'MEDIUM',
        type: data.type || 'Feature',
        progress: data.progress || 0,
        timeline: data.timeline || 'Current Sprint',
        groupName: data.groupName || 'General Tasks',
        assigneeId: data.assigneeId || null,
        projectId: data.projectId || null,
      },
      include: {
        assignee: true,
        project: true,
      },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
