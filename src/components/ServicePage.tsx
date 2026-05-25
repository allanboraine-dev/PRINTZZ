import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, ShoppingBag, Clock, ShieldCheck, ChevronLeft, ChevronRight, Star, MousePointerClick, Box } from "lucide-react";
import { SERVICES_DATA } from "@/src/servicesData";
import { Shirt, Coffee, Flag, PenTool, Briefcase, Sticker } from "lucide-react";
import OrderModal from "./OrderModal";
import '@google/model-viewer';

const IconMap: Record<string, any> = {
  Shirt, Coffee, Flag, PenTool, Briefcase, Sticker
};

export default function ServicePage() {
  const { id } = useParams();
  const service = SERVICES_DATA.find((s) => s.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-surface">
        <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = IconMap[service.icon] || Shirt;

  const nextImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prev) => (prev === 0 ? service.images.length - 1 : prev - 1));
  };

  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  const [isModelLoading, setIsModelLoading] = useState(true);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          Back to all services
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-2xl shadow-lg shadow-pink-500/20">
                <Icon size={32} />
              </div>
              <span className="text-sm font-mono text-pink-500 uppercase font-bold tracking-widest">
                Service Detail // {service.id}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
              {service.title}<span className="text-accent">.</span>
            </h1>

            <p className="text-xl text-black/60 leading-relaxed mb-12">
              {service.fullDesc}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Available Materials</h3>
                <ul className="space-y-2">
                  {service.materials.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 size={16} className="text-accent" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Expert Techniques</h3>
                <ul className="space-y-2">
                  {service.techniques.map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center mb-12">
              <div className="flex items-center gap-3 px-4 py-2 bg-surface rounded-full border border-black/5">
                <Clock size={16} className="text-black/40" />
                <span className="text-xs font-bold uppercase tracking-widest">Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-surface rounded-full border border-black/5">
                <ShieldCheck size={16} className="text-black/40" />
                <span className="text-xs font-bold uppercase tracking-widest">Quality Guaranteed</span>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-purple-900/20">
              <div>
                <p className="text-pink-300 text-[10px] font-mono uppercase tracking-[0.3em] mb-2">Estimated Pricing</p>
                <p className="text-3xl font-display font-bold uppercase">{service.priceRange}</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                {service.isOrderable ? (
                  <button 
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all flex justify-center items-center gap-2 shadow-lg shadow-pink-500/30"
                  >
                    Order Online
                    <MousePointerClick size={18} />
                  </button>
                ) : (
                  <a 
                    href="/#contact"
                    className="w-full sm:w-auto px-8 py-4 bg-pink-500 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink-400 transition-all flex justify-center items-center gap-2 shadow-lg shadow-pink-500/30"
                  >
                    Request Quote
                    <ShoppingBag size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interactive Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Main Active Image / 3D Viewer */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 bg-surface group">
              <AnimatePresence mode="wait">
                {viewMode === 'image' ? (
                  <motion.div
                    key={`img-container-${activeImageIndex}`}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-surface z-0">
                        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-black/10 border-t-accent rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      key={`img-${activeImageIndex}`}
                      src={service.images[activeImageIndex]}
                      alt={`${service.title} preview`}
                      loading="lazy"
                      onLoad={() => setIsImageLoading(false)}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="3d-viewer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-surface to-slate-100"
                  >
                    {isModelLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-surface z-10 w-full h-full">
                        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-black/10 border-t-accent rounded-full animate-spin" />
                      </div>
                    )}
                    {/* @ts-ignore */}
                    <model-viewer
                      src={service.modelUrl}
                      camera-controls
                      auto-rotate
                      shadow-intensity="1"
                      onLoad={() => setIsModelLoading(false)}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-center pointer-events-none z-20">
                      <span className="bg-black/50 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        Drag to rotate • Scroll to zoom
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {service.images.length > 1 && viewMode === 'image' && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails & 3D Toggle */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar items-center">
              {service.modelUrl && (
                <button
                  onClick={() => setViewMode('3d')}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    viewMode === '3d' ? 'border-accent shadow-md scale-105 bg-accent/5 cursor-default' : 'border-black/5 hover:border-black/20 bg-surface'
                  }`}
                >
                  <Box size={24} className={viewMode === '3d' ? 'text-accent' : 'text-black/40'} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${viewMode === '3d' ? 'text-accent' : 'text-black/40'}`}>
                    3D View
                  </span>
                </button>
              )}
              {service.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (activeImageIndex !== i) setIsImageLoading(true);
                    setActiveImageIndex(i);
                    setViewMode('image');
                  }}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === i && viewMode === 'image' ? 'border-accent shadow-md scale-105' : 'border-transparent hover:border-black/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Project Stats Banner */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-8 bg-surface rounded-3xl border border-black/5 text-center transition-transform hover:scale-[1.02]">
                <p className="text-4xl font-display font-bold mb-2">500+</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-black/40">Projects Completed</p>
              </div>
              <div className="p-8 bg-surface rounded-3xl border border-black/5 text-center transition-transform hover:scale-[1.02]">
                <p className="text-4xl font-display font-bold mb-2">100%</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-black/40">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        {service.testimonials && service.testimonials.length > 0 && (
          <div className="mt-32">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-12 text-center">
              Client Success Stories<span className="text-pink-500">.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-8 bg-surface rounded-3xl border border-black/5 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                  <div>
                    <div className="flex gap-1 mb-6 text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-black/70 italic text-lg leading-relaxed mb-8">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-sm">{testimonial.name}</p>
                    {testimonial.company && (
                      <p className="text-xs font-mono text-black/40 uppercase mt-1">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Order Modal */}
        <OrderModal 
          isOpen={isOrderModalOpen} 
          onClose={() => setIsOrderModalOpen(false)} 
          service={service} 
        />
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
