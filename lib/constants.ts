// ============================================
// CleanSheets — Structured Data Constants
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
      { text: "Κάλυψη κλοπής", included: false },
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
      { text: "Κάλυψη κλοπής έως €500", included: true },
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
      { text: "Κάλυψη κλοπής έως €1.500", included: true },
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
    question: "Πώς προστατεύεστε από κλοπή; Τι αποδείξεις χρειάζονται;",
    answer:
      "Κατά το onboarding, φωτογραφίζουμε και καταγράφουμε όλα τα αντικείμενα αξίας. Μετά από κάθε checkout, η ομάδα μας ελέγχει και τεκμηριώνει φωτογραφικά. Σε περίπτωση κλοπής, η αναφορά γίνεται online και η αποζημίωση ολοκληρώνεται εντός 5 εργάσιμων ημερών.",
  },
  {
    question: "Ποια περιοχή καλύπτετε; Πότε επεκτείνεστε;",
    answer:
      "Αυτή τη στιγμή καλύπτουμε Αθήνα, Θεσσαλονίκη, Κρήτη και Ρόδο. Σχεδιάζουμε επέκταση σε Κυκλάδες και Κέρκυρα εντός του 2025. Εγγραφείτε στη waitlist για ειδοποίηση.",
  },
  {
    question: "Τι γίνεται αν ο καθαρισμός δεν είναι ικανοποιητικός;",
    answer:
      "Προσφέρουμε εγγύηση ικανοποίησης. Αν δεν μείνετε ευχαριστημένοι, επανακαθαρίζουμε δωρεάν εντός 24 ωρών. Η ποιότητα ελέγχεται μέσω φωτογραφικής τεκμηρίωσης πριν και μετά.",
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
    question: "Τι καλύπτει και τι εξαιρεί η κάλυψη κλοπής;",
    answer:
      "Καλύπτουμε κλοπή αντικειμένων και σκόπιμη ζημιά από ενοικιαστές — ηλεκτρονικά, έπιπλα, αξεσουάρ, κλειδαριές. Εξαιρούνται: φθορά από φυσιολογική χρήση, απώλεια κλειδιών, και ζημιά από ατύχημα χωρίς αποδείξεις.",
  },
];

export const coverageAreas = [
  "Αθήνα",
  "Θεσσαλονίκη",
  "Κρήτη",
  "Ρόδος",
] as const;
