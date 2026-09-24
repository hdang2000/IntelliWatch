import type { WikiSnapshot } from '../types';
import { getJSON } from '../http';

interface Summary {
  type: string;
  title: string;
  description?: string;
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
}

const BUSINESS_HINT =
  /software|company|app|application|platform|service|product|developer|corporation|startup|tool|website|brand|business|manufacturer|provider|subsidiary/i;

async function summary(title: string): Promise<Summary | null> {
  const s = await getJSON<Summary>(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
  );
  return s && s.type === 'standard' ? s : null;
}

function toSnapshot(s: Summary): WikiSnapshot {
  return {
    title: s.title,
    description: s.description ?? '',
    extract: s.extract ?? '',
    url: s.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(s.title)}`,
  };
}

// Plain names like "Asana" or "Linear" resolve to non-business articles, so prefer disambiguated titles.
export async function fetchWikipedia(company: string, industry: string): Promise<WikiSnapshot | null> {
  const direct = await Promise.all(
    [`${company} (software)`, `${company} (company)`, `${company} (app)`, company].map(summary),
  );
  const relevant = direct.find((s) => s && BUSINESS_HINT.test(`${s.description} ${s.extract?.slice(0, 200)}`));
  if (relevant) return toSnapshot(relevant);

  const search = await getJSON<{ query?: { search?: { title: string }[] } }>(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=5&srsearch=${encodeURIComponent(
      `${company} ${industry} company`,
    )}`,
  );
  for (const hit of search?.query?.search ?? []) {
    if (!hit.title.toLowerCase().includes(company.toLowerCase())) continue;
    const s = await summary(hit.title);
    if (s && BUSINESS_HINT.test(`${s.description} ${s.extract?.slice(0, 200)}`)) return toSnapshot(s);
  }
  return null;
}
