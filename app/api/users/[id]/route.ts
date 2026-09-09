import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        monthlyLogs: {
          orderBy: { monthYear: 'desc' },
        },
        tasks: {
          include: { project: true },
          orderBy: { updatedAt: 'desc' },
        },
        leaveRequests: {
          orderBy: { startDate: 'desc' },
        },
        checkIns: {
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Fetch user detail error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.bio !== undefined) updatePayload.bio = data.bio;
    if (data.phone !== undefined) updatePayload.phone = data.phone;
    if (data.skills !== undefined) {
      updatePayload.skills = typeof data.skills === 'string' ? data.skills : JSON.stringify(data.skills);
    }
    if (data.emergencyContact !== undefined) updatePayload.emergencyContact = data.emergencyContact;
    if (data.workPreference !== undefined) updatePayload.workPreference = data.workPreference;
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.jobTitle !== undefined) updatePayload.jobTitle = data.jobTitle;
    if (data.departmentName !== undefined) updatePayload.departmentName = data.departmentName;
    if (data.avatarUrl !== undefined) updatePayload.avatarUrl = data.avatarUrl;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updatePayload,
      include: {
        monthlyLogs: {
          orderBy: { monthYear: 'desc' },
        },
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    console.error('Update user detail error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
