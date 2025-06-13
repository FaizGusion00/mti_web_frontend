'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import SocialLink from './SocialLink';

const Footer = () => {
  // Use React.useState to ensure the year is only calculated on the client side
  const [year, setYear] = useState("2025");
  
  // Update the year after component mounts to avoid hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative pt-24 pb-12 px-4 sm:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      
      {/* Animated background circles */}
      <div className="absolute left-1/4 bottom-1/4 w-96 h-96 rounded-full bg-[var(--accent-blue)]/5 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/2 w-80 h-80 rounded-full bg-[var(--accent-purple)]/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-[var(--accent-blue)]">META TRAVEL</span>
              </h3>
              <h4 className="text-[var(--accent-gold)] font-bold">INTERNATIONAL</h4>
            </motion.div>
            
            <motion.p
              className="text-gray-400 mb-6 text-justify"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Meta Travel International, headquartered in Marina Bay, Singapore, is an innovative global travel platform that simplifies holiday planning with seamless digital access, while providing users with the opportunity to generate income and enjoy complimentary travel experiences worldwide.
            </motion.p>
            
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <SocialLink platform="telegram" url="https://t.me/metatravelinternational" />
              <SocialLink platform="instagram" url="https://www.instagram.com/metatravelinternational" />
            </motion.div>
          </div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b border-[var(--accent-gold)]/20">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#benefits">Benefits</FooterLink>
              <FooterLink href="#download">Download</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b border-[var(--accent-gold)]/20">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>hello@metatravel.ai</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Level 39, Marina Bay Financial Centre Tower 2, 10 Marina Boulevard, 018983 Singapore</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-[var(--accent-gold)]/20 mb-8"></div>
        
        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            &copy; {year} Meta Travel International. All rights reserved.
          </motion.p>
          
          <motion.div
            className="flex space-x-6 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <a href="#" className="hover:text-[var(--accent-gold)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--accent-gold)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--accent-gold)] transition-colors">Cookies</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--accent-gold)]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        {children}
      </a>
    </li>
  );
};

export default Footer;
