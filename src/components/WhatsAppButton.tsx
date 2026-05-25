import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "27531234567"; // Country code +27, drop the leading 0 if it was 053. The number provided was +27 53 123 4567
  const message = encodeURIComponent("Hi Printzz! I would like some more information about your printing services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 hover:-translate-y-1 hover:scale-105 transition-all group pointer-events-auto"
        aria-label="Chat on WhatsApp"
      >
        {/* Custom WhatsApp SVG if we want it perfect, else MessageCircle from lucide */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M9.5 13.5c1.5 1 3.5 1 5 0" />
        </svg>
        <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-black/5 pointer-events-none">
          Chat with us on WhatsApp
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-black/5" />
        </span>
      </a>
    </motion.div>
  );
}
