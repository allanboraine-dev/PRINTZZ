import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Loader2, Bot, X, Shirt, Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";

function generateLocalDesignSuggestion(input: string) {
  const lowercaseInput = input.toLowerCase();
  let product = "Custom Print Project";
  let technique = "Screen Printing & Embroidery";
  let materials = "Premium Ring-spun Cotton (100%) or Heavyweight Poly-Cotton Blend";
  let colors = "Matte Black, Charcoal Gray, and Metallic Accents";
  let placement = "Left chest (embroidered logo) and large back print (screen printed design)";
  
  if (lowercaseInput.includes("jacket") || lowercaseInput.includes("bomber") || lowercaseInput.includes("windbreaker")) {
    product = "Premium Bomber Jacket";
    technique = "Metallic Embroidery & Screen Printing";
    materials = "Water-resistant Satin-finish Polyester outer shell with quilted inner lining";
    colors = "Midnight Navy / Crimson Red / Matte Black with Silver Zippers";
    placement = "High-density embroidered logo on left chest (8cm width), and clean screen-printed company logo on upper back.";
  } else if (lowercaseInput.includes("hoodie") || lowercaseInput.includes("sweater") || lowercaseInput.includes("sweatshirt")) {
    product = "Heavyweight Hoodie";
    technique = "Chenille Embroidery & Raised Screen Print";
    materials = "400 GSM Ultra-Soft Brushed Fleece (80% Cotton, 20% Polyester)";
    colors = "Warm Beige / Heather Gray / Forest Green";
    placement = "High-definition raised print on center chest, or premium chest embroidery.";
  } else if (lowercaseInput.includes("mug") || lowercaseInput.includes("cup") || lowercaseInput.includes("bottle")) {
    product = "Matte Ceramic Mug & Tumbler";
    technique = "Sublimation Printing & Laser Engraving";
    materials = "Double-walled Stainless Steel (for tumblers) or Grade-A Matte Ceramic (mugs)";
    colors = "Matte White, Satin Black, and Copper";
    placement = "Wrap-around design or crisp double-sided logo print.";
  } else if (lowercaseInput.includes("cap") || lowercaseInput.includes("hat") || lowercaseInput.includes("beanie")) {
    product = "Classic 6-Panel Snapback Cap";
    technique = "3D Puff Embroidery";
    materials = "Structured Cotton Twill with breathable mesh back panels";
    colors = "Dual-tone Navy/Beige or Solid Black";
    placement = "Centered 3D embroidered emblem on front panels, clean flat embroidery on side.";
  } else if (lowercaseInput.includes("shirt") || lowercaseInput.includes("t-shirt") || lowercaseInput.includes("tee")) {
    product = "Premium Crewneck T-Shirt";
    technique = "Direct-to-Film (DTF) or Soft-hand Screen Print";
    materials = "180 GSM 100% Combed Ringspun Cotton";
    colors = "Vintage White / Charcoal / Olive Green";
    placement = "Large graphic print on chest, or minimal branding on pocket area.";
  }

  const suggestionText = `### 🎨 Design Proposal: ${product}

We have generated a design concept matching your request: *"${input}"*. 

#### 🧵 Recommended Specifications
* **Print Technique:** ${technique} (recommended for high durability and premium texture)
* **Fabric & Materials:** ${materials}
* **Suggested Colorway:** ${colors}
* **Design Placement:** ${placement}

#### ✨ Professional Concept Description
This custom **${product}** is designed to combine premium comfort with clean, professional aesthetics. We suggest using a high-thread-count finish for any logos to ensure they stand out in relief, contrasting elegantly against the base material.

*Note: The Gemini API is currently in fallback mode, but you can request a direct physical sample or digitizing quote of this design from our Kimberley studio!*`;

  // Build a highly descriptive image prompt for Pollinations AI
  const cleanInput = input.replace(/design a|create a|mockup of a/gi, "").trim();
  const imagePrompt = `A premium product mockup photo of a ${product} matching details: "${cleanInput}". Displayed on a clean, neutral studio background, high-quality material texture, elegant modern branding design, professional product photography, soft studio lighting, photorealistic 8k.`;
  
  return { suggestionText, imagePrompt };
}

function getFallbackMockupImage(input: string): string {
  const p = input.toLowerCase();
  if (p.includes("hoodie")) {
    return "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("jacket")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("mug") || p.includes("cup") || p.includes("bottle") || p.includes("tumbler")) {
    return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("shirt") || p.includes("tee")) {
    return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("cap") || p.includes("hat")) {
    return "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("bag") || p.includes("tote")) {
    return "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80";
  }
  if (p.includes("banner") || p.includes("sign")) {
    return "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80";
}

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [usingFallbackTemplate, setUsingFallbackTemplate] = useState(false);

  // Mockup Overlay Customizer State
  const [overlayText, setOverlayText] = useState("");
  const [overlayFont, setOverlayFont] = useState("font-sans uppercase tracking-widest font-black italic");
  const [overlayColor, setOverlayColor] = useState("text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]");
  const [overlaySize, setOverlaySize] = useState(16);
  const [overlayX, setOverlayX] = useState(50); // percentage (0-100)
  const [overlayY, setOverlayY] = useState(42); // percentage (0-100)
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleDesignHelp = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setIsImageLoading(true);
    setImageError(false);
    setUsingFallbackTemplate(false);
    setResponse(null);
    setGeneratedImage(null);

    // Automatically detect overlay text from input
    let detectedText = "";
    const quoteMatch = input.match(/"([^"]+)"/);
    if (quoteMatch) {
      detectedText = quoteMatch[1];
    } else if (input.toLowerCase().includes("boraine tech")) {
      detectedText = "BORAINE TECH";
    } else if (input.toLowerCase().includes("printzz")) {
      detectedText = "PRINTZZ";
    }

    if (detectedText) {
      setOverlayText(detectedText);
      setShowCustomizer(true);
    } else {
      setOverlayText("");
      setShowCustomizer(false);
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      console.log("AI Assistant: API Key loaded in browser starting with:", apiKey ? `${apiKey.substring(0, 6)}...` : "undefined");
      if (!apiKey) {
        setResponse("Please configure your GEMINI_API_KEY in the .env file to use the AI Assistant.");
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = [
        {
          role: "user",
          parts: [{ 
            text: `You are the Printzz Kimberley AI Design Assistant. Your goal is to help customers conceptualize their printing projects (T-shirts, mugs, banners, etc.). 
            
            A customer asks: "${input}"
            
            Provide:
            1. A creative, professional, and practical response suggestion. Suggest colors, print techniques (embroidery vs screen print), and materials available at a high-end print shop in Kimberley, South Africa. Be concise but inspiring.
            2. At the very end of your response, output a single line with the format:
            [IMAGE_PROMPT] <detailed text-to-image prompt to generate a beautiful mockup of the design concept> [/IMAGE_PROMPT]
            
            Guidelines for the [IMAGE_PROMPT] block:
            - Make the image prompt highly descriptive (detailing colors, materials, logo/text placement, product styles, and studio product photography aesthetics on a neutral/clean background) so that a text-to-image generator like Stable Diffusion can draw a stunning and highly relevant mockup of the print product.
            - Do not include brand names or text in the logo description that might confuse the drawing model; instead, describe what the logo/design looks like (e.g. "a futuristic corporate logo with clean geometric lines").
            - The [IMAGE_PROMPT] must be the very last thing in the response.` 
          }]
        }
      ];

      let textResult;
      try {
        textResult = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
        });
      } catch (firstError: any) {
        console.warn("gemini-2.5-flash failed, falling back to gemini-2.0-flash...", firstError);
        textResult = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents,
        });
      }
      
      const rawText = textResult.text || "";
      let suggestionText = rawText;
      let finalImagePrompt = `A professional product mockup photo showing this custom print design concept: ${input}. Clean studio lighting, photorealistic.`;
      
      const promptMatch = rawText.match(/\[IMAGE_PROMPT\]([\s\S]*?)\[\/IMAGE_PROMPT\]/i);
      if (promptMatch) {
        finalImagePrompt = promptMatch[1].trim();
        suggestionText = rawText.replace(/\[IMAGE_PROMPT\][\s\S]*?\[\/IMAGE_PROMPT\]/i, "").trim();
      } else {
        const lines = rawText.split('\n');
        const promptLineIndex = lines.findIndex(l => l.trim().toLowerCase().startsWith('image prompt:') || l.trim().toLowerCase().startsWith('prompt:'));
        if (promptLineIndex !== -1) {
          finalImagePrompt = lines.slice(promptLineIndex).join('\n').replace(/^(image prompt:|prompt:)/i, '').trim();
          suggestionText = lines.slice(0, promptLineIndex).join('\n').trim();
        }
      }
      
      setResponse(suggestionText || "I'm having trouble connecting right now, but reach out to our team!");
      
      const cleanImagePrompt = finalImagePrompt.replace(/[\*\[\]\#\`\_]/g, "").trim();
      const seed = Math.floor(Math.random() * 1000000) + 1;
      setGeneratedImage(`https://image.pollinations.ai/prompt/${encodeURIComponent(cleanImagePrompt)}?width=800&height=800&nologo=true&seed=${seed}`);
    } catch (error: any) {
      console.warn("All Gemini API models failed or rate-limited. Activating local design concept generator fallback...", error);
      const { suggestionText, imagePrompt } = generateLocalDesignSuggestion(input);
      setResponse(suggestionText);
      const seed = Math.floor(Math.random() * 1000000) + 1;
      setGeneratedImage(`https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=800&nologo=true&seed=${seed}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-400/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-cyan-400/20 blur-[120px]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-pink-500/20">
            <Bot size={16} />
            Print Vision AI
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 px-10">
            Need inspiration for your next project?
          </h2>
          <p className="text-black/60 uppercase tracking-wider text-sm font-medium">
            Ask our AI designer for suggestions on materials, styles, and branding.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-2xl">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDesignHelp()}
              placeholder="Ex: I need a professional looking hoodie for my construction company..."
              className="flex-1 bg-surface border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
            <button 
              onClick={handleDesignHelp}
              disabled={isLoading}
              className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-6 bg-surface rounded-2xl border border-black/5 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4 text-accent">
                    <Sparkles size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">AI Suggestion</span>
                  </div>
                  <div className="prose prose-sm max-w-none text-black/80 leading-relaxed markdown-body">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </div>
                {generatedImage && (
                  <div className="md:w-1/3 shrink-0 flex flex-col gap-4">
                    {/* Image Wrapper */}
                    <div 
                      className={`relative w-full min-h-[300px] rounded-2xl overflow-hidden shadow-md border border-black/5 bg-surface flex items-center justify-center cursor-pointer group`}
                      onClick={() => !imageError && setIsPreviewOpen(true)}
                    >
                      {isImageLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-30">
                          <Loader2 className="w-8 h-8 text-accent animate-spin mb-2" />
                          <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest animate-pulse">Generating mockup...</span>
                        </div>
                      )}
                      
                      {!imageError ? (
                        <>
                          <img 
                            src={generatedImage} 
                            alt="AI Generated Concept" 
                            className="w-full h-auto object-contain select-none"
                            onLoad={() => setIsImageLoading(false)}
                            onError={() => {
                              const fallbackUrl = getFallbackMockupImage(input);
                              if (generatedImage !== fallbackUrl) {
                                setGeneratedImage(fallbackUrl);
                                setUsingFallbackTemplate(true);
                              } else {
                                setImageError(true);
                              }
                              setIsImageLoading(false);
                            }}
                          />
                          
                          {usingFallbackTemplate && (
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                              ⚡ Mockup Template Base
                            </div>
                          )}

                          {/* Text/Logo Overlay on small preview */}
                          {overlayText && (
                            <div 
                              className={`absolute text-center select-none pointer-events-none ${overlayColor} ${overlayFont} font-black z-20`}
                              style={{ 
                                left: `${overlayX}%`, 
                                top: `${overlayY}%`, 
                                transform: 'translate(-50%, -50%)',
                                fontSize: `${overlaySize}px`
                              }}
                            >
                              {overlayText}
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center z-10">
                            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transition-all transform translate-y-2 group-hover:translate-y-0">Preview</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center gap-3 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 w-full min-h-[300px] z-10 select-none">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            {input.toLowerCase().includes("mug") || input.toLowerCase().includes("cup") || input.toLowerCase().includes("bottle") || input.toLowerCase().includes("tumbler") ? (
                              <Coffee size={24} />
                            ) : (
                              <Shirt size={24} />
                            )}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Concept Design Preview</h4>
                            <p className="text-[10px] text-black/40 font-mono max-w-[200px] mx-auto truncate uppercase tracking-widest">
                              {input}
                            </p>
                          </div>
                          <div className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-mono text-black/40 uppercase tracking-widest">
                            Image Server Offline
                          </div>
                          {overlayText && (
                            <div 
                              className={`mt-2 text-center ${overlayColor} ${overlayFont} font-black`}
                              style={{ fontSize: `${overlaySize}px` }}
                            >
                              {overlayText}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <span className="text-[10px] text-black/40 font-mono uppercase tracking-widest">AI Concept Art</span>
                    </div>

                    {/* Personalization Controls */}
                    <div className="bg-surface rounded-2xl border border-black/5 p-4 flex flex-col gap-3">
                      <button
                        onClick={() => setShowCustomizer(!showCustomizer)}
                        className="text-xs font-bold uppercase tracking-wider text-accent flex items-center justify-between hover:underline w-full"
                      >
                        <span>{showCustomizer ? "Hide Customizer" : "🎨 Personalize Design Logo"}</span>
                        <span>{showCustomizer ? "▲" : "▼"}</span>
                      </button>
                      
                      {showCustomizer && (
                        <div className="flex flex-col gap-3 mt-2 border-t border-black/5 pt-3">
                          {/* Text input */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-black/40 text-left">Custom Logo/Brand Text</label>
                            <input 
                              type="text"
                              value={overlayText}
                              onChange={(e) => setOverlayText(e.target.value)}
                              placeholder="Type logo text (e.g. BORAINE TECH)..."
                              className="bg-white border border-black/5 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent w-full"
                            />
                          </div>

                          {/* Font select */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-black/40 text-left">Font Style</label>
                            <select
                              value={overlayFont}
                              onChange={(e) => setOverlayFont(e.target.value)}
                              className="bg-white border border-black/5 rounded-lg px-2 py-1.5 text-xs focus:outline-none w-full"
                            >
                              <option value="font-sans uppercase tracking-widest font-black italic">Modern / Tech</option>
                              <option value="font-mono uppercase tracking-wider font-extrabold border-y py-0.5 px-2 border-current">Varsity / Sports</option>
                              <option value="font-serif italic font-semibold">Elegant / Script</option>
                              <option value="font-sans uppercase font-black tracking-tighter">Impact / Bold</option>
                            </select>
                          </div>

                          {/* Color select */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-black/40 text-left">Logo Color</label>
                            <div className="flex gap-2 justify-start mt-1">
                              {[
                                { name: "White", class: "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]", bg: "bg-white border border-black/10" },
                                { name: "Black", class: "text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]", bg: "bg-black" },
                                { name: "Gold", class: "text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]", bg: "bg-yellow-500" },
                                { name: "Red", class: "text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]", bg: "bg-red-600" },
                                { name: "Cyan", class: "text-cyan-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]", bg: "bg-cyan-400" },
                              ].map((c) => (
                                <button
                                  key={c.name}
                                  onClick={() => setOverlayColor(c.class)}
                                  className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${c.bg} ${overlayColor === c.class ? 'ring-2 ring-accent scale-110' : ''}`}
                                  title={c.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Size slider */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/40">
                              <span>Font Size</span>
                              <span>{overlaySize}px</span>
                            </div>
                            <input 
                              type="range"
                              min="8"
                              max="36"
                              value={overlaySize}
                              onChange={(e) => setOverlaySize(parseInt(e.target.value))}
                              className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                          </div>

                          {/* Y slider */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/40">
                              <span>Position Y (Height)</span>
                              <span>{overlayY}%</span>
                            </div>
                            <input 
                              type="range"
                              min="15"
                              max="85"
                              value={overlayY}
                              onChange={(e) => setOverlayY(parseInt(e.target.value))}
                              className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                          </div>

                          {/* X slider */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-black/40">
                              <span>Position X (Width)</span>
                              <span>{overlayX}%</span>
                            </div>
                            <input 
                              type="range"
                              min="15"
                              max="85"
                              value={overlayX}
                              onChange={(e) => setOverlayX(parseInt(e.target.value))}
                              className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isPreviewOpen && generatedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>
            <div className="relative max-w-full max-h-[90vh] flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                src={generatedImage}
                alt="AI Generated Concept Preview"
                className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl cursor-default object-contain"
              />
              {overlayText && (
                <div 
                  className={`absolute text-center pointer-events-none select-none ${overlayColor} ${overlayFont} font-black`}
                  style={{ 
                    left: `${overlayX}%`, 
                    top: `${overlayY}%`, 
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${overlaySize * 2.2}px`
                  }}
                >
                  {overlayText}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
