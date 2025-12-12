import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2600; // 2.6 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        // Hold for 300ms before fading out
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="preloader__content">
            {/* Logo with pixel build-in effect */}
            <motion.div
              className="preloader__logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.text
                  x="50%"
                  y="50%"
                  dy=".35em"
                  textAnchor="middle"
                  fontSize="48"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="700"
                  fill="url(#logo-gradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  NVG
                </motion.text>
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7A33FF" />
                    <stop offset="50%" stopColor="#9F6AFF" />
                    <stop offset="100%" stopColor="#CBA3FF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Progress bar */}
            <div className="preloader__progress-container">
              <motion.div
                className="preloader__progress-bar"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Progress percentage */}
            <motion.div
              className="preloader__percentage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
