import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, ChevronRight, Package, Truck, ArrowLeft } from "lucide-react";
import { ServiceDetailData } from "@/src/types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetailData;
}

export default function OrderModal({ isOpen, onClose, service }: OrderModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Configure, 2: Details, 3: Success
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  if (!isOpen || !service.isOrderable) return null;

  const handleSelect = (optionName: string, choice: string) => {
    setSelections(prev => ({ ...prev, [optionName]: choice }));
  };

  const isConfigComplete = service.options?.every(opt => selections[opt.name]) || !service.options;
  const isDetailsComplete = formData.name && formData.email && formData.phone && formData.address;

  const basePrice = service.basePrice || 0;
  const total = basePrice * quantity;

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDetailsComplete) {
      setIsSubmitting(true);
      // Artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setStep(3);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          {/* Left Column: Summary (Visible on MD+) */}
          <div className="hidden md:flex md:w-1/3 bg-surface p-8 flex-col justify-between border-r border-black/5">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2">Your Order</h3>
              <p className="text-black/60 text-sm mb-6 pb-6 border-b border-black/10">{service.title}</p>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-black/40 uppercase font-mono text-xs block mb-1">Base Price</span>
                  <span className="font-bold">R{basePrice.toFixed(2)}</span>
                </div>
                {Object.entries(selections).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-black/40 uppercase font-mono text-xs block mb-1">{key}</span>
                    <span className="font-medium text-black/80">{val}</span>
                  </div>
                ))}
                <div>
                  <span className="text-black/40 uppercase font-mono text-xs block mb-1">Quantity</span>
                  <span className="font-medium text-black/80">{quantity}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 mt-6">
              <span className="text-black/40 uppercase font-mono text-xs block mb-1">Total Estimated</span>
              <span className="font-display text-3xl font-bold">R{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Right Column: Steps */}
          <div className="w-full md:w-2/3 flex flex-col h-full bg-white overflow-y-auto">
            {step === 1 && (
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-display text-2xl font-bold uppercase">Configure Items</h3>
                </div>

                <div className="space-y-8 flex-1">
                  {service.options?.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-3">{option.name}</label>
                      <div className="flex flex-wrap gap-3">
                        {option.choices.map(choice => (
                          <button
                            key={choice}
                            onClick={() => handleSelect(option.name, choice)}
                            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                              selections[option.name] === choice 
                                ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-md shadow-pink-500/10' 
                                : 'border-black/10 hover:border-black/30'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                     <label className="block text-sm font-bold uppercase tracking-wider mb-3">Quantity</label>
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface transition-colors"
                        >-</button>
                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface transition-colors"
                        >+</button>
                     </div>
                  </div>
                </div>

                {/* Mobile Total */}
                <div className="md:hidden mt-8 pt-6 border-t border-black/10 flex justify-between items-end mb-6">
                  <div>
                    <span className="text-black/40 uppercase font-mono text-xs block mb-1">Total Estimated</span>
                    <span className="font-display text-2xl font-bold">R{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!isConfigComplete}
                  className="mt-8 w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  Continue to Details <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <button type="button" onClick={handleBack} className="mr-2 text-black/40 hover:text-black">
                    <ArrowLeft size={20} />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="font-display text-2xl font-bold uppercase">Delivery Details</h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider mb-2 text-black/60">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-pink-500 transition-colors bg-surface" 
                      placeholder="e.g. Jane Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider mb-2 text-black/60">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-pink-500 transition-colors bg-surface" 
                      placeholder="e.g. jane@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider mb-2 text-black/60">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-pink-500 transition-colors bg-surface" 
                      placeholder="e.g. 082 123 4567" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider mb-2 text-black/60">Delivery Address</label>
                    <textarea 
                      required 
                      rows={3}
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-pink-500 transition-colors bg-surface resize-none" 
                      placeholder="Full street address..." 
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isDetailsComplete || isSubmitting}
                  className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Confirm & Place Order"
                  )}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="p-8 flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="font-display text-4xl font-bold uppercase mb-4">Request Sent!</h3>
                <p className="text-black/60 mb-8 max-w-sm">
                  Thank you, {formData.name.split(' ')[0]}! We have received your order request for {quantity}x {service.title}. Our team will contact you shortly to confirm the design file and final invoice.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/80 transition-colors"
                >
                  Return to Service
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
