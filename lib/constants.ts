// ============================================
// Ephtopia Cleans — Structured Data Constants
// Pricing tiers, FAQ items, testimonials config
// ============================================

export interface PricingTier {
  name: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  priceSuffix: string;
  properties: string;
  features: { text: string; included: boolean }[];
  cta: string;
  highlighted: boolean;
  badge?: string;
  ghost?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Μόνο καθαρισμός, χωρίς subscription",
    priceMonthly: "€35",
    priceYearly: "€35",
    priceSuffix: "/καθαρισμό",
    properties: "1 ακίνητο",
    features: [
      { text: "Επαγγελματικός καθαρισμός", included: true },
      { text: "Αλλαγή σεντονιών & πετσετών", included: true },
      { text: "Κράτηση on-demand", included: true },
      { text: "Φωτογραφική τεκμηρίωση", included: false },
      { text: "Calendar sync", included: false },
      { text: "Priority SLA 2 ωρών", included: false },
    ],
    cta: "Ξεκινήστε",
    highlighted: false,
  },
  {
    name: "Essential",
    description: "Καθαρισμός + φωτογράφηση + βασική κάλυψη",
    priceMonthly: "€79",
    priceYearly: "€63",
    priceSuffix: "/μήνα",
    properties: "1 ακίνητο",
    features: [
      { text: "Επαγγελματικός καθαρισμός", included: true },
      { text: "Αλλαγή σεντονιών & πετσετών", included: true },
      { text: "Κράτηση on-demand", included: true },
      { text: "Φωτογραφική τεκμηρίωση πριν/μετά", included: true },
      { text: "Calendar sync", included: false },
      { text: "Priority SLA 2 ωρών", included: false },
    ],
    cta: "Επιλογή Essential",
    highlighted: true,
    badge: "Πιο Δημοφιλές",
  },
  {
    name: "Premium",
    description: "Πλήρης κάλυψη + priority + calendar sync",
    priceMonthly: "€149",
    priceYearly: "€119",
    priceSuffix: "/μήνα",
    properties: "έως 3 ακίνητα",
    features: [
      { text: "Επαγγελματικός καθαρισμός", included: true },
      { text: "Αλλαγή σεντονιών & πετσετών", included: true },
      { text: "Κράτηση on-demand", included: true },
      { text: "Φωτογραφική τεκμηρίωση πριν/μετά", included: true },
      { text: "Airbnb Calendar sync (iCal)", included: true },
      { text: "Priority SLA 2 ωρών", included: true },
    ],
    cta: "Επιλογή Premium",
    highlighted: false,
  },
  {
    name: "Agency",
    description: "Custom λύση για 4+ ακίνητα — dedicated manager",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    priceSuffix: "",
    properties: "4+ ακίνητα",
    features: [
      { text: "Όλα τα Premium features", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Bulk τιμολόγηση", included: true },
      { text: "Custom SLA", included: true },
      { text: "Priority support 24/7", included: true },
      { text: "API integration", included: true },
      { text: "Αναφορές & analytics", included: true },
    ],
    cta: "Επικοινωνήστε",
    highlighted: false,
    ghost: true,
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Ποιες περιοχές καλύπτετε;",
    answer:
      "Αυτή τη στιγμή καλύπτουμε αποκλειστικά την Αθήνα και ολόκληρη την Αττική (Κέντρο, Νότια & Βόρεια Προάστια, Υπόλοιπο Αττικής).",
  },
  {
    question: "Χρειάζεται να είμαι παρών κατά τον καθαρισμό;",
    answer:
      "Όχι, αυτό είναι ακριβώς το πλεονέκτημα μας. Η ομάδα μας αναλαμβάνει τα πάντα — από την πρόσβαση στο ακίνητο μέχρι τον τελικό έλεγχο. Εσείς λαμβάνετε μόνο τo report με τις φωτογραφίες.",
  },
  {
    question: "Πώς λειτουργεί ο συγχρονισμός με Airbnb calendar;",
    answer:
      "Στα πλάνα Essential και Premium, συνδέουμε αυτόματα το iCal link του Airbnb σας. Κάθε φορά που γίνεται check-out, λαμβάνουμε ειδοποίηση και προγραμματίζουμε τον καθαρισμό αυτόματα.",
  },
  {
    question: "Το προσωπικό σας πληροί τις νόμιμες προδιαγραφές;",
    answer:
      "Απολύτως. Βάσει της ισχύουσας νομοθεσίας, όλο το προσωπικό μας πληροί όλες τις προδιαγραφές — ποινικό μητρώο, ασφάλειες, πιστοποιήσεις. Έτσι διασφαλίζουμε ένα άριστο και αξιοπρεπές αποτέλεσμα προς τα καταλύματά σας.",
  },
];

export const coverageAreas = [
  "Αθήνα (Κέντρο)",
  "Νότια Προάστια",
  "Βόρεια Προάστια",
  "Υπόλοιπο Αττικής",
] as const;
