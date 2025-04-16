"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const backgroundLines = [
  { top: "25%", left: "10%", width: "250px", rotate: "45deg" },
  { top: "75%", left: "20%", width: "300px", rotate: "135deg" },
  { top: "35%", left: "80%", width: "200px", rotate: "225deg" },
  { top: "60%", left: "50%", width: "350px", rotate: "315deg" },
  { top: "10%", left: "30%", width: "280px", rotate: "90deg" },
  { top: "85%", left: "85%", width: "220px", rotate: "180deg" },
  { top: "45%", left: "5%", width: "320px", rotate: "270deg" },
  { top: "15%", left: "65%", width: "270px", rotate: "30deg" },
  { top: "65%", left: "75%", width: "300px", rotate: "120deg" },
  { top: "95%", left: "40%", width: "240px", rotate: "210deg" }
];

const Head = () => {
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = ["Front-End Developer", "UI/UX Designer", "Web Enthusiast"];
  
  useEffect(() => {
    setLoaded(true);
    
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [roles.length]);
  
  return (
    <section
      id="head"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 via-black to-black text-white px-4 md:px-6 relative overflow-hidden md:pt-0"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {backgroundLines.map((line, i) => (
            <div 
              key={i}
              className="absolute bg-red-500/30"
              style={{
                top: line.top,
                left: line.left,
                width: line.width,
                height: '1px',
                transform: `rotate(${line.rotate})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 z-10">
        <motion.div
          className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 mt-2 mb-6 md:mt-0 md:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-500 shadow-2xl relative">
            <Image
              src="/uploads/profile.jpg"
              alt="profile"
              className="w-full h-full object-cover scale-110 transition-transform duration-300"
              width={400}
              height={400}
            />
          </div>

          <motion.div 
            className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 opacity-70"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-3 -right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-400 opacity-70"
            animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <div className="max-w-xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-2 text-red-400 font-medium text-sm sm:text-base md:text-lg"
          >
            Welcome to my Website!
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I&apos;m <span className="text-red-400">Sirivimol</span>
          </motion.h1>

          <motion.div 
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center justify-center md:justify-start">
              <div className="text-gray-300 whitespace-nowrap">I&apos;m a</div>
              <div className="ml-2 relative overflow-visible">
                <div className="text-red-300 font-medium whitespace-nowrap">
                  {roles[roleIndex]}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-gray-300 max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Specialized in creating beautiful, functional, 
            and user-friendly digital experiences with attention 
            to detail and focus on performance.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: loaded ? 0.7 : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
        initial={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400 rounded-full flex justify-center pt-1">
            <motion.div
              className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-400 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Head;