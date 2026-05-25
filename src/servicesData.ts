import { ServiceDetailData } from "./types";

export const SERVICES_DATA: ServiceDetailData[] = [
  {
    id: "apparel",
    title: "Apparel & Embroidery",
    shortDesc: "Custom t-shirts, hoodies, and corporate uniforms with premium embroidery.",
    fullDesc: "Our apparel service offers high-quality garments from leading South African suppliers, combined with world-class embroidery and screen printing techniques. We specialize in corporate workwear, school uniforms, and custom leisure apparel.",
    icon: "Shirt",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["100% Cotton", "Polycotton Blends", "Moisture Wicking Tech-Fabric", "Heavyweight Fleece"],
    techniques: ["3D Puff Embroidery", "Flat Embroidery", "Screen Printing", "Heat Transfer"],
    priceRange: "Starting from R150",
    isOrderable: true,
    basePrice: 150,
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    options: [
      { name: "Size", choices: ["S", "M", "L", "XL", "XXL"] },
      { name: "Color", choices: ["Black", "White", "Navy Blue", "Heather Grey"] }
    ],
    testimonials: [
      {
        id: "t1",
        name: "Sarah Jenkins",
        company: "TechFlow Startup",
        rating: 5,
        quote: "The custom hoodies for our tech startup were phenomenal. The embroidery quality exceeded our expectations and the team wears them every day."
      },
      {
        id: "t2",
        name: "David Mabuza",
        company: "Kimberley High School",
        rating: 5,
        quote: "We ordered 500 sports uniforms and the turnaround time was incredible. Printzz is our go-to for all school apparel."
      }
    ]
  },
  {
    id: "drinkware",
    title: "Drinkware",
    shortDesc: "Premium mugs and bottles.",
    fullDesc: "From ceramic office mugs to vacuum-insulated sports bottles, we provide durable and stylish drinkware options. Our sublimation printing ensures vibrant colors that stand up to daily use and washing.",
    icon: "Coffee",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1610842288179-11fa674b86bb?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["Ceramic", "Stainless Steel", "BPA-Free Plastic", "Glass"],
    techniques: ["Sublimation Printing", "Laser Engraving", "Pad Printing"],
    priceRange: "Starting from R85",
    isOrderable: true,
    basePrice: 85,
    options: [
      { name: "Style", choices: ["Standard Ceramic Unit 330ml", "Color Inner Mug 330ml", "Travel Flask 450ml"] },
      { name: "Color", choices: ["White", "Black Inner", "Red Inner", "Silver"] }
    ],
    testimonials: [
      {
        id: "t3",
        name: "Jessica Botha",
        company: "Peak Marketing",
        rating: 5,
        quote: "High-quality corporate mugs that our clients love. The colors are incredibly vibrant and haven't faded after months of washing."
      }
    ]
  },
  {
    id: "signage",
    title: "Signage & Banners",
    shortDesc: "Large scale visibility.",
    fullDesc: "Maximize your physical presence with our large-format signage solutions. We handle everything from retractable banners for events to permanent outdoor building signs and PVC banners.",
    icon: "Flag",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1563823251940-02ceae0002ba?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["PVC Flex", "Aluminum Composite", "Correx Board", "Vinyl Mesh"],
    techniques: ["UV Printing", "Eco-Solvent Print", "Latex Printing"],
    priceRange: "Custom Quote Required",
    testimonials: [
      {
        id: "t4",
        name: "Omar Petersen",
        company: "Fresh Foods Market",
        rating: 5,
        quote: "Our new shopfront banner stands out from a mile away! The installation team was professional and fast."
      }
    ]
  },
  {
    id: "branding",
    title: "Branding & Logos",
    shortDesc: "Crafting distinct visual identities.",
    fullDesc: "A great brand starts with a great story. Our design team works with you to build a visual language that speaks to your audience, including logo design, color palettes, and brand guidelines.",
    icon: "PenTool",
    images: [
      "https://images.unsplash.com/photo-1626785774625-ddc7c82413ea?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["Digital Assets", "Brand Style Guides", "Stationery Sets"],
    techniques: ["Vector Illustration", "Typography Design", "Color Theory Analysis"],
    priceRange: "Packages from R1200",
    testimonials: [
      {
        id: "t5",
        name: "Lerato Modise",
        company: "Lerato's Bakery",
        rating: 5,
        quote: "Printzz completely revamped our brand identity. The new logo and color palette perfectly capture the essence of our business."
      }
    ]
  },
  {
    id: "gifts",
    title: "Corporate Gifts",
    shortDesc: "Lanyards, pens, and packs.",
    fullDesc: "Leave a lasting impression with thoughtful corporate gifts. We source and customize a wide range of promotional items that your clients and employees will actually use and appreciate.",
    icon: "Briefcase",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1634731386708-3010b9d99d94?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["Eco-friendly Bamboo", "Recycled Plastic", "Premium Metal", "Leather"],
    techniques: ["Laser Engraving", "Silk Screen", "Debossing", "Digital Print"],
    priceRange: "Volume-based Pricing",
    testimonials: [
      {
        id: "t6",
        name: "Michael Chen",
        company: "Global Logistics SA",
        rating: 5,
        quote: "The year-end corporate packs were a huge hit with the team. The premium notebooks and engraved pens look extremely high-end."
      }
    ]
  },
  {
    id: "vehicle",
    title: "Vehicle Graphics",
    shortDesc: "Turn your ride into a mobile ad.",
    fullDesc: "From simple door decals to partial wraps, we turn your vehicle fleet into a 24/7 marketing machine. We use premium cast vinyls designed to withstand the harsh South African climate.",
    icon: "Sticker",
    images: [
      "https://images.unsplash.com/photo-1611090141258-293d9e802051?auto=format&fit=crop&q=80&w=1200&h=900",
      "https://images.unsplash.com/photo-1596706935272-46387d3a04ef?auto=format&fit=crop&q=80&w=1200&h=900"
    ],
    materials: ["Casted Wrap Vinyl", "Contravision (One-way)", "Magnetic Decals"],
    techniques: ["Vinyl Cutting", "Digital Wrap Printing", "Lamination"],
    priceRange: "Custom Quote Required",
    testimonials: [
      {
        id: "t7",
        name: "Johan Van Der Merwe",
        company: "QuickPlumb Repairs",
        rating: 5,
        quote: "Our delivery fleet looks extremely professional now. We've actually gotten new clients just from people seeing the vans around town!"
      }
    ]
  }
];
