import { NextRequest } from 'next/server';
import { proxyJsonPost } from '../backend';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyJsonPost('/get-shared-video-details', body);
}
