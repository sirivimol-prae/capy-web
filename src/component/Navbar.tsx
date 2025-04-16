"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("head");

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);
      
      setHidden(false);
      
      lastScrollY.current = currentScrollY;
      
      const sections = ["head", "about", "education", "skills", "portfolio", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (section: string) => {
    setMobileMenuOpen(false);
    setActiveSection(section);
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      y: 20, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const bgVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      }
    }
  };

  const menuItems = [
    { id: "head", label: "Intro", icon: "🏠", color: "from-red-500 to-orange-500" },
    { id: "about", label: "About Me", icon: "👩‍💻", color: "from-orange-500 to-yellow-500" },
    { id: "education", label: "Education", icon: "🎓", color: "from-yellow-500 to-green-500" },
    { id: "skills", label: "Skills", icon: "🛠️", color: "from-green-500 to-blue-500" },
    { id: "portfolio", label: "My Work", icon: "🔍", color: "from-blue-500 to-indigo-500" },
    { id: "contact", label: "Contact", icon: "📞", color: "from-indigo-500 to-purple-500" }
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-white backdrop-filter">
          <motion.span 
            className="text-xl sm:text-2xl font-bold z-50 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Capy-Web</span>
          </motion.span>

          <div className="space-x-6 hidden md:flex items-center">
            {["about", "education", "skills", "portfolio", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className={`relative font-medium transition-colors duration-300 ${
                  activeSection === item 
                    ? "text-red-400" 
                    : "text-white/90 hover:text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
              >
                <span className="capitalize">{item === "portfolio" ? "My Work" : item}</span>
                {activeSection === item && (
                  <motion.span 
                    className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-red-500 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <motion.button 
            className="md:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white flex items-center justify-center z-50 outline-none focus:outline-none shadow-lg shadow-red-600/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed top-0 left-0 w-full h-screen bg-black/95 z-40 md:hidden flex flex-col justify-center overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
              variants={bgVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-red-500/40 to-red-300/40 blur-xl"
                animate={{ 
                  x: [0, 50, -50, 0],
                  y: [0, -30, 30, 0],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl"
                animate={{ 
                  x: [0, -40, 40, 0],
                  y: [0, 20, -20, 0],
                  scale: [1, 0.8, 1.2, 1],
                }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-3/4 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-xl"
                animate={{ 
                  x: [0, 30, -30, 0],
                  y: [0, -25, 25, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />
              
              <motion.div 
                className="absolute top-1/4 h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
                animate={{ 
                  y: [0, 20, 0, -20, 0],
                  opacity: [0.5, 0.8, 0.5, 0.2, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-2/4 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                animate={{ 
                  y: [0, -15, 0, 15, 0],
                  opacity: [0.2, 0.5, 0.2, 0.5, 0.2]
                }}
                transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-3/4 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                animate={{ 
                  y: [0, 10, 0, -10, 0],
                  opacity: [0.3, 0.6, 0.3, 0.1, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              />
            </motion.div>
            
            <div className="w-full max-w-md mx-auto px-6 z-10 flex flex-col items-center relative">
              <div className="w-full flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="relative overflow-hidden group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    variants={menuItemVariants}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`
                      w-full px-4 py-3 rounded-xl 
                      flex items-center
                      bg-gradient-to-r 
                      ${activeSection === item.id ? 
                        `${item.color} shadow-lg shadow-${item.color.split('-')[3]}/20` : 
                        'from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                      }
                      transition-all duration-300
                    `}>
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full
                        flex items-center justify-center
                        ${activeSection === item.id ? 
                          'bg-white text-xl' : 
                          'bg-gray-700 text-lg group-hover:bg-gray-600'
                        }
                        transition-all duration-300
                        mr-3
                      `}>
                        <span>{item.icon}</span>
                      </div>
                      
                      <div className="flex-grow">
                        <span className={`
                          text-lg font-bold
                          ${activeSection === item.id ? 'text-white' : 'text-white/80 group-hover:text-white'}
                          transition-colors duration-300
                        `}>
                          {item.label}
                        </span>
                      </div>
                      
                      <motion.div 
                        className={`
                          w-5 h-5 flex items-center justify-center
                          ${activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                          transition-opacity duration-300
                        `}
                        animate={activeSection === item.id ? 
                          { x: [0, 5, 0], transition: { repeat: Infinity, duration: 1.5 } } : 
                          {}
                        }
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {activeSection === item.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-white/30"
                        layoutId="activeNavItem"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 flex items-center space-x-4 opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                <a 
                  href="https://www.instagram.com/prxx.ws?igsh=ODJveGxmcTJva2tp" 
                  className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"
                  aria-label="Instagram"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/16F1thRoHY/" 
                  className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white"
                  aria-label="Facebook"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </motion.div>
              
              <motion.div 
                className="text-center mt-8 text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p>© 2025 Sirivimol Maneerat</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;