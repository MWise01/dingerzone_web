import type { ReactNode } from 'react';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('Getting Started with Swing Analysis', 'Learn how to record and upload baseball swings, review DingerZone feedback, and share clips with your team.', '/getting-started');

export default function PublicLayout({ children }: { children: ReactNode }) { return children; }
