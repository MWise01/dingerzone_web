import type { ReactNode } from 'react';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('Try Baseball Swing Analysis', 'Upload a baseball swing video to try DingerZone AI analysis. See recording tips and review your feedback.', '/try');

export default function PublicLayout({ children }: { children: ReactNode }) { return children; }
