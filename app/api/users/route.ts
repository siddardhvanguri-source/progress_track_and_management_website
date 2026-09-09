import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department');
    const role = searchParams.get('role');

    const where: any = {};
    if (department) where.departmentName = department;
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      include: {
        monthlyLogs: {
          orderBy: { monthYear: 'desc' },
          take: 6,
        },
        tasks: true,
        leaveRequests: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password || 'password123',
        role: data.role || 'EMPLOYEE',
        jobTitle: data.jobTitle,
        departmentName: data.departmentName,
        phone: data.phone || '',
        bio: data.bio || '',
        skills: typeof data.skills === 'string' ? data.skills : JSON.stringify(data.skills || []),
        emergencyContact: data.emergencyContact || '',
        joinedDate: data.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        workPreference: data.workPreference || 'Remote',
        status: 'WORKING',
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
