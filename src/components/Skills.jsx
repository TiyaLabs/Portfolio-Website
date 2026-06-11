import { useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, BarChart, Database, Layout, Code, Network, Hexagon, Layers, PenTool, ImageIcon, Edit3, MonitorSmartphone, Type, Palette } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ThemeContext } from '../App';

gsap.registerPlugin(ScrollTrigger);

// --- Data Science Content ---
const dsRow1 = [
  { name: "Python", icon: Terminal, color: "text-blue-500" },
  { name: "Machine Learning", icon: Cpu, color: "text-red-500" },
  { name: "Power BI", icon: BarChart, color: "text-yellow-600" },
  { name: "AI", icon: Hexagon, color: "text-purple-500" },
  { name: "SQL", icon: Database, color: "text-orange-500" },
];
const dsRow2 = [
  { name: "Scikit-Learn", icon: Code, color: "text-orange-400" },
  { name: "Deep Learning", icon: Network, color: "text-indigo-500" },
  { name: "Data Analytics", icon: BarChart, color: "text-teal-500" },
  { name: "TensorFlow", icon: Hexagon, color: "text-orange-600" },
  { name: "Pandas", icon: Database, color: "text-blue-700" }
];
const dsSkills = [
  { category: "Data Science & AI", items: ["Predictive Modeling", "Time Series Analysis", "NLP", "Computer Vision", "Clustering", "Neural Networks"] },
  { category: "Data Analytics", items: ["Interactive Dashboards", "Statistical Analysis", "A/B Testing", "ETL Pipelines", "Data Warehousing"] },
  { category: "Engineering", items: ["Git Version Control", "Docker Containers", "RESTful APIs", "Cloud Computing (AWS/GCP)", "Agile Methodology"] },
];

// --- Graphic Design Content ---
const gdRow1 = [
  { name: "UI/UX", icon: Layout, color: "text-pink-500" },
  { name: "Figma", icon: Layers, color: "text-purple-600" },
  { name: "Photoshop", icon: ImageIcon, color: "text-blue-500" },
  { name: "Illustrator", icon: PenTool, color: "text-orange-500" },
  { name: "Brand Design", icon: Palette, color: "text-red-500" },
];
const gdRow2 = [
  { name: "Typography", icon: Type, color: "text-slate-800 dark:text-white" },
  { name: "Prototyping", icon: MonitorSmartphone, color: "text-teal-500" },
  { name: "Visual Identity", icon: Edit3, color: "text-yellow-500" },
  { name: "Creative Direction", icon: Palette, color: "text-indigo-500" },
  { name: "Wireframing", icon: Layout, color: "text-blue-400" }
];
const gdSkills = [
  { category: "Visual Design", items: ["Brand Identity", "Logo Design", "Typography", "Color Theory", "Marketing Collateral", "Social Media Kits"] },
  { category: "UI/UX & Web", items: ["Wireframing", "High-Fidelity Prototyping", "User Research", "Interaction Design", "Responsive Layouts"] },
  { category: "Creative Tools", items: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "After Effects", "Lightroom"] },
];

const Skills = () => {
  const containerRef = useRef(null);
  const { portfolioTheme, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-badge", 
        { opacity: 0, scale: 0.8, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skill-container",
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [portfolioTheme]);

  // Determine which content to show based on global theme
  const isDS = portfolioTheme === 'ds';
  const isGD = portfolioTheme === 'gd';
  const isSplit = portfolioTheme === 'split';

  const row1Data = isDS ? dsRow1 : isGD ? gdRow1 : dsRow1;
  const row2Data = isDS ? dsRow2 : isGD ? gdRow2 : gdRow1; // in split, show ds top, gd bottom
  const displayedSkills = isDS ? dsSkills : isGD ? gdSkills : [...dsSkills.slice(0, 2), gdSkills[0]];

  const accentColorClass = isDS || isSplit ? "text-primary-blue dark:text-blue-400" : "text-soft-orange dark:text-yellow-500";
  const hoverBorderClass = isDS || isSplit ? "hover:border-primary-blue dark:hover:border-blue-400" : "hover:border-soft-orange dark:hover:border-yellow-500";
  const groupHoverTextClass = isDS || isSplit ? "group-hover:text-primary-blue dark:group-hover:text-blue-400" : "group-hover:text-soft-orange dark:group-hover:text-yellow-500";
  const badgeHoverClass = isDS || isSplit 
    ? "hover:bg-primary-blue hover:text-white dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-500" 
    : "hover:bg-soft-orange hover:text-white dark:hover:bg-yellow-500 dark:hover:text-slate-900 dark:hover:border-yellow-500";

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-transparent transition-colors duration-700" ref={containerRef}>
      
      {/* Magic UI Marquee */}
      <div className="w-full mb-32 overflow-hidden marquee-container py-4 flex flex-col gap-6 relative select-none">
        
        {/* Row 1 */}
        <div className="flex shrink-0 animate-marquee gap-6 items-center transition-all duration-700">
          {[...row1Data, ...row1Data, ...row1Data, ...row1Data].map((tech, idx) => (
            <div key={idx} className={`px-8 py-4 rounded-[2rem] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white font-display font-bold text-xl hover:shadow-lg transition-all duration-300 mx-3 cursor-pointer flex items-center gap-4 group ${hoverBorderClass}`}>
              <tech.icon size={28} className={`${tech.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className={`transition-colors duration-300 ${groupHoverTextClass}`}>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex shrink-0 animate-marquee-reverse gap-6 items-center -ml-16 transition-all duration-700">
          {[...row2Data, ...row2Data, ...row2Data, ...row2Data].map((tech, idx) => (
            <div key={idx} className={`px-8 py-4 rounded-[2rem] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white font-display font-bold text-xl hover:shadow-lg transition-all duration-300 mx-3 cursor-pointer flex items-center gap-4 group ${isGD ? hoverBorderClass : (isDS ? hoverBorderClass : 'hover:border-soft-orange dark:hover:border-yellow-500')}`}>
              <tech.icon size={28} className={`${tech.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className={`transition-colors duration-300 ${isGD ? groupHoverTextClass : (isDS ? groupHoverTextClass : 'group-hover:text-soft-orange dark:group-hover:text-yellow-500')}`}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 skill-container">
        
        <div className="flex flex-col mb-16 transition-colors duration-700">
          <span className={`text-sm font-bold tracking-widest uppercase mb-6 block transition-colors duration-700 ${accentColorClass}`}>
            Capabilities
          </span>
          <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[0.9] mb-8 transition-colors duration-700">
            Core <br/><span className="text-slate-400 dark:text-slate-500 italic">Competencies</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium editorial-spacing max-w-2xl transition-colors duration-700">
            {isDS 
              ? "A comprehensive engineering stack focused on machine learning architecture, data pipelines, and predictive analysis." 
              : isGD 
                ? "A creative toolkit blending visual storytelling, user-centric interfaces, and pixel-perfect brand aesthetics."
                : "A comprehensive set of skills blending analytical rigor, machine learning architecture, and creative visual design."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayedSkills.map((category, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 group`}
            >
              <h3 className={`text-2xl font-display font-bold uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors duration-700 ${groupHoverTextClass}`}>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item, i) => (
                  <div 
                    key={i}
                    className={`skill-badge px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] lg:text-xs transition-colors duration-300 cursor-pointer ${badgeHoverClass}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
