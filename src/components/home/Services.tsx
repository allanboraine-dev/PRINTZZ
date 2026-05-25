import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Shirt, 
  Coffee, 
  Flag, 
  PenTool, 
  Briefcase, 
  Sticker, 
  ArrowUpRight 
} from "lucide-react";

const services = [
  {
    id: "apparel",
    title: "Apparel & Embroidery",
    desc: "Custom t-shirts, hoodies, and corporate uniforms with premium embroidery.",
    icon: Shirt,
    size: "large",
    color: "bg-pink-500 text-white"
  },
  {
    id: "drinkware",
    title: "Drinkware",
    desc: "Premium mugs and bottles.",
    icon: Coffee,
    size: "small",
    color: "bg-cyan-400 text-black"
  },
  {
    id: "signage",
    title: "Signage & Banners",
    desc: "Large scale visibility.",
    icon: Flag,
    size: "small",
    color: "bg-yellow-400 text-black"
  },
  {
    id: "branding",
    title: "Branding & Logos",
    desc: "Crafting distinct visual identities.",
    icon: PenTool,
    size: "medium",
    color: "bg-purple-500 text-white"
  },
  {
    id: "gifts",
    title: "Corporate Gifts",
    desc: "Lanyards, pens, and packs.",
    icon: Briefcase,
    size: "small",
    color: "bg-orange-500 text-white"
  },
  {
    id: "vehicle",
    title: "Vehicle Graphics",
    desc: "Turn your ride into a mobile ad.",
    icon: Sticker,
    size: "medium",
    color: "bg-green-400 text-black"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl font-bold uppercase tracking-tighter mb-4">
              Our Craftsmanship<span className="text-accent">.</span>
            </h2>
            <p className="text-black/60 text-lg uppercase tracking-wider font-medium">
              A comprehensive suite of printing solutions for every need.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-black/10 mx-12 mb-4" />
          <p className="text-sm font-mono text-black/40 uppercase">Click to explore // SERVICES_V2.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link 
              to={`/service/${s.id}`}
              key={i}
              className={`group block relative p-8 rounded-3xl border border-black/5 transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between min-h-[300px] ${s.color} ${
                s.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                s.size === 'medium' ? 'md:col-span-2' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className={`p-4 rounded-2xl w-fit mb-8 ${s.color.includes('text-black') ? 'bg-black/10 text-black' : 'bg-white/20 text-white'} backdrop-blur-sm`}>
                    <s.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${s.color.includes('text-black') ? 'text-black/70' : 'text-white/80'}`}>
                    {s.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-mono opacity-40 uppercase">Explore Service</span>
                  <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
