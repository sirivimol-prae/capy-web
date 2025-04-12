"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const FIXED_PARTICLES = [
  { top: "10%", left: "15%", opacity: 0.2 },
  { top: "25%", left: "65%", opacity: 0.15 },
  { top: "35%", left: "25%", opacity: 0.25 },
  { top: "45%", left: "80%", opacity: 0.18 },
  { top: "60%", left: "35%", opacity: 0.22 },
  { top: "70%", left: "70%", opacity: 0.12 },
  { top: "85%", left: "20%", opacity: 0.2 },
  { top: "15%", left: "40%", opacity: 0.15 },
  { top: "48%", left: "10%", opacity: 0.18 },
  { top: "90%", left: "60%", opacity: 0.2 },
  { top: "30%", left: "90%", opacity: 0.15 },
  { top: "55%", left: "45%", opacity: 0.25 },
  { top: "75%", left: "85%", opacity: 0.15 },
  { top: "5%", left: "50%", opacity: 0.2 },
  { top: "95%", left: "30%", opacity: 0.18 }
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [particles, setParticles] = useState(FIXED_PARTICLES);

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

    const section = document.getElementById("contact");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(type);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const contactInfo = [
    {
      type: "email",
      value: "sirivimol.prae@gmail.com",
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Email",
      action: () => copyToClipboard("sirivimol.prae@gmail.com", "email")
    },
    {
      type: "phone",
      value: "093-602-2389",
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Phone",
      action: () => copyToClipboard("0936022389", "phone")
    },
    {
      type: "address",
      value: "64/2 Moo 7 Thungprang, Sichon, Nakhon Si Thammarat",
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Address",
      action: () => copyToClipboard("64/2 Moo 7 Thungprang, Sichon, Nakhon Si Thammarat", "address")
    }
  ];

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0.7, 0.3, 0.7],
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-gradient-to-t from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity
            }}
            variants={particleVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={i}
          />
        ))}
      </div>

      <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
      <div className="absolute right-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-3"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Send className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white transform -rotate-45" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          
          <motion.p
            className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's create something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.type}
              className="relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div onClick={item.action} className="cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 sm:p-5 md:p-6 h-full border border-gray-700 hover:border-red-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-900/20 relative overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isCopied === item.type ? 1 : 0, y: isCopied === item.type ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Copied!
                </motion.div>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 shadow-md shadow-red-600/20 group-hover:shadow-lg group-hover:shadow-red-600/40 transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.label}</h3>
                
                <p className="text-sm sm:text-base text-gray-300 text-center mb-4 flex-grow">
                  {item.value}
                </p>
                
                <div className="text-red-400 text-xs sm:text-sm flex items-center mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Click to copy</span>
                  <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a 
            href="https://www.instagram.com/prxx.ws?igsh=ODJveGxmcTJva2tp" 
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            aria-label="Instagram"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="18" 
              height="18"
              className="sm:w-5 sm:h-5" 
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
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            aria-label="Facebook"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="18" 
              height="18"
              className="sm:w-5 sm:h-5" 
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
          className="text-center mt-10 sm:mt-16 text-gray-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>© 2025 Sirivimol Maneerat. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;