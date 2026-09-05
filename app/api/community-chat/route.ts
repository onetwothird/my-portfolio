import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CommunityMessage from '../../../models/CommunityMessage';

const MAX_NICKNAME_LENGTH = 24;
const MAX_MESSAGE_LENGTH = 280;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await CommunityMessage.find()
      .sort({ createdAt: -1 })
      .limit(40)
      .lean();

    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Failed to fetch community messages:', error);
    return NextResponse.json({ error: 'Community chat is temporarily unavailable.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const nickname = cleanText(body.nickname, MAX_NICKNAME_LENGTH);
    const content = cleanText(body.content, MAX_MESSAGE_LENGTH);

    if (!nickname || !content) {
      return NextResponse.json({ error: 'Nickname and message are required.' }, { status: 400 });
    }

    await dbConnect();
    const message = await CommunityMessage.create({ nickname, content });

    return NextResponse.json(
      {
        message: {
          id: message._id.toString(),
          nickname: message.nickname,
          content: message.content,
          createdAt: message.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create community message:', error);
    return NextResponse.json({ error: 'Community chat is temporarily unavailable.' }, { status: 500 });
  }
}
