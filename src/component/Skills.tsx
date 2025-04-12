"use client";

import { motion, useAnimation, PanInfo } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { skillsData, skillCategories } from "./skillData";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const controlsRef = useRef(null);

  const filteredSkills = skillsData.filter(skill => skill.category === activeCategory);
  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory)!;

  useEffect(() => {
    // ตรวจสอบว่าเป็นอุปกรณ์ที่รองรับ touch หรือไม่ (แต่ไม่ส่งผลต่อการแสดงปุ่มนำทาง)
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
    setActiveSkillIndex(0);
  }, [activeCategory]);

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
    // ดึงค่า X จาก touch หรือ mouse event
    const clientX = 'touches' in e 
      ? (e as React.TouchEvent).touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    setStartX(clientX);
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    // ดึงค่า X จาก touch หรือ mouse event
    const clientX = 'touches' in e 
      ? (e as React.TouchEvent).touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    const distance = clientX - startX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // ถ้า swipe ไปทางซ้ายมากกว่า 50px ให้ไปรูปถัดไป
    if (dragDistance < -50 && activeSkillIndex < filteredSkills.length - 1) {
      setActiveSkillIndex(activeSkillIndex + 1);
    }
    // ถ้า swipe ไปทางขวามากกว่า 50px ให้ไปรูปก่อนหน้า
    else if (dragDistance > 50 && activeSkillIndex > 0) {
      setActiveSkillIndex(activeSkillIndex - 1);
    }
    
    setDragDistance(0);
  };
  
  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // ถ้า swipe ไปทางซ้าย (ค่า delta.x เป็นลบ) ให้ไปรูปถัดไป
    if (info.offset.x < -50 && activeSkillIndex < filteredSkills.length - 1) {
      setActiveSkillIndex(activeSkillIndex + 1);
    }
    // ถ้า swipe ไปทางขวา (ค่า delta.x เป็นบวก) ให้ไปรูปก่อนหน้า
    else if (info.offset.x > 50 && activeSkillIndex > 0) {
      setActiveSkillIndex(activeSkillIndex - 1);
    }
  };

  const getCategoryColorClass = (baseClass: string) => {
    if (activeCategoryData.id === 'webdev') {
      return baseClass.replace('COLOR', 'red');
    } else if (activeCategoryData.id === 'languages') {
      return baseClass.replace('COLOR', 'blue');
    } else {
      return baseClass.replace('COLOR', 'purple');
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-500 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg flex flex-col items-center transition-all duration-300 ${
                activeCategory === category.id 
                  ? category.gradient
                  : "bg-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg sm:text-xl mb-1">{category.icon}</span>
              <span className="font-medium text-xs sm:text-sm md:text-base text-center">
                {category.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="relative w-full mx-auto mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ height: "280px", minHeight: "280px" }}
        >
          {/* ปุ่มนำทางจะแสดงเสมอ ไม่ว่าจะเป็นอุปกรณ์ประเภทใด */}
          {activeSkillIndex > 0 && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={handlePrev}
              aria-label="Previous skill"
            >
              <span className="text-lg sm:text-xl">&larr;</span>
            </button>
          )}

          {activeSkillIndex < filteredSkills.length - 1 && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={handleNext}
              aria-label="Next skill"
            >
              <span className="text-lg sm:text-xl">&rarr;</span>
            </button>
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
                    initial={{ x: index < activeSkillIndex ? -400 : 400 }}
                    animate={{ 
                      x: isDragging ? xPosition + dragDistance : xPosition,
                      opacity: isDimmed ? 0 : 1,
                      scale: isActive ? 1 : 0.8,
                      y: isActive ? 0 : 10,
                      zIndex: isActive ? 20 : 10
                    }}
                    transition={{ duration: isDragging ? 0 : 0.5 }}
                  >
                    <div 
                      className={`bg-gray-900 rounded-xl overflow-hidden ${
                        isActive ? 'ring-1 ring-red-500/50' : ''
                      }`}
                      style={{
                        width: isActive ? 220 : 180,
                        height: isActive ? 260 : 210,
                        ...shadowStyle
                      }}
                    >
                      <div className="w-full h-[75%] overflow-hidden">
                        <img 
                          src={skill.image}
                          alt={`${skill.name} icon`} 
                          className="w-full h-full object-cover"
                          draggable="false"
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
              
              if (idx === activeSkillIndex) {
                if (activeCategoryData.id === 'webdev') {
                  dotColorClass = "bg-red-500 scale-110";
                } else if (activeCategoryData.id === 'languages') {
                  dotColorClass = "bg-blue-500 scale-110";
                } else {
                  dotColorClass = "bg-purple-500 scale-110";
                }
              }
              
              return (
                <button
                  key={idx}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${dotColorClass}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to skill ${idx + 1}`}
                />
              );
            })}
          </div>
        </motion.div>
        
        <div className="text-center text-gray-500 text-xs sm:text-sm md:text-base">
          <span className="inline-block animate-bounce mr-1">👆</span>
          {isTouchDevice ? 
            "Swipe or use arrows to explore more skills" : 
            "Use arrows to explore more skills"
          }
        </div>
      </div>
    </section>
  );
};

export default Skills;