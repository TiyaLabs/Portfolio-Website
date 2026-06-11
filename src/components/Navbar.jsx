import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md py-4 shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="text-2xl font-display font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 group transition-colors duration-300">
          <span className="w-3 h-3 rounded-full bg-primary-blue dark:bg-yellow-500 group-hover:scale-150 transition-all duration-300"></span>
          Aufatir.
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Resume', 'Projects'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-yellow-500 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-blue dark:bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-slate-900 dark:bg-yellow-500 dark:text-slate-900 hover:bg-primary-blue dark:hover:bg-white rounded-full transition-colors duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-slate-900 dark:text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
