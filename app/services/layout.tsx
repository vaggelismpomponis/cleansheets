import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Υπηρεσίες | CleanSheets — Καθαρισμός & Ασφάλεια Airbnb",
  description:
    "Αναλυτικές πληροφορίες για τις υπηρεσίες μας: επαγγελματικός καθαρισμός, κάλυψη κλοπής, φωτογραφική τεκμηρίωση και αυτόματος συντονισμός για ιδιοκτήτες Airbnb.",
  openGraph: {
    title: "Υπηρεσίες | CleanSheets — Καθαρισμός & Ασφάλεια Airbnb",
    description:
      "Αναλυτικές πληροφορίες για τις υπηρεσίες μας: επαγγελματικός καθαρισμός, κάλυψη κλοπής, φωτογραφική τεκμηρίωση και αυτόματος συντονισμός.",
    type: "website",
    locale: "el_GR",
    siteName: "CleanSheets",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
