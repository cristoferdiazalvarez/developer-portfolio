import { ImageResponse } from 'next/og';
export const alt = 'Cristofer Díaz Álvarez — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#111310',
        color: '#eeeee5',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 75px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 3 }}
      >
        <span>CRISTOFER DÍAZ ÁLVAREZ</span>
        <span style={{ color: '#d2ef9a' }}>TENERIFE / ES</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 108,
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        <span>Full Stack</span>
        <span style={{ color: '#d2ef9a' }}>Developer.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 21,
          borderTop: '1px solid #41473a',
          paddingTop: 24,
        }}
      >
        <span>Next.js · TypeScript · PostgreSQL</span>
        <span>BusinessOS / Atelier Commerce</span>
      </div>
    </div>,
    { ...size },
  );
}
