'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay } from 'swiper/modules';
// Fixed star positions to avoid hydration errors
const starPositions = [
  { top: "5%", left: "10%", size: "1px", delay: 0 },
  { top: "15%", left: "25%", size: "2px", delay: 1 },
  { top: "25%", left: "50%", size: "1px", delay: 2 },
  { top: "10%", left: "70%", size: "3px", delay: 3 },
  { top: "20%", left: "85%", size: "1px", delay: 4 },
  { top: "35%", left: "15%", size: "2px", delay: 0.5 },
  { top: "45%", left: "35%", size: "1px", delay: 1.5 },
  { top: "55%", left: "65%", size: "2px", delay: 2.5 },
  { top: "65%", left: "40%", size: "1px", delay: 3.5 },
  { top: "75%", left: "20%", size: "3px", delay: 4.5 },
  { top: "85%", left: "60%", size: "1px", delay: 0.2 },
  { top: "95%", left: "80%", size: "2px", delay: 1.2 },
  { top: "30%", left: "90%", size: "1px", delay: 2.2 },
  { top: "40%", left: "5%", size: "3px", delay: 3.2 },
  { top: "50%", left: "75%", size: "1px", delay: 4.2 },
  { top: "60%", left: "30%", size: "2px", delay: 0.7 },
  { top: "70%", left: "55%", size: "1px", delay: 1.7 },
  { top: "80%", left: "45%", size: "3px", delay: 2.7 },
  { top: "90%", left: "15%", size: "1px", delay: 3.7 },
  { top: "15%", left: "65%", size: "2px", delay: 4.7 }
];

// Shooting star animation
const shootingStars = [
  { delay: 2, duration: 1.5, top: "15%", left: "10%" },
  { delay: 5, duration: 2, top: "45%", left: "80%" },
  { delay: 9, duration: 1.8, top: "75%", left: "20%" },
];

const HeroSection = () => {
  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden mx-auto">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {starPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: position.top,
              left: position.left,
              width: position.size,
              height: position.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 5),
              delay: position.delay,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {shootingStars.map((star, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-0.5 bg-white"
            style={{
              top: star.top,
              left: star.left,
            }}
            initial={{ 
              opacity: 0,
              width: "1px",
              rotate: -45,
              x: 0,
              y: 0,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              width: ["1px", "150px", "1px"],
              x: [0, 200, 250],
              y: [0, 200, 250],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 15,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="w-full mx-auto relative space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-40 h-40 relative overflow-hidden">
                          <Image 
                            src="/logo.png" 
                            alt="MTI Logo" 
                            width={400} 
                            height={400}
                            className="mx-auto"
                          />
                        </div>
          <motion.div
            className="inline-block mb-2 px-4 py-1 rounded-full bg-[rgba(30,144,255,0.1)] border border-[var(--accent-blue)] text-sm text-[var(--accent-blue)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Let’s Travel & Earn Income
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[var(--accent-blue)] text-glow block">META TRAVEL</span>
            <span className="text-[var(--accent-gold)] block text-4xl  md:text-7xl">INTERNATIONAL</span>
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-xl text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Enjoy the chance to explore destinations around the world at no cost through our exclusive travel programs.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.a
            href="#download"
            className={cn(
              "px-8 py-4 rounded-full font-bold text-black",
              "gold-gradient hover:shadow-lg hover:shadow-[var(--accent-gold)]/20",
              "transition-all duration-300"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download App
          </motion.a>
          
          <motion.a
            href="https://app.metatravel.ai"
            className={cn(
              "px-8 py-4 rounded-full font-bold",
              "border-2 border-[var(--accent-gold)] text-white",
              "hover:bg-[var(--accent-gold)]/10 transition-all duration-300"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.a>
        </motion.div>
      </div>
      
      {/* Placeholder for mobile app mockup */}
      <motion.div 
        className="z-10 w-3/4 mt-16 md:mt-15 flex justify-center items-center mx-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        
      >

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper flex justify-center items-center mx:auto"
        >
          <SwiperSlide
            className='w-full relative flex flex-col justify-center items-center mx:auto text-center'
          >
            <Image
                src="/hero/mti_promo_1.png" 
                alt="MTI Package 1" 
                width={375}
                height={700}
              />
          </SwiperSlide>
          <SwiperSlide
            className='w-full relative flex flex-col justify-center items-center mx:auto text-center'
          >
            <Image
                src="/hero/mti_promo_2.png" 
                alt="MTI Package 2" 
                width={375}
                height={700}
              />
          </SwiperSlide>
        </Swiper>
          
        <div className="absolute -inset-4 bg-gradient-to-b from-[var(--accent-blue)] to-transparent opacity-20 rounded-[60px] blur-xl -z-10"></div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;
