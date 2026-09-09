import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { INITIAL_USERS } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const { email, password, userId } = await req.json();

    let user: any = null;

    try {
      if (userId) {
        user = await prisma.user.findUnique({
          where: { id: userId },
        });
      } else if (email) {
        user = await prisma.user.findUnique({
          where: { email: email.trim().toLowerCase() },
        });
        if (user && user.password && user.password !== password) {
          return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
          );
        }
      }
    } catch (dbErr) {
      console.warn('Prisma query failed, falling back to mock users:', dbErr);
    }

    // Fallback to INITIAL_USERS if not in DB or DB error
    if (!user) {
      if (userId) {
        user = INITIAL_USERS.find(
          (u) =>
            u.id === userId ||
            (userId === 'user-admin' && u.id === 'usr-1') ||
            (userId === 'user-manager' && u.id === 'usr-2') ||
            (userId === 'user-employee' && u.id === 'usr-3')
        );
      } else if (email) {
        const cleanEmail = email.trim().toLowerCase();
        user = INITIAL_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
      }
    }

    if (!user) {
      // Default to Director Siddhardh for smooth demo access if credentials provided
      user = INITIAL_USERS[0];
    }

    // Set auth cookie
    const sessionData = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentName: user.departmentName,
      jobTitle: user.jobTitle,
      avatarUrl: user.avatarUrl,
    };

    cookies().set('workpulse_session', JSON.stringify(sessionData), {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });

    return NextResponse.json({
      success: true,
      user: sessionData,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
