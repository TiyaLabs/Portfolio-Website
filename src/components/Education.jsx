import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educations = [
  {
    institution: "Universitas Negeri Surabaya",
    degree: "Data Science Student",
    period: "2023 - Present",
    highlights: ["GPA: 3.79/4.00", "Data Structures, Machine Learning", "Advanced Statistics"],
    accent: "yellow"
  },
  {
    institution: "SMAN 3 Batam",
    degree: "Mathematics & Natural Sciences",
    period: "2020 - 2023",
    highlights: ["Olympiad Team", "Science Club President"],
    accent: "blue"
  }
];

const Education = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-item",
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
      <h3 className="text-xl font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">Education</h3>

      {educations.map((edu, index) => (
        <div key={index} className={`edu-item group relative grid grid-cols-12 gap-4 items-start ${index === 0 ? 'lg:min-h-[11rem]' : ''}`}>
          <div className="col-span-3 md:col-span-4">
            <span className="text-3xl md:text-5xl font-display font-bold text-slate-200 dark:text-slate-800 group-hover:text-soft-orange dark:group-hover:text-yellow-500 transition-colors duration-500">
              '{edu.period.split(" ")[0].slice(-2)}
            </span>
          </div>

          <div className="col-span-9 md:col-span-8 flex flex-col pt-1 md:pt-2">
            <h4 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-soft-orange dark:group-hover:text-yellow-500 transition-colors duration-300">{edu.degree}</h4>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">{edu.institution}</p>

            <ul className="space-y-2">
              {edu.highlights.map((highlight, idx) => (
                <li key={idx} className="text-slate-600 dark:text-slate-400 font-medium editorial-spacing flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary-blue dark:group-hover:bg-yellow-500 transition-colors duration-300"></span>
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

export default Education;
