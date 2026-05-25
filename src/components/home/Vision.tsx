import { motion } from "motion/react";
import visionThumbnail from "../../assets/vision-thumbnail.png";

export default function Vision() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square bg-surface rounded-3xl overflow-hidden border border-black/5">
              <img 
                src={visionThumbnail} 
                alt="Printing Process"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-pink-500 text-white p-10 rounded-3xl max-w-xs hidden md:block shadow-2xl shadow-pink-500/30">
              <p className="font-display text-4xl font-bold uppercase mb-4 leading-none inline-block">15+</p>
              <p className="text-sm text-white/60 uppercase tracking-widest font-medium">Years of Crafting Visual Excellence in the Northern Cape.</p>
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-5xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
              Our Vision <br />
              <span className="text-cyan-500">is Clarity.</span>
            </h2>
            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>
                At Printzz Kimberley, we don’t just print; we translate brand identities into tangible experiences. Whether it’s a single mug or a city-wide campaign, we apply the same level of obsession to detail.
              </p>
              <p>
                Our vision is to be the pulse of creativity in our community, providing world-class printing solutions that help businesses grow and individuals express their uniqueness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="text-3xl font-display font-bold uppercase mb-1">Quality</p>
                <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
              <div>
                <p className="text-3xl font-display font-bold uppercase mb-1">Speed</p>
                <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
