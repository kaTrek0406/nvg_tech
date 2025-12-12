import { useEffect, useState } from 'react';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import HowItWorks from './components/sections/HowItWorks';
import Outro from './components/sections/Outro';
import Portfolio from './components/sections/Portfolio';
import Preloader from './components/sections/Preloader';
import Pricing from './components/sections/Pricing';
import Services from './components/sections/Services';
import TechOrbit from './components/sections/TechOrbit';
import Testimonials from './components/sections/Testimonials';
import { useLenis } from './hooks/useLenis.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenis = useLenis();

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll functions
  const onScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5 });
    }
  };

  const onScrollToPortfolio = () => {
    setTimeout(() => {
      const element = document.getElementById('portfolio');
      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.5 });
      }
    }, 100);
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Header */}
      <Header
        onScrollToContact={onScrollToContact}
        onScrollToPortfolio={onScrollToPortfolio}
      />

      {/* Main Content */}
      <main>
        <Hero onScrollToPortfolio={onScrollToPortfolio} />
        <TechOrbit />
        {/* <LogoTarget /> */}
        <Services />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Outro />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className='scroll-to-top'
          onClick={scrollToTop}
          aria-label='Scroll to top'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M12 19V5M12 5L5 12M12 5L19 12'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}
    </>
  );
}
