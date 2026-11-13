'use client';
import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const reduced = useReducedMotion();
  return (
    <m.div
      className="reading-progress"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  );
}
export function HoverFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}
