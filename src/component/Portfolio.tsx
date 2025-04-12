"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
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

    const section = document.getElementById("portfolio");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  const portfolioItems = [
    {
      id: "website",
      title: "Dangers of E-cigarettes",
      icon: "🌐",
      description: "Using HTML, CSS, and JavaScript",
      image: "/uploads/web.png",
      link: "https://soopburee.onrender.com/",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "mobile-app",
      title: "Mobile Application",
      icon: "📱",
      description: "An app developed to campaign against bullying using android studio",
      image: "/uploads/app.png",
      link: "https://play.google.com/store/apps/details?id=com.healjai.bullyapp",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "resume",
      title: "Interactive Resume",
      icon: "📄",
      description: "View my professional resume with detailed work experience",
      image: "/uploads/resume.png",
      link: "https://www.canva.com/design/DAGkJinBE1k/hyrNfEwneaNhy4z9lrpyVQ/edit?utm_content=DAGkJinBE1k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              My Work
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Check out my latest projects and work
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {portfolioItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-full bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
                
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg mr-3`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm sm:text-base flex-grow">{item.description}</p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-700/50">
                    <div className="flex items-center text-purple-400 text-sm sm:text-base group-hover:text-purple-300 transition-colors duration-300">
                      <span>Visit project</span>
                      <motion.span 
                        className="ml-2 inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;