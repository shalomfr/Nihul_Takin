"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import ServicesContent from "@/components/ServicesContent";
import DocumentsAnimation from "@/components/DocumentsAnimation";

export default function Home() {
  const [animDone, setAnimDone] = useState(false);

  return (
    <>
      <DocumentsAnimation onComplete={() => setAnimDone(true)} />
      {animDone && (
        <>
          <ServicesContent />
          <Footer />
        </>
      )}
    </>
  );
}
