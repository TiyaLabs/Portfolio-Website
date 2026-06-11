import { useEffect, useRef, useContext, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, Database, Terminal, Layout, LineChart, PenTool, Image as ImageIcon, Code } from 'lucide-react';
import gsap from 'gsap';
import { ThemeContext } from '../App';

const dsIcons = [
  { id: 'ds-1', Icon: Terminal, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/30", delay: 0, size: 32, top: "20%", left: "5%", depth: 0.15 },
  { id: 'ds-2', Icon: Database, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/30", delay: 1, size: 40, top: "60%", left: "10%", depth: 0.25 },
  { id: 'ds-3', Icon: LineChart, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/30", delay: 0.5, size: 28, top: "45%", left: "18%", depth: 0.1 },
  { id: 'ds-4', Icon: Database, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/30", delay: 0.8, size: 24, top: "80%", left: "25%", depth: 0.2 },
];

const gdIcons = [
  { id: 'gd-1', Icon: PenTool, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/30", delay: 1.5, size: 48, top: "30%", left: "85%", depth: 0.2 },
  { id: 'gd-2', Icon: Layout, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/30", delay: 0.2, size: 36, top: "70%", left: "90%", depth: 0.15 },
  { id: 'gd-3', Icon: ImageIcon, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30", delay: 1.1, size: 32, top: "50%", left: "75%", depth: 0.25 },
  { id: 'gd-4', Icon: PenTool, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30", delay: 0.7, size: 28, top: "85%", left: "80%", depth: 0.1 },
];

const FloatingIcon = ({ item, isVisible, isSplit, smoothMouseX, smoothMouseY, index, globalScrollY }) => {
  const iconX = useTransform(smoothMouseX, [-1, 1], [-50 * item.depth, 50 * item.depth]);
  const iconY = useTransform(smoothMouseY, [-1, 1], [-50 * item.depth, 50 * item.depth]);
  const scrollYOffset = useTransform(globalScrollY, [0, 1000], [0, 300 * item.depth]);

  return (
    <motion.div
      className="absolute z-40"
      style={{ top: item.top, left: item.left, x: iconX, y: scrollYOffset }}
    >
      <motion.div
        className={`p-3 rounded-2xl shadow-lg border border-white/50 dark:border-slate-800/50 backdrop-blur-md ${item.bg} ${item.color} flex items-center justify-center transition-opacity duration-700 ${isVisible && !isSplit ? 'opacity-100 scale-110' : 'opacity-70'}`}
        animate={{ rotate: [-5, 5, -5], y: [-10, 10, -10] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
      >
        <item.Icon size={item.size} />
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { portfolioTheme, setPortfolioTheme } = useContext(ThemeContext);
  const [hoverSide, setHoverSide] = useState(null);

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Strong Parallax Scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 100]);
  const titleY = useTransform(scrollY, [0, 1000], [0, 200]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".title1-char", 
        { y: 100, opacity: 0, rotateZ: 10 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 1, stagger: 0.04, ease: "power4.out", delay: 0.2 }
      )
      .fromTo(".title2-char", 
        { y: 100, opacity: 0, rotateZ: -10 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 1, stagger: 0.04, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(".hero-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(".hero-element", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isDS = portfolioTheme === 'ds' || hoverSide === 'ds';
  const isGD = portfolioTheme === 'gd' || hoverSide === 'gd';
  const isSplit = portfolioTheme === 'split';

  const leftClipPath = isSplit ? 
    (hoverSide === 'ds' ? 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' : 
     hoverSide === 'gd' ? 'polygon(0 0, 45% 0, 55% 100%, 0 100%)' : 
     'polygon(0 0, 50% 0, 50% 100%, 0 100%)') : 
    'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

  const rightClipPath = isSplit ? 
    (hoverSide === 'gd' ? 'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)' : 
     hoverSide === 'ds' ? 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' : 
     'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)') : 
    'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex flex-col justify-center overflow-hidden" ref={containerRef}>
      
      {/* Subtle Noise Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.08] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #888 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          y: bgY 
        }}
      />

      {/* Dynamic Background Halves */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto flex">
        <div 
          className="absolute inset-0 bg-primary-blue/5 dark:bg-primary-blue/10 cursor-pointer transition-all duration-700 ease-out z-10"
          style={{ 
            clipPath: leftClipPath, 
            opacity: (isDS || isSplit) ? 1 : 0,
            pointerEvents: (portfolioTheme === 'split' || portfolioTheme === 'ds') ? 'auto' : 'none'
          }}
          onMouseEnter={() => setHoverSide('ds')}
          onMouseLeave={() => setHoverSide(null)}
          onClick={() => setPortfolioTheme('ds')}
        />
        <div 
          className="absolute inset-0 bg-soft-orange/5 dark:bg-yellow-500/10 cursor-pointer transition-all duration-700 ease-out z-10"
          style={{ 
            clipPath: rightClipPath, 
            opacity: (isGD || isSplit) ? 1 : 0,
            pointerEvents: (portfolioTheme === 'split' || portfolioTheme === 'gd') ? 'auto' : 'none'
          }}
          onMouseEnter={() => setHoverSide('gd')}
          onMouseLeave={() => setHoverSide(null)}
          onClick={() => setPortfolioTheme('gd')}
        />
      </div>

      {/* Side Vertical Texts */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] -rotate-90 origin-center transition-all duration-700 ease-out z-20 pointer-events-none mix-blend-overlay ${(hoverSide === 'ds' && portfolioTheme === 'split') ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-[15vh] font-display font-black text-primary-blue whitespace-nowrap opacity-20 dark:opacity-30">DATA SCIENCE</span>
      </div>

      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] rotate-90 origin-center transition-all duration-700 ease-out z-20 pointer-events-none mix-blend-overlay ${(hoverSide === 'gd' && portfolioTheme === 'split') ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-[15vh] font-display font-black text-soft-orange whitespace-nowrap opacity-20 dark:opacity-30">GRAPHIC DESIGN</span>
      </div>

      {/* Blob Gradients */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-blue/20 dark:bg-primary-blue/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-orange/20 dark:bg-yellow-500/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container relative z-20 mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pointer-events-none pt-24 pb-8 md:pb-12">
        
        {/* Left Side: Typography */}
        <div className="w-full flex flex-col justify-center h-full z-30 pointer-events-auto">
          <div className="flex justify-between items-start mb-6 hero-element">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">Portfolio 2026</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${isDS && !isSplit ? 'bg-primary-blue' : isGD && !isSplit ? 'bg-soft-orange' : 'bg-green-500'}`}></span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Available for work</span>
              </div>
            </div>
            <div className="text-right hidden md:block max-w-xs">
              <p className="text-sm text-slate-500 dark:text-slate-400 editorial-spacing leading-relaxed transition-colors">
                Based in Surabaya, Indonesia.
                <br/>Crafting data-driven digital experiences.
              </p>
            </div>
          </div>

          <motion.div className="w-full mb-8 relative z-20 flex" style={{ y: titleY }}>
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-display font-bold leading-[1] text-slate-900 dark:text-white tracking-tighter uppercase overflow-visible pb-4 transition-colors duration-500 flex flex-col items-start md:items-center w-full">
              <div className="overflow-hidden py-2 px-4 -mx-4 -mb-2">
                {"Aufatir Diaul".split("").map((char, i) => (
                  <span key={`t1-${i}`} className={`title1-char inline-block hover:-translate-y-4 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default ${isGD && !isSplit ? 'hover:text-soft-orange dark:hover:text-yellow-500' : 'hover:text-primary-blue dark:hover:text-blue-400'}`}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden py-2 px-4 -mx-4 -mb-2 text-slate-400 dark:text-slate-500 italic font-medium md:ml-12 self-start md:self-auto">
                {"Haq —".split("").map((char, i) => (
                  <span key={`t2-${i}`} className={`title2-char inline-block hover:-translate-y-4 hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-default ${isDS && !isSplit ? 'hover:text-primary-blue dark:hover:text-blue-400' : 'hover:text-soft-orange dark:hover:text-yellow-500'}`}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </h1>
          </motion.div>

          <motion.div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-4 hero-element" style={{ y: textY }}>
            <p className="hero-text text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium editorial-spacing leading-snug transition-colors duration-500 mb-8 md:mb-0 max-w-2xl">
              <span className={`transition-colors duration-500 ${isDS && !isSplit ? 'text-primary-blue font-bold' : ''}`}>Data Science Student</span>
              {' & '} 
              <span className={`transition-colors duration-500 ${isGD && !isSplit ? 'text-soft-orange font-bold' : ''}`}>Graphic Designer</span>
              {' turning complex data into '}
              <span className="text-primary-blue dark:text-blue-400 relative inline-block group cursor-pointer" onClick={() => setPortfolioTheme('ds')}>
                meaningful insights
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary-blue dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </span> 
              {' and crafting '}
              <span className="text-soft-orange dark:text-yellow-500 relative inline-block group cursor-pointer" onClick={() => setPortfolioTheme('gd')}>
                visual experiences
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-soft-orange dark:bg-yellow-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </span>.
            </p>

            <motion.a 
              href="#projects" 
              className={`w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full text-white dark:text-slate-900 flex flex-col items-center justify-center gap-2 transition-colors duration-500 group relative z-50 ${isDS && !isSplit ? 'bg-primary-blue hover:bg-slate-900' : isGD && !isSplit ? 'bg-soft-orange dark:bg-yellow-500 hover:bg-slate-900 dark:hover:bg-white' : 'bg-slate-900 dark:bg-slate-200 hover:bg-primary-blue'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold tracking-wider uppercase">Explore</span>
              <ArrowDownRight size={24} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Floating App Logos */}
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden hidden md:block">
          {(isDS || isSplit) && dsIcons.map((item, index) => (
            <FloatingIcon key={item.id} item={item} isVisible={isDS} isSplit={isSplit} smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} index={index} globalScrollY={scrollY} />
          ))}
          {(isGD || isSplit) && gdIcons.map((item, index) => (
            <FloatingIcon key={item.id} item={item} isVisible={isGD} isSplit={isSplit} smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} index={index} globalScrollY={scrollY} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
