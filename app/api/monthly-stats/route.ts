import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const monthYear = searchParams.get('monthYear');

    const where: any = {};
    if (userId) where.userId = userId;
    if (monthYear) where.monthYear = monthYear;

    const monthlyLogs = await prisma.monthlyLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
            jobTitle: true,
            departmentName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { monthYear: 'desc' },
    });

    // Calculate aggregated team metrics for the month
    const totalHours = monthlyLogs.reduce((acc, log) => acc + log.hoursWorked, 0);
    const totalLeaves = monthlyLogs.reduce((acc, log) => acc + log.leavesTaken, 0);
    const totalTasks = monthlyLogs.reduce((acc, log) => acc + log.tasksCompleted, 0);
    const avgPunctuality = monthlyLogs.length
      ? Math.round((monthlyLogs.reduce((acc, log) => acc + log.punctualityRate, 0) / monthlyLogs.length) * 10) / 10
      : 100;
    const avgRating = monthlyLogs.length
      ? Math.round((monthlyLogs.reduce((acc, log) => acc + log.managerRating, 0) / monthlyLogs.length) * 10) / 10
      : 5.0;

    return NextResponse.json({
      monthlyLogs,
      summary: {
        totalEmployees: monthlyLogs.length,
        totalHours,
        totalLeaves,
        totalTasks,
        avgPunctuality,
        avgRating,
      },
    });
  } catch (error: any) {
    console.error('Fetch monthly stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
