import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from '../../hooks/useLenis.jsx'; // ✅ берём Lenis из твоего hook
import LanguageSwitcher from '../LanguageSwitcher';
import QuickContactForm from '../QuickContactForm';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickFormOpen, setIsQuickFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ctaButtonRef = useRef(null);
  const { t } = useTranslation();
  const lenis = useLenis(); // ✅ один общий Lenis, как в App
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Определяем размер экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Отслеживаем скролл для изменения стиля header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрываем мобильное меню при изменении размера экрана
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Блокируем скролл body когда открыто мобильное меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ✅ Универсальный скролл к секции через Lenis (если он есть)
  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (!element) {
      setIsMobileMenuOpen(false);
      return;
    }

    if (lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5 });
    } else {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);

    // Открываем телефонный звонок вместо формы
    window.location.href = 'tel:+37368614535';
  };

  // ✅ Скролл вверх по клику на логотип (только на главной)
  const handleLogoClick = e => {
    if (isHomePage) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Если не на главной, Link сработает автоматически
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className='header__container container'>
          {/* Logo */}
          <Link to='/' className='header__logo' onClick={handleLogoClick}>
            <svg width='40' height='40' viewBox='0 0 100 100' fill='none'>
              <path
                d='M20 80V20L50 50L80 20V80'
                stroke='url(#logo-gradient)'
                strokeWidth='6'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <defs>
                <linearGradient
                  id='logo-gradient'
                  x1='20'
                  y1='20'
                  x2='80'
                  y2='80'
                >
                  <stop offset='0%' stopColor='#7A33FF' />
                  <stop offset='100%' stopColor='#CBA3FF' />
                </linearGradient>
              </defs>
            </svg>
            <span className='header__logo-text'>NVG</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='header__nav'>
            <a
              href='#services'
              onClick={e => {
                e.preventDefault();
                scrollToSection('services');
              }}
            >
              {t('header.services')}
            </a>
            <a
              href='#process'
              onClick={e => {
                e.preventDefault();
                scrollToSection('process');
              }}
            >
              {t('header.process')}
            </a>
            <a
              href='#portfolio'
              onClick={e => {
                e.preventDefault();
                scrollToSection('portfolio');
              }}
            >
              {t('header.portfolio')}
            </a>
            <a
              href='#pricing'
              onClick={e => {
                e.preventDefault();
                scrollToSection('pricing');
              }}
            >
              {t('header.pricing')}
            </a>
            <a
              href='#faq'
              onClick={e => {
                e.preventDefault();
                scrollToSection('faq');
              }}
            >
              {t('header.faq')}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className='header__actions'>
            {!isMobile && (
              <div style={{ position: 'relative' }}>
                <button
                  ref={ctaButtonRef}
                  className='btn btn--primary header__cta'
                  onClick={handleContactClick}
                  aria-label='Start your project'
                >
                  {t('header.startProject')}
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6 12L10 8L6 4'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>

                <QuickContactForm
                  isOpen={isQuickFormOpen}
                  onClose={() => setIsQuickFormOpen(false)}
                  buttonRef={ctaButtonRef}
                />
              </div>
            )}

            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <button
            className={`header__mobile-toggle ${
              isMobileMenuOpen ? 'active' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className='header__mobile-menu active'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <nav className='header__mobile-nav'>
                <a
                  href='#services'
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  {t('header.services')}
                </a>
                <a
                  href='#portfolio'
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection('portfolio');
                  }}
                >
                  {t('header.portfolio')}
                </a>
                <a
                  href='#process'
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection('process');
                  }}
                >
                  {t('header.process')}
                </a>
                <a
                  href='#pricing'
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                >
                  {t('header.pricing')}
                </a>
                <a
                  href='#faq'
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection('faq');
                  }}
                >
                  {t('header.faq')}
                </a>

                <button
                  className='btn btn--primary'
                  onClick={handleContactClick}
                >
                  {t('header.startProject')}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Overlay для закрытия меню при клике вне его */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 500 // ниже, чем header (у него 1000)
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
