'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteContent, FAQItem, PricingTier } from '@/lib/get-content';

interface LivePreviewContextType {
  siteContent: SiteContent;
  faqItems: FAQItem[];
  pricingTiers: PricingTier[];
}

const LivePreviewContext = createContext<LivePreviewContextType | null>(null);

export function useLivePreview() {
  const context = useContext(LivePreviewContext);
  if (!context) {
    throw new Error('useLivePreview must be used within a LivePreviewProvider');
  }
  return context;
}

export function LivePreviewProvider({
  initialContent,
  initialFaqItems,
  initialPricingTiers,
  children,
}: {
  initialContent: SiteContent;
  initialFaqItems: FAQItem[];
  initialPricingTiers: PricingTier[];
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqItems);
  const [pricing, setPricing] = useState<PricingTier[]>(initialPricingTiers);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'LIVE_PREVIEW_UPDATE') {
        const { section, fieldKey, value, contentType } = e.data;
        
        if (contentType === 'json') {
          try {
            const parsed = JSON.parse(value);
            if (section === 'faqItems') {
              setFaqs(parsed);
              return;
            }
            if (section === 'pricingTiers') {
              setPricing(parsed);
              return;
            }
            // other JSON (like problem.cards or testimonials.items)
            setContent((prev) => {
              const next = { ...prev };
              const s = section as keyof SiteContent;
              if (next[s] && typeof next[s] === 'object') {
                (next[s] as Record<string, unknown>)[fieldKey] = parsed;
              }
              return next;
            });
          } catch (err) {
            console.error('Live Preview JSON parse error', err);
          }
        } else {
          // Text update
          setContent((prev) => {
            const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
            
            if (section === 'footer_contact') {
              if (next.footer?.contact) {
                (next.footer.contact as Record<string, unknown>)[fieldKey] = value;
              }
              return next;
            }
            if (section === 'footer_social') {
              if (next.footer?.social) {
                (next.footer.social as Record<string, unknown>)[fieldKey] = value;
              }
              return next;
            }
            if (section.startsWith('services_item_')) {
              const idx = parseInt(section.replace('services_item_', ''), 10);
              if (!isNaN(idx) && next.services?.items?.[idx]) {
                (next.services.items[idx] as Record<string, unknown>)[fieldKey] = value;
              }
              return next;
            }
          
            const s = section as keyof SiteContent;
            const sectionObj = next[s];
            if (sectionObj && typeof sectionObj === 'object') {
              (sectionObj as Record<string, unknown>)[fieldKey] = value;
            }
            return next;
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <LivePreviewContext.Provider value={{ siteContent: content, faqItems: faqs, pricingTiers: pricing }}>
      {children}
    </LivePreviewContext.Provider>
  );
}
