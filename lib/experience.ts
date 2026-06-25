/** Types + accessors for the resume-driven Career Experience Explorer.
 *  Source of truth: data/resume.json (official resume facts). */
import raw from '@/data/resume.json';

export interface Metric {
  value: string;
  impact: string;
}

export interface Initiative {
  name: string;
  description: string;
  my_role: string;
  technologies: string[];
  outcomes: string[];
}

export interface TechnicalEnvironment {
  cloud: string[];
  data: string[];
  ai: string[];
  tools: string[];
}

export interface Company {
  slug: string;
  company: string;
  location: string;
  period: string;
  /** Numeric YYYYMM start, used only for timeline ordering. */
  start: number;
  role: string;
  employment_type: string;
  industry: string;
  theme: string;
  summary: string;
  business_context: string[];
  key_challenges: string[];
  initiatives: Initiative[];
  responsibilities: string[];
  technical_environment: TechnicalEnvironment;
  delivery_practices: string[];
  metrics: Metric[];
  achievements: string[];
  portfolio_tags: string[];
  /** Mermaid architecture / process-flow definition. */
  process_flow: string;
}

/** Companies sorted most-recent first for the timeline. */
export const companies: Company[] = [...(raw.companies as Company[])].sort((a, b) => b.start - a.start);

/** All unique portfolio tags across companies (for search / filtering). */
export const allTags: string[] = Array.from(
  new Set(companies.flatMap((c) => c.portfolio_tags))
).sort();

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

/** Flatten a company's technical environment into a single labeled list. */
export function flattenTech(env: TechnicalEnvironment): { group: string; items: string[] }[] {
  return (
    [
      { group: 'Cloud', items: env.cloud },
      { group: 'Data', items: env.data },
      { group: 'AI / ML', items: env.ai },
      { group: 'Tools', items: env.tools },
    ] as const
  ).filter((g) => g.items.length > 0);
}
