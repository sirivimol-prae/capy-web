"use client";

import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { skillsData, skillCategories } from "./skillData";
import Image from "next/image";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [previousCategory, setPreviousCategory] = useState(skillCategories[0].id);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const controlsRef = useRef(null);

  const filteredSkills = skillsData.filter(skill => skill.category === activeCategory);
  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory)!;

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
      if (section) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeCategory !== previousCategory) {
      setPreviousCategory(activeCategory);
      
      const timer = setTimeout(() => {
        setActiveSkillIndex(0);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [activeCategory, previousCategory]);

  const handlePrev = () => {
    if (activeSkillIndex > 0) {
      setActiveSkillIndex(activeSkillIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeSkillIndex < filteredSkills.length - 1) {
      setActiveSkillIndex(activeSkillIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setActiveSkillIndex(index);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e 
      ? (e as React.TouchEvent).touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    setStartX(clientX);
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e 
      ? (e as React.TouchEvent).touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    const distance = clientX - startX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragDistance < -50 && activeSkillIndex < filteredSkills.length - 1) {
      setActiveSkillIndex(activeSkillIndex + 1);
    }
    else if (dragDistance > 50 && activeSkillIndex > 0) {
      setActiveSkillIndex(activeSkillIndex - 1);
    }
    
    setDragDistance(0);
  };
  
  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 && activeSkillIndex < filteredSkills.length - 1) {
      setActiveSkillIndex(activeSkillIndex + 1);
    }
    else if (info.offset.x > 50 && activeSkillIndex > 0) {
      setActiveSkillIndex(activeSkillIndex - 1);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);
    }
  };

  const categoryButtonVariants = {
    initial: { 
      scale: 0.9, 
      opacity: 0
    },
    animate: (i: number) => ({ 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: 0.1 * i,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      } 
    }),
    hover: { 
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    },
    active: {
      scale: 1.05,
      y: -2,
    }
  };

  const categoryContainerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 bg-black text-white relative overflow-hidden">
      <motion.div 
        className="absolute h-px w-full left-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
        initial={{ opacity: 0, top: "25%" }}
        animate={isVisible ? { opacity: 1, top: ["25%", "35%", "25%"] } : {}}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute h-px w-full left-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        initial={{ opacity: 0, top: "45%" }}
        animate={isVisible ? { opacity: 1, top: ["45%", "55%", "45%"] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.div 
        className="absolute h-px w-full left-0 bg-gradient-to-r from-transparent via-purple-500/25 to-transparent"
        initial={{ opacity: 0, top: "65%" }}
        animate={isVisible ? { opacity: 1, top: ["65%", "75%", "65%"] } : {}}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 4 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-500 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            className="absolute -z-10 w-20 h-20 rounded-full bg-red-500/5 blur-xl"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: "10%", top: "20%" }}
          />
          <motion.div
            className="absolute -z-10 w-24 h-24 rounded-full bg-blue-500/5 blur-xl"
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 20, -20, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
            style={{ right: "15%", top: "10%" }}
          />
          <motion.div
            className="absolute -z-10 w-16 h-16 rounded-full bg-purple-500/5 blur-xl"
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -25, 25, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            style={{ left: "25%", bottom: "20%" }}
          />

          {skillCategories.map((category, i) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl flex flex-col items-center transition-all duration-300 overflow-hidden ${
                activeCategory === category.id 
                  ? category.gradient + " border border-" + category.borderColor.split('-')[1]
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
              variants={categoryButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={i}
              style={{ transformOrigin: "center bottom" }}
            >
              {activeCategory === category.id && (
                <motion.div
                  className={`absolute inset-0 ${category.gradient.replace('20', '40')} opacity-0`}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )}

              <motion.span 
                className={`text-lg sm:text-xl mb-1 ${
                  activeCategory === category.id 
                    ? "text-white" 
                    : "text-gray-400"
                }`}
                animate={
                  activeCategory === category.id 
                    ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                        transition: {
                          scale: { duration: 0.5 },
                          rotate: { duration: 0.5, delay: 0.2 }
                        }
                      } 
                    : {}
                }
              >
                {category.icon}
              </motion.span>
              
              <span className={`font-medium text-xs sm:text-sm md:text-base text-center ${
                activeCategory === category.id 
                  ? "text-white" 
                  : "text-gray-300"
              }`}>
                {category.name}
              </span>
              
              {activeCategory === category.id && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${category.color}`}
                  layoutId="category-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategoryData.id}
              className="text-gray-400 text-sm md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategoryData.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="relative w-full mx-auto mb-6 sm:mb-8"
            variants={categoryContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ height: "280px", minHeight: "280px" }}
          >
            {activeSkillIndex > 0 && (
              <motion.button 
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 text-white flex items-center justify-center transition-colors ${
                  activeCategoryData.id === 'webdev' ? 'hover:bg-red-600' :
                  activeCategoryData.id === 'languages' ? 'hover:bg-blue-600' :
                  'hover:bg-purple-600'
                }`}
                onClick={handlePrev}
                aria-label="Previous skill"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg sm:text-xl">&larr;</span>
              </motion.button>
            )}

            {activeSkillIndex < filteredSkills.length - 1 && (
              <motion.button 
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 text-white flex items-center justify-center transition-colors ${
                  activeCategoryData.id === 'webdev' ? 'hover:bg-red-600' :
                  activeCategoryData.id === 'languages' ? 'hover:bg-blue-600' :
                  'hover:bg-purple-600'
                }`}
                onClick={handleNext}
                aria-label="Next skill"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg sm:text-xl">&rarr;</span>
              </motion.button>
            )}

            <motion.div 
              className="relative flex justify-center items-center h-full overflow-hidden cursor-grab active:cursor-grabbing"
              ref={controlsRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onPanEnd={handlePanEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div className="relative flex justify-center items-center w-full h-full">
                {filteredSkills.map((skill, index) => {
                  const isActive = index === activeSkillIndex;
                  const isPrev = index === activeSkillIndex - 1;
                  const isNext = index === activeSkillIndex + 1;
                  const isDimmed = !isActive && !isPrev && !isNext;
                  
                  let xPosition = 0;
                  if (isActive) {
                    xPosition = 0; 
                  } else if (isPrev) {
                    xPosition = -200;
                  } else if (isNext) {
                    xPosition = 200;
                  } else {
                    xPosition = index < activeSkillIndex ? -400 : 400;
                  }
                  
                  let textColorClass = "";
                  if (activeCategoryData.id === 'webdev') {
                    textColorClass = "text-red-400";
                  } else if (activeCategoryData.id === 'languages') {
                    textColorClass = "text-blue-400";
                  } else {
                    textColorClass = "text-purple-400";
                  }
                  
                  let shadowStyle = {};
                  if (isActive) {
                    if (activeCategoryData.id === 'webdev') {
                      shadowStyle = { boxShadow: "0 0 20px 5px rgba(239, 68, 68, 0.3)" };
                    } else if (activeCategoryData.id === 'languages') {
                      shadowStyle = { boxShadow: "0 0 20px 5px rgba(37, 99, 235, 0.3)" };
                    } else {
                      shadowStyle = { boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.3)" };
                    }
                  }
                  
                  return (
                    <motion.div 
                      key={skill.id}
                      className="absolute flex justify-center items-center"
                      initial={{ 
                        x: index < activeSkillIndex ? -400 : 400,
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{ 
                        x: isDragging ? xPosition + dragDistance : xPosition,
                        opacity: isDimmed ? 0 : 1,
                        scale: isActive ? 1 : 0.8,
                        y: isActive ? 0 : 10,
                        zIndex: isActive ? 20 : 10
                      }}
                      transition={{ 
                        duration: isDragging ? 0 : 0.5
                      }}
                    >
                      <div 
                        className={`bg-gray-900 rounded-xl overflow-hidden ${
                          isActive ? `ring-1 ${
                            activeCategoryData.id === 'webdev' ? 'ring-red-500/50' :
                            activeCategoryData.id === 'languages' ? 'ring-blue-500/50' :
                            'ring-purple-500/50'
                          }` : ''
                        }`}
                        style={{
                          width: isActive ? 220 : 180,
                          height: isActive ? 260 : 210,
                          ...shadowStyle
                        }}
                      >
                        <div className="w-full h-[75%] overflow-hidden relative">
                          <Image 
                            src={skill.image}
                            alt={`${skill.name} icon`} 
                            className="w-full h-full object-cover"
                            width={220}
                            height={165}
                            draggable={false}
                          />
                        </div>
                        <div className="p-2 sm:p-3 text-center">
                          <h3 className={`text-base sm:text-lg font-bold ${isActive ? textColorClass : 'text-white'}`}>
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
              {filteredSkills.map((_, idx) => {
                let dotColorClass = "bg-gray-700";
                let dotSizeClass = "w-1.5 h-1.5 sm:w-2 sm:h-2";
                
                if (idx === activeSkillIndex) {
                  dotSizeClass = "w-2 h-2 sm:w-2.5 sm:h-2.5";
                  if (activeCategoryData.id === 'webdev') {
                    dotColorClass = "bg-red-500";
                  } else if (activeCategoryData.id === 'languages') {
                    dotColorClass = "bg-blue-500";
                  } else {
                    dotColorClass = "bg-purple-500";
                  }
                }
                
                return (
                  <motion.button
                    key={idx}
                    className={`rounded-full transition-all duration-300 ${dotColorClass} ${dotSizeClass}`}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to skill ${idx + 1}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.03 * idx, duration: 0.2 }}
                    whileHover={{ scale: 1.5 }}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="text-center text-gray-500 text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="inline-block animate-bounce mr-1">👆</span>
          {isTouchDevice ? 
            "Swipe or use arrows to explore more skills" : 
            "Use arrows to explore more skills"
          }
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;