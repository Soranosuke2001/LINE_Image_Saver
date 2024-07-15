"use client"

import React from 'react';
import { motion } from 'framer-motion';

import { CustomImage } from '@/lib/types';

const PictureFrame = ({ children, image } : { children: React.ReactNode, image: CustomImage }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '-100vh' }}
      transition={{ 
        duration: image.duration,
        ease: 'easeInOut', 
        delay: image.delay,
        repeat: Infinity,
        repeatType: 'loop'
      }}
      style={{
        width: image.width,
        height: image.height,
        backgroundColor: 'lightblue',
        border: '1px solid black',
        borderRadius: '10px',
        position: 'fixed',
        bottom: 0,
        left: image.left,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PictureFrame;
