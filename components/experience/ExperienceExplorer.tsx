'use client';

import { useMemo, useState } from 'react';
import Timeline from '@/components/experience/Timeline';
import type { Company } from '@/lib/experience';

/** Interactive wrapper: tag-based filtering over the career timeline. */
export default function ExperienceExplorer({
  companies,
  tags,
}: {
  companies: Company[];
  tags: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active ? companies.filter((c) => c.portfolio_tags.includes(active)) : companies),
    [active, companies]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive(null)}
          className={`chip transition-colors ${
            active === null
              ? 'bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20'
              : 'bg-surface text-text-soft ring-1 ring-inset ring-border hover:text-white'
          }`}
        >
          All roles
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t === active ? null : t)}
            className={`chip transition-colors ${
              active === t
                ? 'bg-brand/15 text-brand-soft ring-1 ring-inset ring-brand/20'
                : 'bg-surface text-text-soft ring-1 ring-inset ring-border hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <Timeline companies={filtered} />
      </div>
    </div>
  );
}
