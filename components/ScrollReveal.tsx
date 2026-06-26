'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Fades/rises panels in as they scroll into view. Only animates elements that start
 * below the fold, so above-the-fold content never flashes. Respects reduced-motion.
 * Mounted once per section layout; re-runs on route change.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.panel'));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('revealed');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      els.forEach((el) => {
        // Leave already-visible panels untouched; only animate ones below the fold.
        if (el.getBoundingClientRect().top < window.innerHeight - 40) return;
        el.classList.add('reveal');
        io.observe(el);
      });
      // Store for cleanup
      (window as unknown as { __sr?: IntersectionObserver }).__sr = io;
    }, 60);

    return () => {
      clearTimeout(timer);
      (window as unknown as { __sr?: IntersectionObserver }).__sr?.disconnect();
    };
  }, [pathname]);

  return null;
}
