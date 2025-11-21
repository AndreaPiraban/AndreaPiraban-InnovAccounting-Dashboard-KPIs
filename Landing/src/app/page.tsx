import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InnovaAccounting",
  description: "",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      
      <Hero />
      <Features />
      <Contact />
    </>
  );
}
