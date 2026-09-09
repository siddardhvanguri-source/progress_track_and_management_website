import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const leaveRequests = await prisma.leaveRequest.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ leaveRequests });
  } catch (error: any) {
    console.error('Fetch leave requests error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const leave = await prisma.leaveRequest.create({
      data: {
        userId: data.userId,
        type: data.type || 'ANNUAL',
        startDate: data.startDate,
        endDate: data.endDate,
        daysCount: data.daysCount || 1,
        reason: data.reason,
        status: data.status || 'APPROVED',
        reviewerName: data.reviewerName || 'Sarah Jenkins',
        handoverNotes: data.handoverNotes || '',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ leave }, { status: 201 });
  } catch (error: any) {
    console.error('Create leave error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, reviewerName } = await req.json();
    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status,
        reviewerName: reviewerName || 'Sarah Jenkins',
        reviewedAt: new Date(),
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ leave: updated });
  } catch (error: any) {
    console.error('Update leave error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
