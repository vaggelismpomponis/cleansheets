import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "greek"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Καθαρισμός & Ασφάλεια Airbnb | Ephtopia Cleans — Χωρίς Στρες",
  description:
    "Επαγγελματικός καθαρισμός Airbnb και κάλυψη κλοπής ενοικιαστών στην Ελλάδα. Αυτόματος συντονισμός, φωτογραφική τεκμηρίωση, αποζημίωση εντός 5 ημερών.",
  keywords: [
    "Airbnb καθαρισμός",
    "κλοπή ενοικιαστή",
    "property management Ελλάδα",
    "turnover cleaning",
    "Airbnb ασφάλεια",
    "καθαρισμός καταλύματος",
  ],
  authors: [{ name: "Ephtopia Cleans" }],
  openGraph: {
    title: "Καθαρισμός & Ασφάλεια Airbnb | Ephtopia Cleans",
    description:
      "Επαγγελματικός καθαρισμός + ασφάλεια από κλοπή ενοικιαστών. Μία υπηρεσία. Μηδέν στρες.",
    type: "website",
    locale: "el_GR",
    siteName: "Ephtopia Cleans",
  },
  twitter: {
    card: "summary_large_image",
    title: "Καθαρισμός & Ασφάλεια Airbnb | Ephtopia Cleans",
    description:
      "Επαγγελματικός καθαρισμός + ασφάλεια από κλοπή ενοικιαστών. Μία υπηρεσία. Μηδέν στρες.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ephtopia Cleans",
    description:
      "Επαγγελματικός καθαρισμός και ασφάλεια έναντι κλοπής για ιδιοκτήτες Airbnb στην Ελλάδα.",
    url: "https://ephtopia-cleans.gr",
    areaServed: [
      { "@type": "City", name: "Αθήνα" },
      { "@type": "City", name: "Θεσσαλονίκη" },
      { "@type": "City", name: "Κρήτη" },
      { "@type": "City", name: "Ρόδος" },
    ],
    serviceType: ["Cleaning Service", "Property Protection"],
    priceRange: "€35 - €149",
  };

  return (
    <html
      lang="el"
      className={`${manrope.variable} ${sourceSans.variable} antialiased`}
    >
      <head>
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
