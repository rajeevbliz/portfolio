
import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Pipeline from './components/Pipeline';
import About from './components/About';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import Certificates from './components/Certificates';
import SplashCursor from './components/ui/SplashCursor';
import SnowEffect from './components/SnowEffect';

declare global {
  interface Window {
    lenis: Lenis;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); 

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initial check to fix scroll if page refreshes mid-way
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-offWhite dark:bg-black min-h-screen text-matteBlack dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 relative">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-matteBlack"
          >
            <div className="loader">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="text">
                  <span>RAJEEV R</span>
                </div>
              ))}
              <div className="line"></div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SplashCursor 
        COLOR_UPDATE_SPEED={15} 
        SPLAT_RADIUS={0.35} 
        CURL={3.5}
        DENSITY_DISSIPATION={3.0}
      />
      
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <TechStack />
        <About />
        <Projects />
        <Pipeline />
        <Services />
        <Certificates />
        <Contact />
      </main>

      <SnowEffect />
    </div>
  );
};

export default App;
