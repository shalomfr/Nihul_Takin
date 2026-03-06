"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import ServicesContent from "@/components/ServicesContent";
import DocumentsAnimation from "@/components/DocumentsAnimation";

const INTRO_KEY = "intro_seen";

export default function Home() {
  const [introState, setIntroState] = useState<"loading" | "playing" | "done">("loading");

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    setIntroState(seen ? "done" : "playing");
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroState("done");
  };

  if (introState === "loading") return null;

  if (introState === "playing") {
    return <DocumentsAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <ServicesContent />
      <Footer />
    </>
  );
}
