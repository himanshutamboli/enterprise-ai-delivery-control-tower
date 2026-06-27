/** Shared line-icon set (24×24, currentColor stroke) used in nav, sidebar, and module cards. */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#brandGrad)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Brand mark — hexagon core (matches the favicon). */
export function LogoIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2.5 L20.5 7 V17 L12 21.5 L3.5 17 V7 Z" />
      <circle cx="12" cy="12" r="2.4" fill="url(#brandGrad)" stroke="none" />
    </Base>
  );
}

/** Executive — dashboard layout. */
export function ExecutiveIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </Base>
  );
}

/** AI Observability — activity / signal pulse. */
export function ObservabilityIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12h3.5l2.5 7 4-15 2.5 8H21" />
    </Base>
  );
}

/** QA Governance — shield + check. */
export function QaIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5.5c0 4.2-3 7.4-7 8.5-4-1.1-7-4.3-7-8.5V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </Base>
  );
}

/** DevOps / DORA — continuous delivery cycle. */
export function DevOpsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.5 12a8.5 8.5 0 0 1-14.4 6.1" />
      <path d="M3.5 12a8.5 8.5 0 0 1 14.4-6.1" />
      <path d="M18 2.5v3.5h-3.5" />
      <path d="M6 21.5V18h3.5" />
    </Base>
  );
}

/** Program Health — target / focus. */
export function ProgramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.3" fill="url(#brandGrad)" stroke="none" />
    </Base>
  );
}

/** Experience — briefcase. */
export function ExperienceIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
      <path d="M3 12.5h18" />
    </Base>
  );
}

/** Case Studies — document. */
export function CaseStudiesIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </Base>
  );
}

/** System Design — node hierarchy. */
export function SystemDesignIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v3.5" />
      <path d="M6 16v-2.5h12V16" />
    </Base>
  );
}

/** Home. */
export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V9.5" />
    </Base>
  );
}
