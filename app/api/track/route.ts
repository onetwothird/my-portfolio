import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Visitor from '../../../models/Visitor';
import { UAParser } from 'ua-parser-js';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { url, referrer } = await req.json();

    const userAgent = req.headers.get('user-agent') || '';
    
    let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }

    let country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    let region = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    let city = req.headers.get('x-vercel-ip-city') || 'Unknown';

    if ((ip === '127.0.0.1' || ip === '::1' || country === 'Unknown') && process.env.NODE_ENV === 'development') {
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          ip = geoData.ip || ip;
          country = geoData.country_name || 'Unknown';
          region = geoData.region || 'Unknown';
          city = geoData.city || 'Unknown';
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        console.warn('Geo API fallback skipped or failed.');
      }
    }

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const existingRecentLog = await Visitor.findOne({
      ipAddress: ip,
      url: url,
      timestamp: { $gte: thirtyMinutesAgo },
    });

    if (existingRecentLog) {
      return NextResponse.json({ status: 'ignored', message: 'Deduplicated log entry within 30m frame.' }, { status: 200 });
    }

    const parser = new UAParser(userAgent);
    const browserName = parser.getBrowser().name || 'Unknown';
    const osName = parser.getOS().name || 'Unknown';
    
    let deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Unknown' = 'Desktop';
    const rawDevice = parser.getDevice().type;
    if (rawDevice === 'mobile') deviceType = 'Mobile';
    else if (rawDevice === 'tablet') deviceType = 'Tablet';
    else if (!rawDevice) deviceType = 'Desktop';
    else deviceType = 'Unknown';

    await Visitor.create({
      ipAddress: ip,
      country,
      region,
      city,
      browser: browserName,
      os: osName,
      deviceType,
      referrer: referrer || 'Direct',
      url,
      timestamp: new Date(),
    });

    return NextResponse.json({ status: 'success' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Logging Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Failure';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}