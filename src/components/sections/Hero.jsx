import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { t } = useTranslation();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    // Parallax background animation
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;

    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      const { width, height } = section.getBoundingClientRect();

      const x = (clientX / width - 0.5) * 30;
      const y = (clientY / height - 0.5) * 30;

      gsap.to(bg, {
        x,
        y,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className='hero' id='hero'>
      {/* Animated background */}
      <div ref={bgRef} className='hero__background'>
        <div className='hero__bg-circle hero__bg-circle--1' />
        <div className='hero__bg-circle hero__bg-circle--2' />
        <div className='hero__bg-circle hero__bg-circle--3' />
        <div className='hero__bg-grid' />
      </div>

      {/* Content */}
      <motion.div
        className='container hero__content'
        variants={containerVariants}
        initial={false}
        animate='visible'
      >
        <motion.h1 variants={itemVariants} className='hero__title'>
          {t('hero.title')}
        </motion.h1>

        <motion.p variants={itemVariants} className='hero__subtitle subtitle'>
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={itemVariants} className='hero__cta'>
          <a
            href='tel:+37368614535'
            className='btn btn--primary'
            aria-label='Book Free Strategy Call'
          >
            {t('hero.bookCall')}
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                d='M7.5 15L12.5 10L7.5 5'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>

          <button
            className='btn btn--secondary'
            onClick={scrollToPricing}
            aria-label='View Pricing'
          >
            {t('hero.pricing')}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className='hero__stats'>
          <div className='hero__stat'>
            <strong>100+</strong>
            <span>{t('hero.projects')}</span>
          </div>
          <div className='hero__stat'>
            <strong>250K+</strong>
            <span>{t('hero.leads')}</span>
          </div>
          <div className='hero__stat'>
            <strong>4.9★</strong>
            <span>{t('hero.rating')}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
