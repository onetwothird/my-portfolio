import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Visitor from '../../../models/Visitor';

export const revalidate = 60; // Cache the response for 60 seconds to prevent database spam

export async function GET() {
  try {
    await dbConnect();
    
    // Get the total number of unique visitors based on IP
    const uniqueCount = await Visitor.distinct('ipAddress').then((res: string[]) => res.length);
    
    return NextResponse.json({ count: uniqueCount }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch public stats:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}