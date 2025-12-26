import { useEffect, useState } from 'react';
import BriefWidget from '../components/BriefWidget';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/sections/Footer';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Outro from '../components/sections/Outro';
import Portfolio from '../components/sections/Portfolio';
import Pricing from '../components/sections/Pricing';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import { useLenis } from '../hooks/useLenis.jsx';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Outro />
      </main>

      <Footer />

      {/* Brief Widget - чат в углу */}
      <BriefWidget />

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
