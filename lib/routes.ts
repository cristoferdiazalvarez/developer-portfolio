export function alternatePath(pathname: string) {
  if (pathname.startsWith('/en/projects/')) return pathname.replace('/en/projects/', '/proyectos/');
  if (pathname.startsWith('/proyectos/')) return pathname.replace('/proyectos/', '/en/projects/');
  return pathname === '/en' || pathname.startsWith('/en/') ? '/' : '/en';
}
