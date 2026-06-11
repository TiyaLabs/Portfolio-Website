import { useState, useEffect, createContext } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Organization from './components/Organization';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import TopographicBackground from './components/TopographicBackground';
import SectionWrapper from './components/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, PenTool, LayoutTemplate, Moon, Sun } from 'lucide-react';
import Lenis from 'lenis';

export const ThemeContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [portfolioTheme, setPortfolioTheme] = useState('split'); // 'split' | 'ds' | 'gd'

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  // Determine global background based on theme
  let globalBg = "bg-slate-50 dark:bg-slate-900";
  if (portfolioTheme === 'ds') globalBg = "bg-blue-50/50 dark:bg-[#081226]";
  if (portfolioTheme === 'gd') globalBg = "bg-orange-50/50 dark:bg-[#1a0f05]";

  return (
    <ThemeContext.Provider value={{ portfolioTheme, setPortfolioTheme, isDarkMode }}>
      {/* Floating Sidebar Switcher */}
      {!loading && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
          
          <div className="flex flex-col gap-3 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl">
            {/* Split Theme */}
            <button 
              onClick={() => setPortfolioTheme('split')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${portfolioTheme === 'split' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Split View"
            >
              <LayoutTemplate size={18} />
            </button>
            
            {/* Data Science Theme */}
            <button 
              onClick={() => setPortfolioTheme('ds')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${portfolioTheme === 'ds' ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/30' : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
              title="Data Science Mode"
            >
              <Database size={18} />
            </button>

            {/* Graphic Design Theme */}
            <button 
              onClick={() => setPortfolioTheme('gd')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${portfolioTheme === 'gd' ? 'bg-soft-orange dark:bg-yellow-500 text-white dark:text-slate-900 shadow-lg shadow-orange-500/30' : 'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30'}`}
              title="Graphic Design Mode"
            >
              <PenTool size={18} />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="w-14 h-14 rounded-full bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 mt-4"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      )}

      <AnimatePresence>
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div 
            key="content"
            className={`min-h-screen text-slate-900 dark:text-slate-50 relative overflow-hidden transition-colors duration-700 ${globalBg}`}
          >
            
            {/* Dynamic WebGL-style Topographical Background */}
            <TopographicBackground />

            <div className="relative z-10">
              <Navbar />
              <main>
                <div className="bg-transparent">
                  <Hero />
                </div>
                
                <SectionWrapper depth={0.03} effect="slideUp" className="bg-transparent" watermark="DEVELOPER">
                  <About />
                </SectionWrapper>
                
                <SectionWrapper depth={0.04} effect="zoom" className="bg-white/50 dark:bg-black/20 py-16 md:py-20 relative overflow-hidden transition-colors duration-700 backdrop-blur-sm" id="resume" watermark="JOURNEY">
                  <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-24">
                      <span className="text-sm font-bold text-soft-orange dark:text-yellow-500 tracking-widest uppercase mb-4 block">Journey</span>
                      <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                        Experience & <br/>
                        <span className="text-slate-400 dark:text-slate-500">Education</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                      <Experience />
                      <Education />
                    </div>
                  </div>
                </SectionWrapper>

                <SectionWrapper depth={0.05} effect="slideUp" className="bg-transparent" watermark="PROJECTS">
                  <Projects />
                </SectionWrapper>
                
                <SectionWrapper depth={0.02} effect="fade" className="bg-transparent transition-colors duration-700" watermark="SKILLS">
                  <Skills />
                  <Organization />
                </SectionWrapper>
                
                <SectionWrapper depth={0.03} effect="slideUp" className="bg-slate-900 dark:bg-black text-white rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden transition-colors duration-700 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
                  <Contact />
                  <Footer />
                </SectionWrapper>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export default App;
