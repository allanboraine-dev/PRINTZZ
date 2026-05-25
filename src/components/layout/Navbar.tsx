import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Printer, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "Services", href: isHome ? "#services" : "/#services" },
    { name: "Vision", href: isHome ? "#about" : "/#about" },
    { name: "AI Designer", href: isHome ? "#ai-assistant" : "/#ai-assistant" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-2 group"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center font-display text-3xl md:text-4xl font-black tracking-widest"
          >
            <span className="text-pink-500">P</span>
            <span className="text-blue-500">R</span>
            <span className="text-yellow-400">I</span>
            <span className="text-green-500">N</span>
            <span className="text-purple-500">T</span>
            <span className="text-orange-500">Z</span>
            <span className="text-cyan-500">Z</span>
            <span className="text-black">.</span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-black/60">
          {navLinks.map((link) => (
            link.href.startsWith("#") ? (
              <a key={link.name} href={link.href} className="hover:text-black transition-colors">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.href} className="hover:text-black transition-colors">{link.name}</Link>
            )
          ))}
          <a href="#contact" className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-black/80 transition-all hover:scale-105 active:scale-95">
            Get a Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-black/5 p-6 flex flex-col gap-4 text-center uppercase tracking-widest font-medium text-sm"
        >
          {navLinks.map((link) => (
             link.href.startsWith("#") ? (
               <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>{link.name}</a>
             ) : (
               <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)}>{link.name}</Link>
             )
          ))}
          <a href="#contact" className="bg-black text-white py-4 rounded-xl" onClick={() => setIsOpen(false)}>
            Get a Quote
          </a>
        </motion.div>
      )}
    </nav>
  );
}
