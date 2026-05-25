/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import AIAssistant from "./components/home/AIAssistant";
import Vision from "./components/home/Vision";
import Contact from "./components/home/Contact";
import ServicePage from "./components/ServicePage";
import WhatsAppButton from "./components/WhatsAppButton";
import { motion, useScroll, useSpring } from "motion/react";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Vision />
      <AIAssistant />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-accent selection:text-white">
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
          style={{ scaleX }}
        />
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service/:id" element={<ServicePage />} />
          </Routes>
        </main>

        <Contact />

        {/* Aesthetic Overlay Grid (Subtle) */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <WhatsAppButton />
      </div>
    </Router>
  );
}

