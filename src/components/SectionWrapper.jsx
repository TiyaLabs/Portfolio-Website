import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionWrapper = ({ children, id, className = "", depth = 0.03, effect = "slideUp", watermark = "" }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Reduced Parallax translation
  const y = useTransform(scrollYProgress, [0, 1], [100 * depth * 5, -100 * depth * 5]);

  const variants = {
    slideUp: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.97 },
      whileInView: { opacity: 1, scale: 1 }
    },
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 }
    }
  };

  const selectedVariant = variants[effect] || variants.slideUp;

  return (
    <section id={id} className={`relative ${className}`} ref={ref}>
      {watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-hidden w-full flex justify-center items-center opacity-[0.15] dark:opacity-[0.03] select-none">
          <h2 className="text-[25vw] md:text-[20vw] font-display font-black whitespace-nowrap text-slate-300 dark:text-white">
            {watermark}
          </h2>
        </div>
      )}
      <motion.div 
        style={{ y }} 
        className="w-full h-full relative z-10"
        initial={selectedVariant.initial}
        whileInView={selectedVariant.whileInView}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
