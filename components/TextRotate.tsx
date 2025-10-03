'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
}

export default function TextRotate({
  texts,
  rotationInterval = 3000,
  className = '',
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <span className={`relative inline-block ${className}`} style={{ minHeight: '1.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
