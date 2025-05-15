'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCoins, FaWallet, FaPlane } from 'react-icons/fa';
import { cn } from '../utils/cn';

const features = [
  {
    icon: <FaUsers className="text-4xl text-[var(--accent-gold)]" />,
    title: "Free Travel Opportunities",
    description: "Enjoy the chance to explore destinations around the world at no cost through our exclusive travel program.",
    color: "from-blue-500/20 to-purple-500/20",
    delay: 0.1
  },
  {
    icon: <FaCoins className="text-4xl text-[var(--accent-gold)]" />,
    title: "Income Generation",
    description: "Earn  income by participating in our innovative business model and referral system.",
    color: "from-purple-500/20 to-pink-500/20",
    delay: 0.2
  },
  {
    icon: <FaWallet className="text-4xl text-[var(--accent-gold)]" />,
    title: "Smart & Easy Travel Planning",
    description: "Access a user-friendly digital platform that simplifies booking and planning your trips anytime, anywhere.",
    color: "from-pink-500/20 to-red-500/20",
    delay: 0.3
  },
  {
    icon: <FaPlane className="text-4xl text-[var(--accent-gold)]" />,
    title: "Travel Package Redemption",
    description: "Redeem exclusive travel packages and participate in mystery draws.",
    color: "from-red-500/20 to-blue-500/20",
    delay: 0.4
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 rounded-full bg-[var(--accent-blue)]/10 blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 rounded-full bg-[var(--accent-purple)]/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1 rounded-full bg-[rgba(30,144,255,0.1)] border border-[var(--accent-blue)] text-sm text-[var(--accent-blue)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Exclusive Features
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[var(--accent-blue)] text-glow">Let’s Travel</span> & Earn Income
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Enjoy an exclusive getaway with Meta travel International at no cost while unlocking impressive income opportunities.
            
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={cn(
                "glass-effect p-8 rounded-2xl border border-white/5",
                "hover:border-[var(--accent-gold)]/30 transition-all duration-500",
                "relative overflow-hidden group"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
            >
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br",
                feature.color
              )}></div>
              
              {/* Icon with circle background */}
              <div className="relative z-10 mb-6 w-16 h-16 rounded-full bg-black/30 flex items-center justify-center border border-[var(--accent-gold)]/30">
                {feature.icon}
              </div>
              
              <h3 className="relative z-10 text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="relative z-10 text-gray-300">{feature.description}</p>
              
              {/* Animated corner */}
              <motion.div 
                className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-[var(--accent-gold)]/0 group-hover:border-[var(--accent-gold)]/50"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: -5, y: -5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a 
            href="#download" 
            className="inline-flex items-center text-[var(--accent-blue)] hover:text-[var(--accent-gold)] transition-colors"
          >
            <span className="font-medium">Explore All Features</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
