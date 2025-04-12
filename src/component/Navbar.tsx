"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
      
      const sections = ["head", "about", "education", "skills", "contact"];
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault(); // ป้องกันการทำงานปกติของลิงก์
    setMobileMenuOpen(false); // ปิดเมนูมือถือ (ถ้าเปิด)
    
    // ค้นหา element ของส่วนที่ต้องการเลื่อนไป
    const section = document.getElementById(sectionId);
    
    if (section) {
      // สร้างเอฟเฟกต์เลื่อนแบบอลังการ
      const startPosition = window.scrollY;
      const targetPosition = section.offsetTop;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 วินาที
      let start: number | null = null;
      
      // สร้างเอฟเฟกต์แสงสีแดงตามขอบจอ
      const flashEffect = document.createElement('div');
      flashEffect.style.position = 'fixed';
      flashEffect.style.top = '0';
      flashEffect.style.left = '0';
      flashEffect.style.width = '100%';
      flashEffect.style.height = '100%';
      flashEffect.style.boxShadow = 'inset 0 0 40px rgba(255, 0, 0, 0)';
      flashEffect.style.pointerEvents = 'none';
      flashEffect.style.zIndex = '9999';
      flashEffect.style.transition = 'box-shadow 0.5s ease-in-out';
      document.body.appendChild(flashEffect);
      
      // แสดงเอฟเฟกต์แสงแวบ
      setTimeout(() => {
        flashEffect.style.boxShadow = 'inset 0 0 40px rgba(255, 0, 0, 0.5)';
        setTimeout(() => {
          flashEffect.style.boxShadow = 'inset 0 0 40px rgba(255, 0, 0, 0)';
          setTimeout(() => {
            document.body.removeChild(flashEffect);
          }, 500);
        }, 150);
      }, 0);
      
      // ฟังก์ชัน easing - แบบ easeInOutCubic สำหรับการเคลื่อนไหวแบบนุ่มนวลและดูเป็นธรรมชาติ
      function easeInOutCubic(t: number): number {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      
      // ฟังก์ชันที่ทำงานในแต่ละเฟรมของการเลื่อน
      function animate(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      }
      
      // เริ่มทำการเลื่อน
      window.requestAnimationFrame(animate);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/85 backdrop-blur-md shadow-lg shadow-red-900/10" : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center text-white">
          <motion.span 
            className="text-2xl font-bold cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleLinkClick(e as any, "head")}
          >
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Capy-Web</span>
          </motion.span>

          <div className="space-x-8 hidden md:flex items-center">
            {["about", "education", "skills", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={(e) => handleLinkClick(e, item)}
                className={`relative font-medium transition-colors duration-300 ${
                  activeSection === item 
                    ? "text-red-400" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                <span className="capitalize">{item}</span>
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

          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                }`} 
              />
              <span 
                className={`absolute h-0.5 bg-white transform transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 w-0" : "opacity-100 w-6 top-2"
                }`} 
              />
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                }`} 
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <motion.div 
        className={`fixed top-0 left-0 w-full h-screen bg-black/95 z-40 md:hidden flex flex-col justify-center items-center space-y-8 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? 0 : "-100%"
        }}
        transition={{ duration: 0.3 }}
      >
        {["head", "about", "education", "skills", "contact"].map((item) => (
          <motion.a
            key={item}
            href={`#${item}`}
            className="text-3xl font-bold text-white/90 hover:text-red-400 transition-colors"
            onClick={(e) => handleLinkClick(e, item)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="capitalize">{item === "head" ? "Intro" : item}</span>
          </motion.a>
        ))}
      </motion.div>
    </>
  );
};

export default Navbar;