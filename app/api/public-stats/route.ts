import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Visitor from '../../../models/Visitor';

// Revalidate every 5 seconds for near real-time data
export const revalidate = 5; 

export async function GET() {
  try {
    await dbConnect();
    
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const [totalUnique, activeNow] = await Promise.all([
      Visitor.distinct('ipAddress').then((res: string[]) => res.length),
      Visitor.distinct('ipAddress', { timestamp: { $gte: fiveMinutesAgo } }).then((res: string[]) => res.length)
    ]);
    
    const displayActive = Math.max(activeNow, 1);

    return NextResponse.json({ 
      totalUnique,
      activeNow: displayActive
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch public stats:', error);
    return NextResponse.json({ totalUnique: 0, activeNow: 1 }, { status: 500 });
  }
}