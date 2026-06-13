import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import Footer from "@/components/sections/Footer";
import CookieNotice from "@/components/CookieNotice";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
