"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  }, []);
  
  return (
    <section
      id="head"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 via-black to-black text-white px-4 sm:px-6 relative overflow-hidden"
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

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-10">
        <motion.div
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-500 shadow-2xl relative">
            <img
              src="/uploads/profile.jpg"
              alt="profile"
              className="w-full h-full object-cover scale-110 transition-transform duration-300"
            />
          </div>

          <motion.div 
            className="absolute -top-6 -left-6 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-red-600 opacity-70"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-4 -right-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-red-400 opacity-70"
            animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <div className="max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-2 text-red-400 font-medium"
          >
            Welcome to my Website!
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="text-red-400">Sirivimol</span>
          </motion.h1>

          <motion.div 
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start">
              <span className="text-gray-300 mr-2">I'm a</span>
              <div className="inline-block relative h-8 min-w-56 sm:min-w-80">
                <motion.span
                  key={roleIndex}
                  className="text-red-300 font-medium absolute left-0 right-0 lg:right-auto text-center lg:text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Specialized in creating beautiful, functional, 
            <br className="hidden sm:block" />
            and user-friendly digital experiences with attention 
            <br className="hidden sm:block" />
            to detail and focus on performance.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: loaded ? 0.7 : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
        initial={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-1">
            <motion.div
              className="w-1.5 h-1.5 bg-red-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Head;