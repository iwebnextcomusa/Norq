import { useState, useEffect, FormEvent } from "react";
import {
  Volume2,
  Bluetooth,
  MicOff,
  BatteryCharging,
  Zap,
  Smile,
  Mic,
  Droplets,
  ArrowUpRight,
  Check,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  ArrowUp,
  ExternalLink,
  ShieldCheck,
  Award,
  DollarSign,
  Globe,
  Sparkles,
  ShoppingBag,
  Star,
  Send,
  Loader2,
  Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

// Data
import { FEATURES_DATA, SPECS_DATA, REVIEWS_DATA, FAQ_DATA, Feature } from "./types";

// Images
const heroSoundwaveBgImg = "https://io0zoar353xhsriq.public.blob.vercel-storage.com/Norq.mp4";
const heroEarbudsImg = "https://io0zoar353xhsriq.public.blob.vercel-storage.com/norq_hero_earbuds_1783202232165.jpg";
const chargingCaseImg = "https://io0zoar353xhsriq.public.blob.vercel-storage.com/norq_charging_case_1783202245664.jpg";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Obsidian Black");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icon mapping helper
  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "Volume2": return <Volume2 className={className} />;
      case "Bluetooth": return <Bluetooth className={className} />;
      case "MicOff": return <MicOff className={className} />;
      case "BatteryCharging": return <BatteryCharging className={className} />;
      case "Zap": return <Zap className={className} />;
      case "Smile": return <Smile className={className} />;
      case "Mic": return <Mic className={className} />;
      case "Droplets": return <Droplets className={className} />;
      default: return <Volume2 className={className} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setContactForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  const colors = [
    { name: "Obsidian Black", class: "bg-[#111111] border-white/20" },
    { name: "Cobalt Blue", class: "bg-[#2f80ed] border-blue-400/20" },
    { name: "Glacier White", class: "bg-[#f5f5f5] border-black/10" },
  ];

  return (
    <div
      id="app-root-container"
      className={`min-h-screen transition-all duration-300 font-sans relative overflow-hidden ${
        isDarkMode ? "bg-[#111111] text-white" : "bg-[#f5f5f5] text-[#111111]"
      }`}
    >
      {/* Background Neon Glowing Orbs for Immersive UI Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#2F80ED] rounded-full blur-[160px] opacity-25" />
        <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-[#2F80ED] rounded-full blur-[150px] opacity-15" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#2F80ED] rounded-full blur-[160px] opacity-15" />
      </div>

      {/* Sticky Header */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <header
        id="overview"
        className="relative pt-24 pb-16 md:py-36 overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10"
      >
        {/* Futuristic Background Picture behind text */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2f80ed]/20 rounded-full blur-[120px]" />
          {heroSoundwaveBgImg.endsWith(".mp4") ? (
            <video
              src={heroSoundwaveBgImg}
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover opacity-25 sm:opacity-35 md:opacity-40 transition-all duration-700 ${
                isDarkMode ? "mix-blend-screen" : "mix-blend-multiply opacity-20"
              }`}
            />
          ) : (
            <img 
              src={heroSoundwaveBgImg} 
              alt="Futuristic Acoustic Waves" 
              className={`w-full h-full object-cover opacity-25 sm:opacity-35 md:opacity-40 transition-all duration-700 ${
                isDarkMode ? "mix-blend-screen" : "mix-blend-multiply opacity-20"
              }`}
              referrerPolicy="no-referrer"
            />
          )}
          {/* Gradients to blend the background image perfectly */}
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode 
              ? "from-[#111111] via-[#111111]/30 to-[#111111]" 
              : "from-[#f5f5f5] via-[#f5f5f5]/30 to-[#f5f5f5]"
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode 
              ? "from-[#111111] via-transparent to-[#111111]" 
              : "from-[#f5f5f5] via-transparent to-[#f5f5f5]"
          }`} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <motion.div
            className="space-y-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Canadian Flag/Origin badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#2f80ed]/10 text-[#2F80ED] border border-[#2f80ed]/20">
              <span className="text-sm">🇨🇦</span>
              <span>Canadian Consumer Electronics Brand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight">
              Acoustic Innovation, <br />
              <span className="text-gradient">Engineered for Comfort.</span>
            </h1>

            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Experience pristine Hi-Fi sound quality, 40 hours of battery stamina, 
              and state-of-the-art Environmental Noise Cancellation. Calibrated in Canada 
              for seamless wireless pairing and all-day acoustic comfort.
            </p>

            {/* Marketplace Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mx-auto">
              <a
                href="#shop"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-[#2F80ED] text-white hover:bg-[#1a6ed2] shadow-lg shadow-[#2F80ED]/20 transition-all text-sm tracking-wide"
                id="hero-shop-amazon-btn"
              >
                <ShoppingBag size={18} />
                Shop on Amazon
              </a>
              <a
                href="#shop"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border transition-all text-sm tracking-wide ${
                  isDarkMode
                    ? "border-white/10 hover:bg-white/5 text-white"
                    : "border-black/10 hover:bg-black/5 text-[#111111]"
                }`}
                id="hero-shop-walmart-btn"
              >
                Buy on Walmart
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs text-gray-400 justify-center w-full">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#2F80ED]" />
                <span>Bluetooth 5.3 Stable</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#2F80ED]" />
                <span>Fast USB-C Charging</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#2F80ED]" />
                <span>IPX7 Waterproof</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-accent font-mono">
            Uncompromising Tech
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Designed for Precision Sound
          </h3>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Discover why the Norq Wireless Earbuds are Canada's top emerging choice for sound, stamina, and durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {FEATURES_DATA.map((feature, idx) => (
            <motion.div
              key={feature.id}
              className={`p-6 transition-all ${
                isDarkMode
                  ? "immersive-card hover:border-[#2F80ED]/30 hover:shadow-lg hover:shadow-[#2F80ED]/5 hover:scale-[1.02]"
                  : "immersive-card-light hover:border-[#2F80ED]/30 hover:shadow-lg hover:scale-[1.02]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              id={`feature-card-${feature.id}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#2F80ED]/10 text-[#2F80ED] flex items-center justify-center mb-5">
                {renderIcon(feature.iconName)}
              </div>
              <h4 className="font-display font-bold text-lg mb-2.5">{feature.title}</h4>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Norq (Bento Grid) */}
      <section
        id="why-norq"
        className={`py-20 md:py-28 border-t border-white/5 ${
          isDarkMode ? "bg-[#141414]/50" : "bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-accent font-mono">
              The Norq Difference
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Premium Build, Real Value
            </h3>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              We bypass the traditional retail markups to bring you pristine audio technology directly through trusted local networks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {/* Bento Card 1: Premium Canadian Brand */}
            <div className={`p-8 col-span-1 lg:col-span-2 flex flex-col md:flex-row items-center gap-8 transition-all hover:scale-[1.01] ${
              isDarkMode ? "immersive-card" : "immersive-card-light"
            }`}>
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-2 text-[#2F80ED] font-mono text-xs font-semibold">
                  <Globe size={14} />
                  <span>Proudly Canadian</span>
                </div>
                <h4 className="text-2xl font-display font-bold">Local Canadian Brand & Support</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Based in Canada, Norq offers direct client assistance and lightning-fast warranty services. 
                  No foreign call centers. Get direct email assistance at er.yogeshupreti@gmail.com or 
                  call +1 236-979-2212 for genuine, quick help.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="text-6xl animate-pulse">🇨🇦</div>
              </div>
            </div>

            {/* Bento Card 2: Affordable Pricing */}
            <div className={`p-8 col-span-1 flex flex-col justify-between transition-all hover:scale-[1.01] ${
              isDarkMode ? "immersive-card" : "immersive-card-light"
            }`}>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-[#2F80ED] font-mono text-xs font-semibold">
                  <DollarSign size={14} />
                  <span>Fair Pricing</span>
                </div>
                <h4 className="text-2xl font-display font-bold">Unmatched Value</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  By focusing purely on online direct sales on Amazon and Walmart, we save millions in physical storefront rents and pass 100% of those savings directly onto you.
                </p>
              </div>
              <div className="pt-6 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[#2F80ED]">CAD</span>
                <span className="text-5xl font-extrabold font-display">Premium</span>
              </div>
            </div>

            {/* Bento Card 3: Marketplaces */}
            <div className={`p-8 col-span-1 flex flex-col justify-between transition-all hover:scale-[1.01] ${
              isDarkMode ? "immersive-card" : "immersive-card-light"
            }`}>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-[#2F80ED] font-mono text-xs font-semibold">
                  <ShieldCheck size={14} />
                  <span>Secure Checkout</span>
                </div>
                <h4 className="text-2xl font-display font-bold">Trusted Retailers</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Enjoy lightning-fast shipping and zero-risk shopping with Amazon prime and Walmart fulfillment. Guaranteed genuine returns.
                </p>
              </div>
              <div className="pt-6 flex gap-4 text-xs font-mono text-gray-400">
                <span className={`px-3 py-1 rounded-md border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>Amazon Prime</span>
                <span className={`px-3 py-1 rounded-md border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>Walmart Express</span>
              </div>
            </div>

            {/* Bento Card 4: Sound Quality */}
            <div className={`p-8 col-span-1 lg:col-span-2 flex flex-col md:flex-row items-center gap-8 transition-all hover:scale-[1.01] ${
              isDarkMode ? "immersive-card" : "immersive-card-light"
            }`}>
              <div className="w-full md:w-1/3 flex justify-center text-[#2F80ED]">
                <Award size={64} className="stroke-[1.5] animate-bounce" />
              </div>
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-2 text-[#2F80ED] font-mono text-xs font-semibold">
                  <Award size={14} />
                  <span>Pure Quality</span>
                </div>
                <h4 className="text-2xl font-display font-bold">Acoustic Engineering Without Shortcuts</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  We implement dual MEMS microphones, high-speed Bluetooth 5.3 chipsets, and real copper voice coils to guarantee that your listening experience is punchy, responsive, and beautifully pristine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase & Media Gallery */}
      <section
        id="showcase"
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-accent font-mono">
            Pure Aesthetic
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            The Norq Sound System
          </h3>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Meticulously engineered inside and out. Explore high-resolution product photography and full specifications.
          </p>
        </div>

        {/* Media Gallery / Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Main Hero Shot with hover parallax style */}
          <div className="space-y-6">
            <motion.div
              className={`relative rounded-3xl overflow-hidden aspect-[4/3] group transition-all duration-500 ${
                isDarkMode ? "immersive-card border-white/10" : "immersive-card-light border-black/10 shadow-md"
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={heroEarbudsImg}
                alt="Norq Premium Earbud product shot with electric blue ring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-xs text-[#2F80ED] uppercase tracking-wider mb-1">Product Close-Up</span>
                <h4 className="font-display font-bold text-xl text-white">Metallic Black & Electric Blue</h4>
              </div>
            </motion.div>

            {/* Second gallery shot (charging case) */}
            <motion.div
              className={`relative rounded-3xl overflow-hidden aspect-[4/3] group transition-all duration-500 ${
                isDarkMode ? "immersive-card border-white/10" : "immersive-card-light border-black/10 shadow-md"
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={chargingCaseImg}
                alt="Norq open charging case with dual earbuds inside"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-xs text-[#2F80ED] uppercase tracking-wider mb-1">Charging System</span>
                <h4 className="font-display font-bold text-xl text-white">Secure Sleek Charging Nest</h4>
              </div>
            </motion.div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-8 text-left relative z-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#2F80ED] font-mono mb-2">Specifications</h4>
              <h5 className="text-3xl font-display font-bold tracking-tight mb-4">Under The Hood</h5>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Calibrated to out-perform models in its price tier. Read the full engineered technical blueprint of the Norq wireless sound nodes:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECS_DATA.map((spec) => (
                <div
                  key={spec.label}
                  className={`p-4 transition-all hover:border-[#2F80ED]/30 ${
                    isDarkMode ? "immersive-card" : "immersive-card-light"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gray-500 uppercase">{spec.label}</div>
                  <div className="font-display font-semibold text-sm mt-1">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Dynamic Interactive Color selector & Compatibility info */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold">Select Color:</span>
                <div className="flex items-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center justify-center p-1 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? "border-[#2F80ED] scale-110" : "border-transparent"
                      }`}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    >
                      <span className={`w-5 h-5 rounded-full ${color.class}`} />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-[#2F80ED] font-semibold">{selectedColor}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold uppercase font-mono text-gray-400">Supported OS:</span>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#2f80ed]/10 text-[#2f80ed] rounded-md">iOS</span>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#2f80ed]/10 text-[#2f80ed] rounded-md">Android</span>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#2f80ed]/10 text-[#2f80ed] rounded-md">Windows</span>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#2f80ed]/10 text-[#2f80ed] rounded-md">macOS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section
        id="reviews"
        className="py-20 md:py-28 border-t border-white/5 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2F80ED] font-mono">
              Audited Testimonials
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Acoustic Commendations
            </h3>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Read verified purchase reports from our listeners across Canadian cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className={`p-6 flex flex-col justify-between text-left transition-all hover:scale-[1.01] ${
                  isDarkMode ? "immersive-card" : "immersive-card-light"
                }`}
                id={`review-card-${rev.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#2F80ED]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <Check size={8} className="stroke-[3]" />
                        Verified Buy
                      </span>
                    )}
                  </div>
                  <p className={`text-sm italic leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-sm">{rev.name}</div>
                    <div className="text-[10px] font-mono text-gray-500 mt-0.5">{rev.date}</div>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Canada</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section
        id="shop"
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/5 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2F80ED] font-mono">
            Get Your Pair
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Purchase Securely
          </h3>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            We sell exclusively through Amazon and Walmart in Canada to guarantee fast courier shipping and safe checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Marketplace 1: Amazon */}
          <motion.div
            className={`p-8 text-left flex flex-col justify-between transition-all duration-300 ${
              isDarkMode
                ? "immersive-card bg-gradient-to-br from-white/10 to-transparent hover:border-[#2F80ED]/30"
                : "immersive-card-light hover:border-[#2F80ED]/30 hover:shadow-lg"
            }`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            id="shop-card-amazon"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                {/* Amazon Mock Logo styling */}
                <div className="text-2xl font-black italic tracking-tight text-gradient flex items-baseline gap-1">
                  amazon<span className="text-amber-500 font-sans font-normal text-xs uppercase tracking-widest">CA</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold font-mono text-[#2F80ED] bg-[#2F80ED]/10 rounded-md">
                  Prime Delivery
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Purchase via Amazon Canada with your Amazon Prime account. Enjoy free next-day or 2-day delivery across major cities including Toronto, Vancouver, Montreal, and Calgary.
              </p>
            </div>
            <div className="pt-8">
              <a
                href="https://www.amazon.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#2F80ED] hover:bg-[#1a6ed2] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#2F80ED]/10"
                id="shop-now-amazon-btn"
              >
                Shop Now on Amazon
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* Marketplace 2: Walmart */}
          <motion.div
            className={`p-8 text-left flex flex-col justify-between transition-all duration-300 ${
              isDarkMode
                ? "immersive-card bg-gradient-to-br from-white/10 to-transparent hover:border-[#2F80ED]/30"
                : "immersive-card-light hover:border-[#2F80ED]/30 hover:shadow-lg"
            }`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            id="shop-card-walmart"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                {/* Walmart Mock Logo styling */}
                <div className="text-2xl font-black tracking-tight text-gradient flex items-center gap-1.5">
                  Walmart<span className="text-yellow-400 font-sans font-normal text-xs uppercase tracking-widest">★</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold font-mono text-emerald-500 bg-emerald-500/10 rounded-md">
                  Express Shipping
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Purchase via Walmart Canada. Convenient pickup options at hundreds of stores nationwide, or get rapid home delivery supported by Walmart Fulfillment services.
              </p>
            </div>
            <div className="pt-8">
              <a
                href="https://www.walmart.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#2F80ED] hover:bg-[#1a6ed2] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#2F80ED]/10"
                id="shop-now-walmart-btn"
              >
                Shop Now on Walmart
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 md:py-28 border-t border-white/5 relative z-10"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2F80ED] font-mono">
              FAQ
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Frequently Queried Blueprint
            </h3>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Got questions about paring, charging, or shipping? Read our detailed technical FAQ.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden transition-all ${
                  isDarkMode ? "immersive-card hover:border-[#2F80ED]/30" : "immersive-card-light hover:border-[#2F80ED]/30"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-base hover:text-[#2F80ED] transition-colors focus:outline-none"
                  aria-expanded={activeFaq === item.id}
                  id={`faq-btn-${item.id}`}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-300 text-gray-500 ${
                      activeFaq === item.id ? "rotate-180 text-[#2F80ED]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-sm leading-relaxed border-t ${
                        isDarkMode ? "border-white/5 text-gray-400" : "border-black/5 text-gray-600"
                      }`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/5 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#2F80ED] font-mono mb-2">Connect</h2>
              <h3 className="text-3xl font-display font-extrabold tracking-tight">Get in Touch</h3>
              <p className={`text-sm leading-relaxed mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Have support inquiries, corporate partnership questions, or wholesale requests? Our team in Canada is standing by.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-gray-500">Phone Hotline</div>
                  <div className="font-display font-semibold mt-0.5 text-base">+1 236-979-2212</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-gray-500">Corporate Email</div>
                  <div className="font-display font-semibold mt-0.5 text-base hover:text-[#2F80ED] transition-colors">
                    <a href="mailto:er.yogeshupreti@gmail.com">er.yogeshupreti@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-gray-500">Headquarters</div>
                  <div className="font-display font-semibold mt-0.5 text-base">Canada Operations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 text-left ${
              isDarkMode ? "immersive-card" : "immersive-card-light"
            }`}>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-display font-bold">Message Transmitted Successfully</h4>
                  <p className={`text-sm max-w-md mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Thank you for reaching out to Norq. A Canadian acoustic specialist will review your inquiry and connect with you at your email shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl text-xs font-semibold bg-brand-accent text-white hover:bg-[#1a6ed2] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-xs font-mono uppercase text-gray-400">Full Name</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Alex Tremblay"
                        className="w-full bg-[#121212]/50 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:bg-[#121212] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-xs font-mono uppercase text-gray-400">Email Address</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alex@domain.ca"
                        className="w-full bg-[#121212]/50 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:bg-[#121212] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-xs font-mono uppercase text-gray-400">Your Message</label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Specify your inquiry details here..."
                      className="w-full bg-[#121212]/50 text-white border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-accent focus:bg-[#121212] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-accent hover:bg-[#1a6ed2] disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-accent/15 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Developed by iWebNext link strictly centered) */}
      <footer
        id="main-footer"
        className={`py-12 border-t border-white/5 transition-colors duration-300 ${
          isDarkMode ? "bg-[#111111]" : "bg-[#f5f5f5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent">
              <Headphones size={18} />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-gradient">NORQ</span>
          </div>

          <p className="text-xs text-gray-400 max-w-md leading-relaxed">
            High-fidelity wireless sound elements engineered for long-term acoustic endurance.
            Purchase securely through major Canadian marketplaces with 100% genuine local warranty.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-sans">
            <a href="#overview" className="hover:text-brand-accent transition-colors">Home</a>
            <a href="#features" className="hover:text-brand-accent transition-colors">Features</a>
            <a href="#showcase" className="hover:text-brand-accent transition-colors">Showcase</a>
            <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>

          <div className="pt-6 border-t border-white/5 w-full text-xs text-gray-500 font-sans">
            <div>© {new Date().getFullYear()} Norq Inc. All rights reserved.</div>
            <div className="mt-2 text-gray-400 font-medium">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors underline font-semibold">iWebNext</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 p-3.5 rounded-full bg-brand-accent hover:bg-[#1a6ed2] text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            aria-label="Scroll to top"
            title="Scroll to Top"
            id="scroll-to-top-btn"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive AI Chatbot Support Floating Widget */}
      <Chatbot />
    </div>
  );
}
