import { statusTone, toneClasses } from '@/lib/format';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

/** Color-coded pill for any status string (healthy/degraded/critical/pass/at_risk/...). */
export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const tone = statusTone(status);
  const text = label ?? status.replace(/_/g, ' ');
  return (
    <span className={`chip capitalize ${toneClasses[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {text}
    </span>
  );
}
