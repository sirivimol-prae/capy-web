"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Component แสดงปุ่มเลื่อนขึ้นด้านบน (Scroll to Top)
 * ที่มีเอฟเฟกต์สวยงามแบบ interactive
 * แสดงในมุมขวาล่างของหน้าจอเมื่อเลื่อนลงมาเกิน 300px
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // ตรวจสอบว่าควรแสดงปุ่มหรือไม่ (เมื่อเลื่อนลงมาเกิน 300px)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ฟังก์ชันเลื่อนขึ้นด้านบน
  const scrollToTop = () => {
    setIsClicked(true);
    
    // เลื่อนอย่างนุ่มนวลไปที่ด้านบนของหน้า
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // รีเซ็ตสถานะคลิกหลังจากเลื่อนเสร็จ
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
    
    // เพิ่มการสั่นด้วย Web Vibration API (เฉพาะมือถือที่รองรับ)
    if (navigator.vibrate) {
      navigator.vibrate([15, 30, 15]);
    }
  };

  // เอฟเฟกต์พาร์ทิเคิลเมื่อคลิกปุ่ม
  const particles = Array.from({ length: 16 }, (_, i) => i);
  
  // สีของพาร์ทิเคิล
  const particleColors = [
    "bg-red-300", "bg-red-400", "bg-red-500", 
    "bg-yellow-300", "bg-orange-300", "bg-white"
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="เลื่อนขึ้นด้านบน"
          >
            {/* ปุ่มและแสงเรืองแสง */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-red-500 to-red-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* วงกลมเรืองแสงเบื้องหลัง */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isHovered
                  ? "0 0 20px 5px rgba(239, 68, 68, 0.7)"
                  : "0 0 5px 0px rgba(239, 68, 68, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* ไอคอนลูกศรและเอฟเฟกต์ */}
            <div className="relative">
              {/* ลูกศรหลัก */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{
                  y: isHovered ? -2 : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 10,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "reverse" 
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </motion.svg>
              
              {/* เงาลูกศร */}
              {isHovered && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 absolute top-0 left-0 text-white/30 blur-sm z-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ 
                    duration: 1.2,
                    repeat: Infinity
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </motion.svg>
              )}
            </div>
            
            {/* เอฟเฟกต์สายฟ้าเมื่อกดปุ่ม */}
            <AnimatePresence>
              {isClicked && (
                <>
                  {/* วงแสงสว่างจ้าหลายชั้น */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* วงแสงสีแดง */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-red-500"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                  
                  {/* พาร์ทิเคิลกระจายออกแบบสุ่มสี */}
                  {particles.map((i) => {
                    // สุ่มสีจาก particleColors
                    const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
                    // สุ่มขนาดพาร์ทิเคิล
                    const size = Math.random() * 3 + 1;
                    // สุ่มระยะทางที่พาร์ทิเคิลจะกระจายออกไป (30-50px)
                    const distance = Math.random() * 20 + 30;
                    
                    return (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full ${randomColor}`}
                        style={{ width: `${size}px`, height: `${size}px` }}
                        initial={{ 
                          scale: 0,
                          x: 0, 
                          y: 0,
                          opacity: 1
                        }}
                        animate={{ 
                          scale: [1, 0.8, 0],
                          opacity: [1, 0.8, 0],
                          x: Math.cos(i / particles.length * Math.PI * 2) * distance, 
                          y: Math.sin(i / particles.length * Math.PI * 2) * distance
                        }}
                        transition={{ 
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      />
                    );
                  })}
                </>
              )}
            </AnimatePresence>
            
            {/* เรเดียลเกรเดียนท์เรืองแสงเมื่อโฮเวอร์ */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-red-300 to-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* วงแหวนเรืองแสงเมื่อโฮเวอร์ */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute -inset-1 rounded-full border-2 border-red-300/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* ข้อความทูลทิป - แสดงเฉพาะบนจอขนาดกลางขึ้นไป */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute top-0 right-full mr-3 hidden sm:block bg-gradient-to-r from-gray-900/90 to-red-900/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-xs sm:text-sm whitespace-nowrap border border-red-500/20 shadow-lg"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative inline-block">
                  <span className="relative z-10">Back to top!</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 bg-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;