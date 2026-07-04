import { useState, useEffect, MouseEvent } from "react";
import { Headphones, Menu, X, Sun, Moon, ShoppingBag } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Why Norq", href: "#why-norq" },
    { label: "Shop", href: "#shop" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? "bg-[#111111]/85 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-white/85 backdrop-blur-md border-b border-black/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#overview"
          onClick={(e) => handleScrollTo(e, "#overview")}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent group-hover:bg-brand-accent/20 transition-colors">
            <Headphones size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-gradient">
            NORQ
          </span>
          <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-md ml-1.5 border transition-all ${
            isDarkMode 
              ? "bg-white/10 text-gray-400 border-white/10" 
              : "bg-black/5 text-gray-600 border-black/10"
          }`}>EST. CANADA</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-sans">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-sm font-medium tracking-wide hover:text-brand-accent transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl border transition-colors ${
              isDarkMode
                ? "border-white/10 hover:bg-white/5 text-yellow-400"
                : "border-black/10 hover:bg-black/5 text-blue-600"
            }`}
            aria-label="Toggle theme"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Quick shop buttons */}
          <a
            href="#shop"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide bg-brand-accent hover:bg-[#1a6ed2] text-white shadow-md hover:shadow-lg hover:shadow-brand-accent/10 transition-all"
          >
            <ShoppingBag size={14} />
            Shop Now
          </a>
        </div>

        {/* Mobile menu toggle & theme toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-colors sm:hidden ${
              isDarkMode
                ? "border-white/10 hover:bg-white/5 text-yellow-400"
                : "border-black/10 hover:bg-black/5 text-blue-600"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isDarkMode
                ? "border-white/10 text-gray-300 hover:bg-white/5"
                : "border-black/10 text-gray-700 hover:bg-black/5"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-panel"
          className={`lg:hidden mt-4 px-6 py-4 border-t transition-all ${
            isDarkMode
              ? "bg-[#111111] border-white/5"
              : "bg-white border-black/5"
          }`}
        >
          <div className="flex flex-col gap-4 font-sans py-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-sm font-semibold tracking-wide hover:text-brand-accent py-1.5 border-b border-transparent hover:border-brand-accent/10 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center gap-3 pt-3 mt-1 border-t border-dashed border-white/10">
              <a
                href="#shop"
                onClick={(e) => handleScrollTo(e, "#shop")}
                className="w-full text-center py-3 rounded-xl text-xs font-semibold bg-brand-accent text-white hover:bg-[#1a6ed2] transition-colors"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
