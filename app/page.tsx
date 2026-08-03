import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import Footer from "@/components/sections/Footer";
import CookieNotice from "@/components/CookieNotice";
import { getContent } from "@/lib/get-content";

export default async function Home() {
  const { siteContent, faqItems, pricingTiers } = await getContent();

  return (
    <>
      <Navbar siteContent={siteContent} />
      <main>
        <Hero siteContent={siteContent} />
        <Problem siteContent={siteContent} />
        <Services siteContent={siteContent} />
        <FAQ siteContent={siteContent} faqItems={faqItems} />
        <LeadForm siteContent={siteContent} />
      </main>
      <Footer siteContent={siteContent} />
      <CookieNotice />
    </>
  );
}
