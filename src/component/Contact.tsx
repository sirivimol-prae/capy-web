"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, Copy, Check } from "lucide-react";

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
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      copyButton: true,
      selectable: true,
      action: () => {},
      clickAction: () => window.open("mailto:sirivimol.prae@gmail.com")
    },
    {
      type: "phone",
      value: "093-602-2389",
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      copyButton: false,
      selectable: false,
      action: () => {},
      clickAction: () => window.location.href = "tel:0936022389"
    },
    {
      type: "address",
      value: "64/2 Moo 7 Thungprang, Sichon, Nakhon Si Thammarat",
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      copyButton: false,
      selectable: false,
      action: () => {},
      clickAction: () => {}
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
    <section id="contact" className="py-24 bg-gradient-to-t from-black via-gray-900 to-black text-white relative overflow-hidden">
      <style jsx global>{`
        .email-selectable {
          user-select: all !important;
          -webkit-user-select: all !important;
          -moz-user-select: all !important;
          -ms-user-select: all !important;
          cursor: text !important;
        }
        
        .non-selectable {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          cursor: default !important;
        }
        
        .phone-clickable {
          cursor: pointer !important;
        }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden">
        {FIXED_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-red-500"
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
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
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Send className="w-8 h-8 text-white transform -rotate-45" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let&apos;s create something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.type}
              className="relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div 
                onClick={item.type === "phone" ? item.clickAction : undefined}
                className={`${item.type === "phone" ? "cursor-pointer" : ""} bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 h-full border border-gray-700 hover:border-red-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-900/20 relative overflow-hidden flex flex-col items-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isCopied === item.type ? 1 : 0, y: isCopied === item.type ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Copied!
                </motion.div>
                
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    item.clickAction();
                  }}
                  className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white mb-4 shadow-md shadow-red-600/20 group-hover:shadow-lg group-hover:shadow-red-600/40 transition-all duration-300 group-hover:scale-110 cursor-pointer"
                >
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{item.label}</h3>
                
                {item.type === "email" ? (
                  <div 
                    className="email-selectable text-gray-300 text-center mb-2 flex-grow"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    sirivimol.prae@gmail.com
                  </div>
                ) : item.type === "phone" ? (
                  <p className="phone-clickable text-gray-300 text-center mb-2 flex-grow">
                    {item.value}
                  </p>
                ) : (
                  <p className="non-selectable text-gray-300 text-center mb-2 flex-grow">
                    {item.value}
                  </p>
                )}
                
                {item.type === "email" && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard("sirivimol.prae@gmail.com", "email");
                    }}
                    className="text-red-400 text-sm flex items-center mt-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <span className="mr-1">Click to copy</span>
                    {isCopied === "email" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                )}
                
                {item.type === "phone" && (
                  <div className="text-red-400 text-sm flex items-center mt-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Tap to call</span>
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a 
            href="https://www.instagram.com/prxx.ws?igsh=ODJveGxmcTJva2tp" 
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            aria-label="Instagram"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
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
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            aria-label="Facebook"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
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
          className="text-center mt-16 text-gray-400"
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