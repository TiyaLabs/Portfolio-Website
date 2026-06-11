import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-transparent pt-12 pb-8 relative z-10 overflow-hidden border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-primary-blue animate-pulse"></div>
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Local Time: Surabaya, INA</p>
        </div>
        
        <div className="flex gap-8">
          {["LinkedIn", "Instagram", "GitHub"].map((item, i) => (
            <a 
              key={i}
              href="#" 
              className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
          © {new Date().getFullYear()} Aufatir Diaul Haq
        </p>
      </div>
    </footer>
  );
};

export default Footer;
