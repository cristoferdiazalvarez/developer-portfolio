import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/projects';
import { CaseStudy } from '@/components/case-study';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata('es', project);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <CaseStudy project={project} locale="es" />;
}
