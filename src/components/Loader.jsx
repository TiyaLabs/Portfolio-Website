import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2,
      ease: [0.76, 0, 0.24, 1], // cinematic ease
      onComplete: () => {
        setTimeout(() => setIsDone(true), 200);
      }
    });
    return controls.stop;
  }, [count]);

  return (
    <motion.div 
      className="fixed inset-0 bg-[#050505] text-white flex flex-col items-center justify-center z-[100] overflow-hidden origin-bottom"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <motion.div 
        className="flex flex-col items-center justify-center w-full relative"
        animate={{ opacity: isDone ? 0 : 1, y: isDone ? -50 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter flex items-end">
          <motion.span>{rounded}</motion.span>
          <span className="text-[10vw] md:text-[8vw] text-slate-500">%</span>
        </div>
        <div className="absolute bottom-[-40px] text-sm uppercase tracking-widest text-slate-400 font-medium">
          Loading Experience
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
