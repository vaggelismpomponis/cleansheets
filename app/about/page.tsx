import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CookieNotice from "@/components/CookieNotice";
import { getContent } from "@/lib/get-content";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const { siteContent } = await getContent();

  return (
    <>
      <Navbar siteContent={siteContent} />
      <AboutPageClient siteContent={siteContent} />
      <Footer siteContent={siteContent} />
      <CookieNotice />
    </>
  );
}
