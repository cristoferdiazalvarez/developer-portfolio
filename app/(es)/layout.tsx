import { Document } from '@/components/document';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('es');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document locale="es">{children}</Document>;
}
