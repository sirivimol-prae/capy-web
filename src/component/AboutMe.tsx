"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const AboutMe = () => {
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

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden border-4 border-red-500 shadow-2xl mx-auto w-64 h-64 md:w-72 md:h-72">
              <Image
                src="/uploads/profile3.jpg"
                alt="profile"
                className="relative -top-20 scale-170 -left-6"
                width={400}
                height={400}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-red-400 mb-4">Sirivimol Maneerat</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                I hold a Bachelor&apos;s degree in Business Information Systems from the Faculty of Management Sciences, Prince of Songkla University 
                (Hat Yai Campus), with a cumulative GPA of 3.59.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                I have hands-on experience in front-end development for websites and applications 
                as a full-time employee, part-time roles, and freelance projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in designing and building user interfaces that are both functional and 
                user-friendly. I&apos;m passionate about crafting high-quality digital experiences with close attention to detail, 
                always aiming to meet user needs and exceed expectations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;