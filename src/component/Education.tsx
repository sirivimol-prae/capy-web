"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, Award, Calendar, GraduationCap, Briefcase } from "lucide-react";

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("education");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-red-500/30 h-px"
            style={{
              top: `${20 + i * 15}%`,
              left: '0',
              right: '0',
              height: '1px',
              transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-3xl w-full"
          >
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 shadow-2xl">
              <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 rounded-full bg-red-500 opacity-70"></div>
              <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:-left-4 w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 rounded-full bg-red-600 opacity-60"></div>
              
              <div className="flex flex-col md:flex-row gap-6 sm:gap-7 md:gap-8 items-center">
              <motion.div
                className="md:w-1/3 flex justify-center mb-6 md:mb-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-500 rounded-full opacity-70 blur-sm"
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />

                  <div className="absolute -inset-4 sm:-inset-5 md:-inset-6 flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute w-1 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-yellow-500 to-yellow-200 opacity-60 rounded-full"
                        style={{ 
                          transformOrigin: "center 150%",
                          transform: `rotate(${i * 45}deg)` 
                        }}
                        animate={{ 
                          opacity: [0.2, 0.6, 0.2],
                          height: ["20px", "30px", "20px"]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>

                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-white shadow-xl overflow-hidden flex items-center justify-center relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50 opacity-90" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <path
                            id="circlePath"
                            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                            fill="none"
                          />
                        </defs>
                        <text className="text-blue-700 font-semibold" textAnchor="middle" dominantBaseline="middle">
                          <textPath xlinkHref="#circlePath" startOffset="25%" fontSize="7" textAnchor="middle">
                            • PRINCE OF SONGKLA UNIVERSITY •
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    
                    <motion.img
                      src="/uploads/psu_logo.png"
                      alt="Prince of Songkla University Logo"
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain relative z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, 0, -1, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-blue-900/20 to-transparent blur-md -z-10 transform translate-y-1/2 scale-75 rounded-full"></div>
                </div>
              </motion.div>
                
                <div className="md:w-2/3">
                  <div className="text-center md:text-left">
                    <motion.h3 
                      className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-2 sm:mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Bachelor of Business Administration
                    </motion.h3>
                    
                    <motion.h4
                      className="text-lg sm:text-xl text-white mb-2" 
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <span className="text-red-300">Business Information Systems</span>
                    </motion.h4>
                    
                    <motion.div
                      className="flex flex-wrap items-center justify-center md:justify-start text-base sm:text-lg text-gray-300 mb-4 sm:mb-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <GraduationCap className="mr-2 text-red-400" size={16} />
                      Prince of Songkla University, Hat Yai Campus
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div className="flex items-center bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="p-2 rounded-full bg-red-500/20 mr-3">
                        <Award className="text-red-400" size={16} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400">GPA</div>
                        <div className="text-lg sm:text-xl font-semibold text-white">3.59</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="p-2 rounded-full bg-red-500/20 mr-3">
                        <Calendar className="text-red-400" size={16} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400">Duration</div>
                        <div className="text-sm sm:text-base text-white">June 2021 - <br className="sm:hidden" /> March 2025</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <h4 className="text-base sm:text-lg font-medium text-red-400 mb-2 sm:mb-3 flex items-center">
                  <Briefcase size={16} className="mr-2" /> Key Skills Acquired
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    "Web Development", 
                    "Database Design", 
                    "UI/UX Principles",
                    "Business Analysis", 
                    "Mobile Application", 
                    "Project Management"
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center text-gray-300 text-sm sm:text-base bg-gray-800/30 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                    >
                      <ChevronRight size={12} className="text-red-400 mr-1" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
            </div>
            
            <div className="absolute inset-0 rounded-2xl bg-red-500/5 blur-xl -z-10 transform translate-y-4 scale-95 opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;