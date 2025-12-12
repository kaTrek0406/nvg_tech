import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLenis } from '../hooks/useLenis.jsx';
import Crosshair from './Crosshair';
import './LogoTarget.css';
import QuickContactForm from './QuickContactForm.jsx';
export default function LogoTarget() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const [isTargeted, setIsTargeted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();
  const { t } = useTranslation();

  let targetTimer = null;

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseEnter = () => {
      setIsTargeted(true);
      let currentProgress = 0;

      targetTimer = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(targetTimer);
          handleTargetComplete();
        }
      }, 20);
    };

    const handleMouseLeave = () => {
      setIsTargeted(false);
      setProgress(0);
      if (targetTimer) clearInterval(targetTimer);
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      if (targetTimer) clearInterval(targetTimer);
    };
  }, []);

  const handleTargetComplete = () => {
    // Анимация успешного попадания
    setProgress(100);

    // Показываем форму
    setTimeout(() => {
      setIsModalOpen(true);

      // Сброс прогресса
      setTimeout(() => {
        setProgress(0);
        setIsTargeted(false);
      }, 500);
    }, 300);
  };

  return (
    <>
      <div ref={containerRef} className='logo-target-container'>
        <Crosshair containerRef={containerRef} color='#CBA3FF' />

        <motion.div
          ref={logoRef}
          className={`logo-target ${isTargeted ? 'targeted' : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          {/* SVG Логотип NVG */}
          <svg
            width='200'
            height='200'
            viewBox='0 0 200 200'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <linearGradient
                id='logo-target-gradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#7A33FF' />
                <stop offset='50%' stopColor='#9F6AFF' />
                <stop offset='100%' stopColor='#CBA3FF' />
              </linearGradient>
            </defs>

            <text
              x='50%'
              y='50%'
              dy='.35em'
              textAnchor='middle'
              fontSize='72'
              fontFamily='Space Grotesk, sans-serif'
              fontWeight='700'
              fill='url(#logo-target-gradient)'
            >
              NVG
            </text>

            {/* Прицельная окружность */}
            <circle
              cx='100'
              cy='100'
              r='85'
              fill='none'
              stroke='url(#logo-target-gradient)'
              strokeWidth='2'
              strokeDasharray='10 5'
              opacity='0.6'
              className='target-circle'
            />

            {/* Прогресс круг */}
            {isTargeted && (
              <circle
                cx='100'
                cy='100'
                r='85'
                fill='none'
                stroke='#CBA3FF'
                strokeWidth='4'
                strokeDasharray={`${progress * 5.34} 534`}
                strokeLinecap='round'
                transform='rotate(-90 100 100)'
                className='progress-circle'
              />
            )}
          </svg>

          {/* Подсказка */}
          <motion.div
            className='target-hint'
            initial={{ opacity: 0 }}
            animate={{ opacity: isTargeted ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {isTargeted
              ? `${t('logoTarget.hintActive', {
                  progress: Math.round(progress)
                })}`
              : t('logoTarget.hintIdle')}
          </motion.div>
        </motion.div>

        {/* Инструкция */}
      </div>

      {/* === Модалка с формой === */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className='modal-overlay'
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='modal-container-dark'
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                className='modal-close'
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              <QuickContactForm 
                isOpen={true}
                onClose={() => setIsModalOpen(false)}
                buttonRef={logoRef}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
