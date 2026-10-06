import type { ReactNode } from 'react';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('Terms of Service', 'Read the terms for using the DingerZone app and website.', '/terms');

export default function PublicLayout({ children }: { children: ReactNode }) { return children; }
