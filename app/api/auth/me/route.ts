import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { ROLE_PERMISSIONS } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessionCookie = cookies().get('workpulse_session')?.value;

    if (!sessionCookie) {
      // Return default guest / fallback to admin for testing
      const defaultUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });
      if (defaultUser) {
        return NextResponse.json({
          user: defaultUser,
          permissions: ROLE_PERMISSIONS[defaultUser.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.EMPLOYEE,
          isLoggedIn: false,
        });
      }
      return NextResponse.json({ user: null, isLoggedIn: false });
    }

    const session = JSON.parse(sessionCookie);
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        monthlyLogs: {
          orderBy: { monthYear: 'desc' },
          take: 12,
        },
        tasks: {
          orderBy: { updatedAt: 'desc' },
          take: 5,
        },
        leaveRequests: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null, isLoggedIn: false });
    }

    const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.EMPLOYEE;

    return NextResponse.json({
      user,
      permissions,
      isLoggedIn: true,
    });
  } catch (error: any) {
    console.error('Auth me error:', error);
    return NextResponse.json({ user: null, isLoggedIn: false, error: error.message });
  }
}
