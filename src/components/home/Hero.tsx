import { motion } from "motion/react";
import { ArrowRight, Sparkles, Image as ImageIcon } from "lucide-react";
import heroThumbnail from "../../assets/hero-thumbnail.png";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white text-black selection:bg-accent/30">
      {/* Vibrant Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Soft, vibrant atmospheric blurs */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-20 w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 -left-20 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-300/15 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/80 text-xs font-semibold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <Sparkles size={14} className="text-accent" />
              <span>Premium Print Studio</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-8 text-black">
              <span className="text-pink-500">P</span>
              <span className="text-blue-500">R</span>
              <span className="text-yellow-400">I</span>
              <span className="text-green-500">N</span>
              <span className="text-purple-500">T</span>
              <span className="text-orange-500">Z</span>
              <span className="text-cyan-500">Z</span>
              <span className="text-black">.</span><br />
              <span className="text-black/30">WE PRINT</span><br />
              ANYTHING.
            </h1>
            
            <p className="text-lg md:text-xl text-black/60 max-w-lg mb-10 leading-relaxed font-light">
              Elevate your brand with Kimberley's finest printing service. We merge cutting-edge technology with artisanal precision to bring your most ambitious visions to life.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </a>
              <a 
                href="#services"
                className="px-8 py-4 border border-black/10 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1 relative w-full aspect-square max-w-md md:max-w-none mx-auto"
          >
            {/* High-end glassmorphism card with the new vibrant generated thumbnail */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-xl overflow-hidden flex flex-col justify-end p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
              
              {/* Dynamic Image Wrapper */}
              <div className="absolute inset-2 rounded-[2rem] overflow-hidden bg-gray-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000" 
                  style={{ backgroundImage: `url(${heroThumbnail})` }}
                />
                {/* Subtle gradient overlay to ensure text legibility if needed, but we keep it bright */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
              </div>
              
              <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl w-full shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-mono text-xs uppercase tracking-widest font-semibold drop-shadow-sm">Featured Project</span>
                  <ImageIcon size={16} className="text-white drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1 drop-shadow-md">Premium Branding</h3>
                <p className="text-white/90 text-sm font-medium drop-shadow-sm">High-density silk screening & modern embroidery.</p>
              </div>
            </div>
            
            {/* Decorative Floating Element */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full shadow-xl flex items-center justify-center text-accent font-bold"
            >
              <Sparkles size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
