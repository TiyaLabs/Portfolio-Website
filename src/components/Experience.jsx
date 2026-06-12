import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "PT Vinix Seven Aurum",
    role: "ML Engineer Intern",
    year: "2026",
    highlights: ["End-to-end ML pipelines", "Supervised & Unsupervised Learning"]
  },
  {
    company: "Dept. of Manpower & Industry",
    role: "Data Analyst Intern",
    year: "2025",
    highlights: ["1,000+ records processed", "Power BI Dashboards"]
  }
];

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-item", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-12 h-full" ref={containerRef}>
      <h3 className="text-xl font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">Experience</h3>
      
      {experiences.map((exp, index) => (
        <div key={index} className={`exp-item group relative grid grid-cols-12 gap-4 items-start ${index === 0 ? 'lg:min-h-[11rem]' : ''}`}>
          <div className="col-span-3 md:col-span-4">
            <span className="text-3xl md:text-5xl font-display font-bold text-slate-200 dark:text-slate-800 group-hover:text-primary-blue dark:group-hover:text-yellow-500 transition-colors duration-500">
              '{exp.year.slice(2)}
            </span>
          </div>
          
          <div className="col-span-9 md:col-span-8 flex flex-col pt-1 md:pt-2">
            <h4 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-primary-blue dark:group-hover:text-yellow-500 transition-colors duration-300">{exp.role}</h4>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">{exp.company}</p>
            
            <ul className="space-y-2">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="text-slate-600 dark:text-slate-400 font-medium editorial-spacing flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-soft-orange dark:group-hover:bg-yellow-500 transition-colors duration-300"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
