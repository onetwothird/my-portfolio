import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Visitor from '../../../models/Visitor';

export async function GET(req: NextRequest) {
  try {
    const authPass = req.nextUrl.searchParams.get('token');
    if (!authPass || authPass !== process.env.ADMIN_PASSPHRASE) {
      return NextResponse.json({ error: 'Unauthorized Access Token Missing' }, { status: 401 });
    }

    await dbConnect();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalCount,
      uniqueCount,
      todayCount,
      recentLogs,
      topCountries,
      browserStats,
      deviceStats,
      timelineStats
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.distinct('ipAddress').then((res: string[]) => res.length),
      Visitor.countDocuments({ timestamp: { $gte: startOfToday } }),
      Visitor.find().sort({ timestamp: -1 }).limit(10).lean(),
      
      Visitor.aggregate([
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),

      Visitor.aggregate([
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      Visitor.aggregate([
        { $group: { _id: '$deviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      Visitor.aggregate([
        {
          $match: {
            timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    return NextResponse.json({
      metrics: {
        totalVisitors: totalCount,
        uniqueVisitors: uniqueCount,
        todayVisitors: todayCount
      },
      recentLogs,
      topCountries,
      browserStats,
      deviceStats,
      timelineStats
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Data retrieval failure';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}