**PRODUCT REQUIREMENTS DOCUMENT**

**AI-Powered One-Shot Landing Page**

Υπηρεσία Καθαρισμού & Ασφάλειας για Ιδιοκτήτες Airbnb

| **Έκδοση** | **Ημερομηνία** | **Status**              |
| ---------- | -------------- | ----------------------- |
| v1.0       | Ιούνιος 2025   | **✅ Έτοιμο για Build** |

# **1\. Executive Summary**

Αυτό το PRD περιγράφει τις απαιτήσεις για τη δημιουργία μιας high-converting landing page που θα διαφημίζει μια νέα B2C υπηρεσία δύο πυλώνων για ιδιοκτήτες και managers καταλυμάτων Airbnb στην Ελλάδα:

- **🧹 Επαγγελματικός καθαρισμός (turnover cleaning) μεταξύ κρατήσεων - γρήγορος, αξιόπιστος, χωρίς παρουσία ιδιοκτήτη.**
- **🛡️ Ασφάλεια έναντι κλοπής από ενοικιαστές - κάλυψη αξίας αντικειμένων που εκλάπησαν ή καταστράφηκαν.**

Η landing page θα κατασκευαστεί από AI agent με one-shot prompt, χρησιμοποιώντας Next.js 14 + Tailwind CSS + shadcn/ui, και θα είναι production-ready χωρίς manual editing.

**🎯 Βασικός Στόχος**

Ένας AI coding agent να παράγει πλήρη, deployable landing page σε ένα μόνο prompt - χωρίς back-and-forth ή επεμβάσεις. Το αποτέλεσμα να είναι άμεσα deployable στο Vercel.

# **2\. Problem Statement & Market Opportunity**

## **2.1 Το Πρόβλημα**

Οι ιδιοκτήτες Airbnb αντιμετωπίζουν δύο κρίσιμα pain points που δεν έχουν ενιαία λύση:

| **Pain Point**       | **Αντίκτυπος**                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Logistics Καθαρισμού | Εύρεση αξιόπιστης καθαρίστριας σε κοντινό χρόνο, συγχρονισμός με check-in/out, quality control, αποτυχημένα ραντεβού.      |
| Κίνδυνος Κλοπής      | Καμία Airbnb πολιτική δεν καλύπτει αξιόπιστα κλοπή από ενοικιαστές. Το AirCover έχει πολλά exclusions και αργή διαδικασία. |
| Διαχείριση Χρόνου    | Ο ιδιοκτήτης πρέπει να βρίσκεται εκεί ή να εμπιστεύεται αγνώστους - στρες σε κάθε check-out.                               |
| Οικονομική Έκθεση    | Ζημιά από κλοπή ή αμέλεια καλυμμένη μόνο εν μέρει, με καθυστέρηση μηνών και γραφειοκρατία.                                 |

## **2.2 Market Opportunity**

Στην Ελλάδα λειτουργούν πάνω από 120.000 ενεργές καταχωρήσεις Airbnb (2024). Η αγορά βρίσκεται σε υψηλή ανάπτυξη λόγω τουρισμού. Δεν υπάρχει ακόμη ολοκληρωμένη προσφορά cleaning + theft protection σε ένα πακέτο.

| **Μέτρηση**                                 | **Αριθμός / Εκτίμηση** |
| ------------------------------------------- | ---------------------- |
| Συνολικές καταχωρήσεις Airbnb στην Ελλάδα   | ~120.000+              |
| Ιδιοκτήτες με 2+ καταχωρήσεις (target)      | ~35.000                |
| Μέση αξία κλοπής ανά συμβάν                 | €150 - €800            |
| Turnover cleanings / μήνα (εκτίμηση target) | 2 - 8 ανά ακίνητο      |
| Εκτιμώμενο TAM (καθαρισμός Ελλάδα)          | \>€40M ετησίως         |

# **3\. Target Audience & User Personas**

## **3.1 Primary Target**

Ιδιοκτήτες ή επαγγελματικοί διαχειριστές (property managers) καταλυμάτων Airbnb / Booking.com στην Ελλάδα.

### **Persona A - Νίκος, ο Casual Host**

| **Χαρακτηριστικό** | **Περιγραφή**                                                        |
| ------------------ | -------------------------------------------------------------------- |
| Ηλικία             | 35-55                                                                |
| Ακίνητα            | 1-2 (συνήθως εξοχική κατοικία ή city apartment)                      |
| Τεχνική γνώση      | Μέτρια - χρησιμοποιεί smartphone, WhatsApp                           |
| Κύριο πρόβλημα     | Βρίσκει δύσκολα αξιόπιστο καθαριστή για κοντινές ημερομηνίες         |
| Μεγαλύτερος φόβος  | Να φύγουν χρήματα ή αντικείμενα και να μη μπορεί να αποδείξει τίποτα |
| Κίνητρο αγοράς     | Αξιοπιστία + ασφάλεια + απλότητα                                     |

### **Persona B - Μαρία, η Professional Manager**

| **Χαρακτηριστικό** | **Περιγραφή**                                                 |
| ------------------ | ------------------------------------------------------------- |
| Ηλικία             | 28-45                                                         |
| Ακίνητα            | 5-30+ (co-host ή agency)                                      |
| Τεχνική γνώση      | Υψηλή - PMS tools, automation                                 |
| Κύριο πρόβλημα     | Scaling καθαρισμών χωρίς να χάνει quality control             |
| Μεγαλύτερος φόβος  | Ένα incident κλοπής να καταστρέψει τη φήμη της / αξιολογήσεις |
| Κίνητρο αγοράς     | Scalability + SLA guarantees + ασφαλιστική κάλυψη             |

## **3.2 Secondary Target**

- Real estate managers που διαχειρίζονται ακίνητα τρίτων
- Co-hosts που αναλαμβάνουν operations για ιδιοκτήτες
- Νέοι hosts που μόλις ξεκίνησαν και θέλουν ασφάλεια από την αρχή

# **4\. Product Overview - Η Υπηρεσία**

## **4.1 Πυλώνας 1: Turnover Cleaning Service**

| **Χαρακτηριστικό**  | **Λεπτομέρεια**                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| Τι περιλαμβάνει     | Πλήρης καθαρισμός μεταξύ check-out / check-in: κρεβατοκάμαρα, μπάνιο, κουζίνα, σαλόνι, αλλαγή σεντονιών |
| Προγραμματισμός     | Online booking, sync με Airbnb calendar (iCal), push notifications                                      |
| SLA                 | Εγγύηση παρουσίας εντός 2 ωρών από check-out                                                            |
| Reporting           | Φωτογραφική τεκμηρίωση πριν & μετά καθαρισμό - αποστολή στον ιδιοκτήτη                                  |
| Τιμολόγηση          | Per-cleaning ή monthly subscription (flat rate)                                                         |
| Coverage Area (MVP) | Αθήνα, Θεσσαλονίκη, Κρήτη, Ρόδος                                                                        |

## **4.2 Πυλώνας 2: Theft Protection Coverage**

| **Χαρακτηριστικό** | **Λεπτομέρεια**                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| Τι καλύπτει        | Κλοπή αντικειμένων ή ζημιά από ενοικιαστή που δεν αναφέρθηκε - ηλεκτρονικά, έπιπλα, αξεσουάρ, κλειδαριές   |
| Πώς λειτουργεί     | Ο ιδιοκτήτης δηλώνει αντικείμενα στο onboarding. Μετά κάθε checkout η εταιρεία τα τεκμηριώνει φωτογραφικά. |
| Αποζημίωση         | Σε περίπτωση επιβεβαιωμένης κλοπής/ζημιάς - αποζημίωση εντός 5 εργάσιμων ημερών                            |
| Ανώτατο όριο       | €500/event (Basic), €1.500/event (Premium) - ανά καταχώρηση                                                |
| Αποκλεισμοί (MVP)  | Φθορά από φυσιολογική χρήση, απώλεια κλειδιών, ζημιά από ατύχημα χωρίς αποδείξεις                          |
| Τιμολόγηση         | Included στο Premium plan ή ως add-on +€15/μήνα                                                            |

## **4.3 Πακέτα / Pricing Tiers (Landing Page)**

| **Plan**  | **Τι περιλαμβάνει**                                | **Τιμή**     | **Ακίνητα**   |
| --------- | -------------------------------------------------- | ------------ | ------------- |
| Starter   | Μόνο καθαρισμός, per-cleaning, χωρίς subscription  | €35/cleaning | 1 ακίνητο     |
| Essential | Καθαρισμός + φωτογράφηση + Basic κάλυψη €500       | €79/μήνα     | 1 ακίνητο     |
| Premium   | Όλα + κάλυψη €1.500 + priority SLA + calendar sync | €149/μήνα    | έως 3 ακίνητα |
| Agency    | Custom για 4+ ακίνητα - dedicated manager          | Custom       | 4+ ακίνητα    |

# **5\. Landing Page - Δομή & Περιεχόμενο**

## **5.1 Γενικές Αρχές Design**

- Tone: Επαγγελματικό, αξιόπιστο, με ανθρώπινη ζεστασιά - δεν είναι startup, είναι local trusted service
- Color palette: Deep navy (#1A2E44) + Teal (#0F7B6C) + Warm white - αίσθηση καθαριότητας + ασφάλειας
- Γλώσσα: Ελληνικά (primary), με EN toggle για ξένους property managers
- Mobile-first: 70%+ του target audience περιηγείται από mobile
- CTA focus: Ένα κύριο CTA - «Ξεκινήστε Δωρεάν Δοκιμή» ή «Κλείστε Δωρεάν Επίσκεψη»

**🎨 Aesthetic Direction για τον AI Agent**

Luxury-minimalist με trust signals. Μεγάλα whitespace sections, high-quality (placeholder) images, σαφή τυπογραφία. Αποφύγετε generic SaaS look. Θέλουμε να μοιάζει με premium local service brand - σαν να το έφτιαξε boutique agency.

## **5.2 Sections - Λεπτομερής Περιγραφή**

### **Section 1: Hero**

| **Element**   | **Περιεχόμενο / Σημειώσεις**                                                           |
| ------------- | -------------------------------------------------------------------------------------- |
| Headline      | "Ο Airbnb σας, Καθαρός & Ασφαλής - Χωρίς να Σηκωθείτε από τον Καναπέ."                 |
| Subheadline   | Επαγγελματικός καθαρισμός + ασφάλεια από κλοπή ενοικιαστών. Μία υπηρεσία. Μηδέν στρες. |
| CTA Primary   | «Ξεκινήστε Δωρεάν» → scroll to lead form ή pricing                                     |
| CTA Secondary | «Δείτε Πώς Λειτουργεί» → smooth scroll to How It Works                                 |
| Visual        | Split layout: αριστερά text, δεξιά high-quality image καθαρού δωματίου ή happy host    |
| Trust bar     | Λογότυπα: Airbnb, Booking.com, stars review badges, αριθμός καθαρισμών                 |

### **Section 2: Problem Agitation**

| **Element** | **Περιεχόμενο / Σημειώσεις**                                        |
| ----------- | ------------------------------------------------------------------- |
| Format      | 3-column icon cards                                                 |
| Card 1      | 😰 «Δεν βρίσκω αξιόπιστη καθαρίστρια σε κοντινό χρόνο» + brief copy |
| Card 2      | 🔑 «Φοβάμαι μη κλέψουν κάτι και δεν μπορώ να αποδείξω τίποτα»       |
| Card 3      | ⏰ «Χάνω ώρες στη διαχείριση - θέλω αυτόματο σύστημα»               |
| Transition  | «Αν αναγνωρίζεις έστω ένα από αυτά, η λύση είναι εδώ.» → CTA        |

### **Section 3: Solution / How It Works**

| **Element** | **Περιεχόμενο / Σημειώσεις**                                                           |
| ----------- | -------------------------------------------------------------------------------------- |
| Format      | Numbered steps (1-4) με icons                                                          |
| Step 1      | 📅 «Κάνετε onboarding σε 10 λεπτά» - καταχωρείτε ακίνητο, αντικείμενα, calendar        |
| Step 2      | 🧹 «Αυτόματος συντονισμός καθαρισμού» - λαμβάνουμε check-out, στέλνουμε ομάδα          |
| Step 3      | 📸 «Φωτογράφηση & τεκμηρίωση» - πριν/μετά report στο inbox σας                         |
| Step 4      | 🛡️ «Αναφορά συμβάντος & αποζημίωση» - κλοπή; Δηλώστε online, πληρωθείτε εντός 5 ημερών |

### **Section 4: Social Proof / Testimonials**

| **Element**   | **Περιεχόμενο / Σημειώσεις**                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Format        | 3 testimonial cards με avatar placeholder, όνομα, πόλη, αριθμός ακινήτων                                         |
| Testimonial 1 | "Τελικά κοιμάμαι ήσυχος. Ξέρω ότι το διαμέρισμα είναι έτοιμο χωρίς να το ελέγξω." - Γιώργης Π., Αθήνα, 2 ακίνητα |
| Testimonial 2 | "Έχασα μια ακουστική συσκευή Bose και πληρώθηκα εντός 4 ημερών. Δεν το περίμενα." - Σοφία Κ., Θεσσαλονίκη        |
| Testimonial 3 | "Διαχειρίζομαι 12 ακίνητα και αυτή η υπηρεσία έσωσε 10+ ώρες/εβδομάδα." - Μ. Αλεξίου, Property Manager           |
| Review score  | 4.9/5 ⭐ από 127 ιδιοκτήτες (placeholder)                                                                        |

### **Section 5: Pricing**

| **Element**        | **Περιεχόμενο / Σημειώσεις**                              |
| ------------------ | --------------------------------------------------------- |
| Format             | Pricing cards (3 visible + 1 'Agency' ghost card)         |
| Highlighted plan   | Essential - με badge «Πιο Δημοφιλές»                      |
| Each card περιέχει | Plan name, price, features list, CTA button               |
| Toggle             | Μηνιαία / Ετήσια (με discount badge: «Εξοικονομήστε 20%») |
| Trust note         | «Χωρίς δέσμευση. Ακύρωση ανά πάσα στιγμή.»                |

### **Section 6: FAQ**

| **Element** | **Περιεχόμενο / Σημειώσεις**                            |
| ----------- | ------------------------------------------------------- |
| Format      | Accordion (expand/collapse) - τουλάχιστον 6 ερωτήσεις   |
| Q1          | Πώς προστατεύεστε από κλοπή; Τι αποδείξεις χρειάζονται; |
| Q2          | Ποια περιοχή καλύπτετε; Πότε επεκτείνεστε;              |
| Q3          | Τι γίνεται αν ο καθαρισμός δεν είναι ικανοποιητικός;    |
| Q4          | Χρειάζεται να είμαι παρών κατά τον καθαρισμό;           |
| Q5          | Πώς λειτουργεί ο συγχρονισμός με Airbnb calendar;       |
| Q6          | Τι καλύπτει και τι εξαιρεί η κάλυψη κλοπής;             |

### **Section 7: Final CTA / Lead Form**

| **Element**      | **Περιεχόμενο / Σημειώσεις**                              |
| ---------------- | --------------------------------------------------------- |
| Format           | Full-width section με navy background                     |
| Headline         | "Ξεκινήστε Σήμερα - Η Πρώτη Επίσκεψη είναι Δωρεάν"        |
| Form fields      | Όνομα, Email, Τηλέφωνο, Αριθμός ακινήτων (dropdown), Πόλη |
| Submit CTA       | «Θέλω Δωρεάν Αξιολόγηση» - teal button                    |
| Trust micro-copy | «Δεν στέλνουμε spam. Επικοινωνούμε εντός 24 ωρών.»        |

### **Section 8: Footer**

| **Element** | **Περιεχόμενο / Σημειώσεις**                                       |
| ----------- | ------------------------------------------------------------------ |
| Columns     | Logo + tagline \| Navigation links \| Contact info \| Social links |
| Legal links | Όροι Χρήσης, Πολιτική Απορρήτου, Πολιτική Αποζημίωσης              |
| Social      | Instagram, Facebook, LinkedIn icons                                |
| Copyright   | © 2025 \[Εταιρεία\]. All rights reserved.                          |

# **6\. Technical Specification**

## **6.1 Tech Stack**

| **Layer**  | **Technology**                                         | **Rationale**                         |
| ---------- | ------------------------------------------------------ | ------------------------------------- |
| Framework  | Next.js 14 (App Router)                                | SSR + SEO optimization                |
| Language   | TypeScript                                             | Type safety                           |
| Styling    | Tailwind CSS v3                                        | Utility-first, mobile-first           |
| Components | shadcn/ui                                              | Accordion, Card, Button, Badge, Input |
| Animations | Framer Motion                                          | Section reveals, hover states         |
| Icons      | Lucide React                                           | Consistent icon set                   |
| Forms      | React Hook Form + Zod                                  | Validation                            |
| Deployment | Vercel                                                 | One-click deploy, auto preview        |
| Analytics  | Vercel Analytics (built-in)                            | No extra setup                        |
| Fonts      | Google Fonts: Manrope (display) + Source Sans 3 (body) | Performance-optimized via next/font   |

## **6.2 Αρχιτεκτονική Files**

- app/page.tsx - Main landing page component (συνθέτει sections)
- app/layout.tsx - Root layout με metadata, fonts, analytics
- components/sections/ - Ένα αρχείο ανά section (Hero.tsx, Pricing.tsx, κτλ.)
- components/ui/ - shadcn/ui components (auto-generated)
- lib/content.ts - Όλα τα copy strings σε ένα αρχείο (εύκολη αλλαγή)
- lib/constants.ts - Pricing data, FAQ data, testimonials
- public/images/ - Placeholder images (unsplash URLs ή local)

## **6.3 Performance Requirements**

| **Metric**            | **Target**                         | **Σημασία**                    |
| --------------------- | ---------------------------------- | ------------------------------ |
| Core Web Vitals - LCP | < 2.5s                             | Κρίσιμο για SEO και conversion |
| Core Web Vitals - CLS | < 0.1                              | Σταθερό layout                 |
| Core Web Vitals - INP | < 200ms                            | Γρήγορη απόκριση               |
| Lighthouse Score      | \> 90 (Performance, Accessibility) | One-shot target                |
| Mobile Responsiveness | 100% - breakpoints: sm/md/lg/xl    | 70%+ mobile traffic            |
| Image Optimization    | next/image με lazy loading         | Auto WebP, responsive sizes    |

## **6.4 SEO Requirements**

- Meta title: «Καθαρισμός & Ασφάλεια Airbnb | \[Brand\] - Χωρίς Στρες»
- Meta description: 155 χαρακτήρες, με keywords: Airbnb καθαρισμός, κλοπή ενοικιαστή, property management Ελλάδα
- OG Image: 1200x630px branded image για social sharing
- Structured data: LocalBusiness schema + FAQPage schema
- Canonical URL: ορισμένο
- Sitemap: auto-generated από Next.js

# **7\. One-Shot AI Agent Prompt**

## **7.1 Στρατηγική Prompting**

Το prompt για τον AI agent πρέπει να είναι αυτάρκες - να περιέχει όλο το context χωρίς εξωτερικές αναφορές. Δομή:

- ROLE: Ποιος είναι ο agent και ποια η ειδικότητά του
- GOAL: Τι ακριβώς πρέπει να φτιάξει
- TECH STACK: Ακριβείς τεχνολογίες και εκδόσεις
- CONTENT: Πλήρες copy για κάθε section
- DESIGN SYSTEM: Colors, fonts, spacing rules
- COMPONENT SPEC: Κάθε section με λεπτομέρεια
- CONSTRAINTS: Τι να ΜΗΝ κάνει
- OUTPUT FORMAT: Τι αρχεία να παραδώσει

## **7.2 Prompt Template (Production-Ready)**

**📋 AI Agent Prompt - Αντιγράψτε & Χρησιμοποιήστε**

You are an expert Next.js 14 developer and UI/UX designer. Build a complete, production-ready landing page for a Greek Airbnb cleaning and theft protection service. TECH STACK: Next.js 14 (App Router), TypeScript, Tailwind CSS v3, shadcn/ui, Framer Motion, Lucide React, React Hook Form + Zod. Fonts via next/font: Manrope (headings) + Source Sans 3 (body) from Google Fonts. BRAND: Colors: navy #1A2E44 (primary), teal #0F7B6C (accent), white #FFFFFF. Tone: premium-local, trustworthy, clean. NOT a generic SaaS look. TARGET: Airbnb property owners and managers in Greece, 1-30+ properties. SECTIONS (in order): 1. Hero - Headline: "Ο Airbnb σας, Καθαρός & Ασφαλής - Χωρίς να Σηκωθείτε από τον Καναπέ." Split layout, two CTAs, trust bar with logos. 2. Problem (3 cards) - Pain points: αναξιόπιστος καθαρισμός, φόβος κλοπής, χρόνος διαχείρισης. 3. Solution / How It Works - 4 steps with icons: onboarding, αυτόματος καθαρισμός, φωτογράφηση, αποζημίωση. 4. Testimonials - 3 cards with avatar placeholders, Greek names, cities, star ratings. 5. Pricing - 3 tiers: Starter €35/cleaning, Essential €79/μήνα, Premium €149/μήνα. Monthly/yearly toggle. Highlight Essential. 6. FAQ - Accordion, 6 questions in Greek. 7. Lead Form - Full-width navy bg, name/email/phone/properties/city fields, submit CTA. 8. Footer - 4 columns, social links, legal links, copyright. CONSTRAINTS: Mobile-first, all text in Greek, no external API calls, use placeholder images from picsum.photos, Lighthouse > 90, no TypeScript errors, all components in components/sections/, all copy in lib/content.ts. OUTPUT: Complete file tree with all code. Start with package.json, then layout, then page, then each section component in order.

## **7.3 Recommended AI Agents / Tools**

| **Tool**                 | **Πότε να χρησιμοποιήσετε**                                | **Score για One-Shot** |
| ------------------------ | ---------------------------------------------------------- | ---------------------- |
| Claude (Sonnet/Opus)     | Ισχυρότερος για long-context, ακολουθεί instructions πιστά | ⭐⭐⭐⭐⭐             |
| Cursor Composer          | IDE-native, auto-creates files, εύκολο debugging           | ⭐⭐⭐⭐⭐             |
| v0.dev (Vercel)          | Εξαιρετικό για UI components, αλλά όχι full project        | ⭐⭐⭐⭐               |
| GitHub Copilot Workspace | Δουλεύει σε αποθετήριο, κατάλληλο για iteration            | ⭐⭐⭐⭐               |
| Bolt.new                 | One-shot full projects, καλό prototype speed               | ⭐⭐⭐                 |

# **8\. Conversion Optimization (CRO)**

## **8.1 Trust Signals που πρέπει να υπάρχουν**

- Αριθμός καθαρισμών που έχουν γίνει (π.χ. «2.340+ καθαρισμοί ολοκληρώθηκαν»)
- Αριθμός αποζημιώσεων («€18.500 σε αποζημιώσεις»)
- Review score (4.9/5 ⭐) με αριθμό reviewers
- Λογότυπα αναγνωρισιμότητας (Airbnb, Booking.com)
- Εγγύηση («Αν δεν μείνετε ικανοποιημένοι - επανακαθαρίζουμε δωρεάν»)
- GDPR compliance badge, ΑΦΜ εταιρείας στο footer

## **8.2 CTA Best Practices**

| **Παράγοντας**     | **Recommendation**                                                            |
| ------------------ | ----------------------------------------------------------------------------- |
| Θέση               | Hero, μετά Problem section, μετά Pricing, Final form                          |
| Γλώσσα             | Action-oriented: «Ξεκινήστε», «Κλείστε», «Θέλω» - όχι «Submit» ή «Click here» |
| Χρώμα              | Teal (#0F7B6C) - contrast ratio > 4.5:1 για accessibility                     |
| Friction reduction | Πρωτεύον CTA = email μόνο (low commitment), τα υπόλοιπα fields στο step 2     |
| Urgency (optional) | «Περιορισμένες θέσεις για τον μήνα» - A/B test                                |

## **8.3 A/B Testing Plan (Post-Launch)**

| **Test** | **Element**           | **Variants**                                      | **Metric**                |
| -------- | --------------------- | ------------------------------------------------- | ------------------------- |
| Test 1   | Hero Headline         | Version A: Καθαρισμός-focused \| B: Κλοπή-focused | CTR to form               |
| Test 2   | CTA Text              | «Δωρεάν Δοκιμή» vs «Δωρεάν Αξιολόγηση»            | Form submissions          |
| Test 3   | Pricing Display       | Monthly first vs Yearly first                     | Plan selection            |
| Test 4   | Social Proof Position | Πριν vs μετά Pricing                              | Scroll depth + conversion |

# **9\. Pre-Launch Checklist**

|     | **Task**                                          |
| --- | ------------------------------------------------- |
| ✅  | Next.js build χωρίς errors (npm run build)        |
| ✅  | TypeScript strict mode - 0 errors                 |
| ✅  | Mobile responsive test (375px, 768px, 1280px)     |
| ✅  | Lighthouse score > 90 σε όλες τις κατηγορίες      |
| ✅  | Form submission test (email λαμβάνεται)           |
| ✅  | FAQ accordion λειτουργεί σε mobile                |
| ✅  | Pricing toggle (monthly/yearly) λειτουργεί        |
| ✅  | Smooth scroll για CTAs                            |
| ✅  | Meta tags + OG image επαληθευμένα (opengraph.xyz) |
| ✅  | Structured data validated (schema.org validator)  |
| ✅  | GDPR cookie notice (minimal)                      |
| ✅  | Contact form anti-spam (honeypot ή reCAPTCHA)     |
| ✅  | Vercel deployment + custom domain                 |
| ✅  | Analytics ενεργοποιημένο (Vercel Analytics)       |
| ✅  | 404 page custom                                   |

# **10\. Success Metrics (KPIs)**

| **KPI**                | **Target**                          | **Συχνότητα Μέτρησης** |
| ---------------------- | ----------------------------------- | ---------------------- |
| Conversion Rate        | \> 3% επισκέπτες → form submission  | Εβδομαδιαία            |
| Bounce Rate            | < 55%                               | Εβδομαδιαία            |
| Time on Page           | \> 2:30 λεπτά                       | Εβδομαδιαία            |
| Scroll Depth           | \> 60% φτάνουν στο Pricing section  | Εβδομαδιαία            |
| Lighthouse Performance | \> 90                               | Κάθε deploy            |
| Lead Quality           | \> 40% qualified leads (2+ ακίνητα) | Μηνιαία                |
| Cost per Lead (CPL)    | < €8 (με Google/Meta ads)           | Μηνιαία                |

# **11\. Risks & Mitigations**

| **Risk**                                   | **Πιθανότητα** | **Mitigation**                                                                          |
| ------------------------------------------ | -------------- | --------------------------------------------------------------------------------------- |
| AI Agent παράγει buggy code                | Υψηλός         | Χρήση Claude/Cursor με επαλήθευση. Πρόβλεψη 2-4 ωρών manual fix.                        |
| One-shot prompt πολύ μακρύ (context limit) | Μέτριος        | Split σε 2 prompts: (1) structure + (2) copy & styling                                  |
| Greek font rendering issues                | Χαμηλός        | Google Fonts - tested. Fallback: system-ui                                              |
| Legal ζητήματα για "ασφάλεια" / coverage   | Υψηλός         | Νομική επαλήθευση copy. Αποφύγετε λέξη "ασφάλιση" - χρησιμοποιήστε "κάλυψη" ή "εγγύηση" |
| Pricing πολύ χαμηλά / υψηλά                | Μέτριος        | Soft launch με waitlist πριν δεσμευτείτε σε prices                                      |

# **12\. Next Steps & Roadmap**

| **Timeline** | **Task**                                                                            | **Owner** |
| ------------ | ----------------------------------------------------------------------------------- | --------- |
| Week 1       | One-shot build από AI agent. Deploy σε Vercel staging URL.                          | Dev       |
| Week 1       | Review landing page - copy, mobile, conversion flow.                                | Product   |
| Week 2       | Νομική επαλήθευση copy (ιδίως theft coverage language).                             | Legal     |
| Week 2       | Σύνδεση form με CRM ή Google Sheet + email notification.                            | Dev       |
| Week 3       | Soft launch - share στις Airbnb host Facebook groups.                               | Marketing |
| Week 3       | Πρώτα A/B tests (headline variants).                                                | Marketing |
| Month 2      | Google Ads campaigns - keywords: «καθαρισμός airbnb», «property management ελλάδα». | Marketing |
| Month 2      | Iteration βάσει real user data - heatmaps (Hotjar).                                 | Product   |
| Month 3      | Blog / SEO content: «Τι κάνω αν ενοικιαστής κλέψει από Airbnb».                     | Content   |

**📌 Summary**

Αυτό το PRD παρέχει στον AI agent ή developer όλο το context για one-shot παραγωγή της landing page. Μετά το initial build, εκτιμάται 2-4 ώρες ελέγχου και minor adjustments πριν το production deploy. Ο στόχος είναι 0→live σε < 5 εργάσιμες ώρες.