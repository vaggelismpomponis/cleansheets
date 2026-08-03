import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { siteContent } from '@/lib/content';
import { faqItems, pricingTiers, type FAQItem, type PricingTier } from '@/lib/constants';

export type SiteContent = typeof siteContent;
export type { FAQItem, PricingTier };

export interface ContentBundle {
  siteContent: SiteContent;
  faqItems: FAQItem[];
  pricingTiers: PricingTier[];
}

/**
 * Fetch all CMS content from Supabase and merge with static defaults.
 * If a field exists in Supabase, it overrides the static default.
 * If Supabase is unavailable or a field hasn't been edited, the static default is used.
 */
export async function getContent(): Promise<ContentBundle> {
  // Deep clone the static defaults so we can mutate safely
  const content: SiteContent = JSON.parse(JSON.stringify(siteContent));
  const faqs: FAQItem[] = JSON.parse(JSON.stringify(faqItems));
  const pricing: PricingTier[] = JSON.parse(JSON.stringify(pricingTiers));

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_content')
      .select('section, content_key, content_value, content_type');

    if (error || !data) return { siteContent: content, faqItems: faqs, pricingTiers: pricing };

    for (const row of data) {
      try {
        if (row.content_type === 'json') {
          const parsed = JSON.parse(row.content_value);
          applyJson(content, faqs, pricing, row.section, row.content_key, parsed);
        } else {
          applyText(content, row.section, row.content_key, row.content_value);
        }
      } catch {
        // Skip malformed rows
      }
    }
  } catch {
    // Supabase unavailable — return static defaults
  }

  return { siteContent: content, faqItems: faqs, pricingTiers: pricing };
}

// Apply a simple text override to a nested content key
function applyText(content: SiteContent, section: string, key: string, value: string) {
  if (section === 'footer_contact') {
    if (content.footer?.contact && key in content.footer.contact) {
      (content.footer.contact as Record<string, unknown>)[key] = value;
    }
    return;
  }
  if (section === 'footer_social') {
    if (content.footer?.social && key in content.footer.social) {
      (content.footer.social as Record<string, unknown>)[key] = value;
    }
    return;
  }
  if (section.startsWith('services_item_')) {
    const idx = parseInt(section.replace('services_item_', ''), 10);
    if (!isNaN(idx) && content.services?.items?.[idx] && key in content.services.items[idx]) {
      (content.services.items[idx] as Record<string, unknown>)[key] = value;
    }
    return;
  }

  const s = section as keyof SiteContent;
  const sectionObj = content[s];
  if (sectionObj && typeof sectionObj === 'object' && key in sectionObj) {
    (sectionObj as Record<string, unknown>)[key] = value;
  }
}

// Apply a JSON override (for arrays like faqItems, pricingTiers, etc.)
function applyJson(
  content: SiteContent,
  faqs: FAQItem[],
  pricing: PricingTier[],
  section: string,
  key: string,
  value: unknown
) {
  if (section === 'faqItems' && key === 'items' && Array.isArray(value)) {
    faqs.splice(0, faqs.length, ...(value as FAQItem[]));
    return;
  }
  if (section === 'pricingTiers' && key === 'items' && Array.isArray(value)) {
    pricing.splice(0, pricing.length, ...(value as PricingTier[]));
    return;
  }
  const s = section as keyof SiteContent;
  const sectionObj = content[s];
  if (sectionObj && typeof sectionObj === 'object' && key in sectionObj) {
    (sectionObj as Record<string, unknown>)[key] = value;
  }
}
