import { motion } from "motion/react";
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/20 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 relative z-10">
        <div>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
            Let's Make it <br />
            <span className="text-white/20">Real.</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-sm leading-relaxed uppercase tracking-wider font-medium">
            Visit our studio in Kimberley or send us a brief for a professional quote.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/40 uppercase mb-1">Call Us</p>
                <p className="text-xl font-display font-bold uppercase">+27 53 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/40 uppercase mb-1">Email</p>
                <p className="text-xl font-display font-bold uppercase">printzzkimberley@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-mono text-white/40 uppercase mb-1">Location</p>
                <p className="text-xl font-display font-bold uppercase">Kimberley, Northern Cape, SA</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/40 uppercase">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/40 uppercase">Email Address</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/40 uppercase">Project Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors appearance-none">
                <option>Custom Apparel</option>
                <option>Embroidery</option>
                <option>Corporate Gifts</option>
                <option>Signage</option>
                <option>Branding</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/40 uppercase">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="Tell us what you need..."></textarea>
            </div>
            <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2">
              Send Request
              <ArrowUpRight size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 mt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex text-4xl md:text-5xl font-display font-black tracking-tighter uppercase">
          <span className="text-pink-500">P</span>
          <span className="text-blue-500">r</span>
          <span className="text-yellow-400">i</span>
          <span className="text-green-500">n</span>
          <span className="text-purple-500">t</span>
          <span className="text-orange-500">z</span>
          <span className="text-cyan-400">z</span>
          <span className="text-white">.</span>
        </div>
        <p className="text-xs font-mono text-white/20 uppercase">
          &copy; {new Date().getFullYear()} Printzz Kimberley. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </section>
  );
}
