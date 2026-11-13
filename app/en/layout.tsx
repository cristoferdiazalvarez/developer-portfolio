import { Document } from '@/components/document';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('en');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
