import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';


const organizations = [
  { role: "MPK Vice President", year: "2022 - 2023" },
  { role: "Dewan Ambalan Pramuka Head Division", year: "2021 - 2022" },
  { role: "RELOUD Publication Staff", year: "2023" },
  { role: "Matrika Publication Lead Coordinator", year: "2024" },
  { role: "Yearbook Committee PR Staff", year: "2023" },
  { role: "SMANTI Film Festival IT Staff", year: "2022" }
];

const Organization = () => {
  const containerRef = useRef(null);

  // GSAP removed due to layout interference with Framer Motion parallax

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-transparent" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-sm font-bold text-soft-orange dark:text-yellow-500 tracking-widest uppercase mb-4 block">Volunteer</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Leadership <span className="text-slate-400 dark:text-slate-500 italic">Roles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {organizations.map((org, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="org-item group flex flex-col justify-between bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-yellow-500 dark:group-hover:text-slate-900 transition-colors duration-500 shadow-inner">
                  <Users size={24} className="text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full group-hover:bg-primary-blue/10 dark:group-hover:bg-yellow-500/10 group-hover:text-primary-blue dark:group-hover:text-yellow-500 transition-colors duration-500">
                  {org.year}
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary-blue dark:group-hover:text-yellow-500 transition-colors duration-300 leading-snug">
                {org.role}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organization;
