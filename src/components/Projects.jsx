import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Database, PenTool, LayoutTemplate } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ThemeContext } from '../App';

gsap.registerPlugin(ScrollTrigger);

const dataScienceProjects = [
  {
    title: "Industrial Investment Analysis",
    category: "Data Visualization",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["Power BI", "Analytics", "Dashboard"],
    hoverColor: "#1e3a8a", // deep blue
    hoverColorDark: "#020617" // darker slate
  },
  {
    title: "Commodity Price Prediction",
    category: "Forecasting",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    tags: ["Machine Learning", "ARIMA"],
    hoverColor: "#1e40af", // deep blue variant
    hoverColorDark: "#0f172a" 
  },
  {
    title: "Country Clustering Analysis",
    category: "Clustering",
    year: "2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    tags: ["K-Means", "Scikit-Learn"],
    hoverColor: "#1d4ed8", 
    hoverColorDark: "#172554" 
  },
  {
    title: "Customer Churn Prediction",
    category: "Classification",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    tags: ["XGBoost", "Python", "Pandas"],
    hoverColor: "#172554", 
    hoverColorDark: "#020617" 
  },
  {
    title: "Sentiment Analysis NLP",
    category: "Natural Language Processing",
    year: "2023",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    tags: ["NLTK", "TensorFlow", "API"],
    hoverColor: "#0f172a", 
    hoverColorDark: "#000000" 
  },
  {
    title: "Real-time Sales Dashboard",
    category: "Data Engineering",
    year: "2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["SQL", "Tableau", "AWS"],
    hoverColor: "#312e81", 
    hoverColorDark: "#1e1b4b" 
  }
];

const graphicDesignProjects = [
  {
    title: "Brand Identity Revamp",
    category: "Branding",
    year: "2025",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    tags: ["Illustrator", "Brand Guidelines"],
    hoverColor: "#ea580c", // orange
    hoverColorDark: "#431407" // dark orange
  },
  {
    title: "Modern FinTech UI Kit",
    category: "UI/UX Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    tags: ["Figma", "Prototyping"],
    hoverColor: "#d97706", // amber
    hoverColorDark: "#451a03" 
  },
  {
    title: "Social Media Campaign",
    category: "Digital Marketing",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
    tags: ["Photoshop", "Content Creation"],
    hoverColor: "#eab308", // yellow
    hoverColorDark: "#713f12" 
  },
  {
    title: "E-Commerce Mobile App",
    category: "UI/UX Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Figma", "Wireframing"],
    hoverColor: "#b45309", 
    hoverColorDark: "#451a03" 
  },
  {
    title: "Event Poster Series",
    category: "Typography",
    year: "2023",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop",
    tags: ["InDesign", "Print Design"],
    hoverColor: "#9a3412", 
    hoverColorDark: "#3f1a04" 
  },
  {
    title: "3D Product Renderings",
    category: "3D Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2059&auto=format&fit=crop",
    tags: ["Blender", "Lighting"],
    hoverColor: "#ca8a04", 
    hoverColorDark: "#713f12" 
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { portfolioTheme, setPortfolioTheme, isDarkMode: globalDark } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(globalDark);

  // Check if dark mode is active
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Re-trigger entrance animation when theme changes
  useEffect(() => {
    gsap.fromTo(".project-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: true
      }
    );
  }, [portfolioTheme]);

  const currentProjects = portfolioTheme === 'gd' ? graphicDesignProjects : dataScienceProjects;
  const isDS = portfolioTheme === 'ds' || portfolioTheme === 'split';

  // Determine active background color (changed to be an overlay so blobs remain visible)
  let activeOverlay = "transparent";
  if (hoveredIndex !== null) {
    activeOverlay = isDark ? currentProjects[hoveredIndex].hoverColorDark : currentProjects[hoveredIndex].hoverColor;
  }

  // Theme accent colors based on theme
  const accentColorClass = isDS ? "text-primary-blue dark:text-blue-400" : "text-soft-orange dark:text-yellow-500";
  const accentBorderClass = isDS ? "border-primary-blue dark:border-blue-400" : "border-soft-orange dark:border-yellow-500";
  const accentBgClass = isDS ? "bg-primary-blue dark:bg-blue-400" : "bg-soft-orange dark:bg-yellow-500";

  return (
    <section 
      id="projects" 
      className="py-16 md:py-20 relative overflow-hidden bg-transparent" 
      ref={containerRef}
    >
      {/* Semi-transparent color overlay that tints the background without hiding the fluid blobs */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-700 ease-in-out opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundColor: activeOverlay }}
      ></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 transition-colors duration-700">
          <div className="overflow-hidden mb-8 md:mb-0">
            <span className={`text-sm font-bold tracking-widest uppercase mb-4 block transition-colors duration-700 ${hoveredIndex !== null ? 'text-white/70' : accentColorClass}`}>Selected Works</span>
            <h2 className={`text-5xl md:text-7xl font-display font-bold tracking-tight leading-none transition-colors duration-700 ${hoveredIndex !== null ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              Featured <br/><span className={hoveredIndex !== null ? 'text-white/50 italic font-medium' : 'text-slate-400 dark:text-slate-500 italic font-medium'}>Projects</span>
            </h2>
          </div>
          
          {/* Custom Tab Switcher */}
          <div className={`flex p-1.5 rounded-full backdrop-blur-md transition-colors duration-700 border ${hoveredIndex !== null ? 'bg-white/10 border-white/20' : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'}`}>
            <button 
              onClick={() => setPortfolioTheme('ds')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${portfolioTheme === 'ds' || portfolioTheme === 'split' ? `${accentBgClass} text-white` : hoveredIndex !== null ? 'text-white/60 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Database size={16} />
              Data Science
            </button>
            <button 
              onClick={() => setPortfolioTheme('gd')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${portfolioTheme === 'gd' ? `${accentBgClass} text-white` : hoveredIndex !== null ? 'text-white/60 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <PenTool size={16} />
              Graphic Design
            </button>
          </div>
        </div>
        
        {/* Unique Staggered Card Layout (Hall of Fame Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 min-h-[600px] pt-12 pb-16 md:pb-20">
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => {
              // Create the staggered effect: Left stays up, Middle goes down, Right goes further down
              const isStaggered = true;
              const staggerClass = isStaggered ? (index % 3 === 0 ? "lg:-translate-y-12" : index % 3 === 1 ? "lg:translate-y-12" : "lg:translate-y-36") : "";
              
              return (
                <div key={`${portfolioTheme}-wrap-${index}`} className={`w-full h-full ${staggerClass}`}>
                  <motion.div 
                    key={`${portfolioTheme}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`project-card group relative bg-white dark:bg-black/40 backdrop-blur-md rounded-[2rem] p-4 flex flex-col gap-6 cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.02] border border-slate-200 dark:border-white/10`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                  {/* Image Container */}
                  <div className="w-full h-72 rounded-[1.5rem] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    {/* Floating View Badge inside image */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-4 pb-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${hoveredIndex === index ? accentColorClass : 'text-slate-400 dark:text-slate-500'}`}>
                        {project.category}
                      </span>
                      <span className="text-xs font-bold text-slate-300 dark:text-slate-600">
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className={`text-2xl font-display font-bold leading-snug mb-6 transition-colors ${hoveredIndex === index ? accentColorClass : 'text-slate-900 dark:text-white'}`}>
                      {project.title}
                    </h3>
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[11px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 transition-colors ${hoveredIndex === index ? accentBorderClass : ''}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
