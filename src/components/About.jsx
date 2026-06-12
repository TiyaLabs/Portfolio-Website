import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Image
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal
      gsap.fromTo(".about-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-16 md:py-20 relative bg-transparent overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left: Huge Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col" ref={textRef}>
            <span className="about-text text-sm font-bold text-soft-orange dark:text-yellow-500 tracking-widest uppercase mb-8 block">The Developer</span>

            <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-10 transition-colors duration-500">
              I believe in the power of <span className="text-primary-blue dark:text-yellow-500 italic">data</span> to tell stories and drive <span className="text-slate-400 dark:text-slate-500">meaningful change.</span>
            </h2>

            <div className="about-text flex flex-col md:flex-row gap-8 lg:gap-16 mt-8">
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium editorial-spacing leading-relaxed flex-1 transition-colors duration-500">
                Currently studying Data Science at Universitas Negeri Surabaya, I specialize in building predictive models, uncovering insights, and engineering modern data pipelines.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium editorial-spacing leading-relaxed flex-1 transition-colors duration-500">
                My approach blends analytical rigor with creative problem-solving, ensuring that every project is not just technically sound, but intuitively impactful.
              </p>
            </div>

            <div className="about-text flex gap-12 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
              <div>
                <h4 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">10+</h4>
                <span className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Projects Completed</span>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">3.79</h4>
                <span className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Current GPA</span>
              </div>
            </div>
          </div>

          {/* Right: Asymmetric Floating Image */}
          <div className="lg:col-span-5 relative h-[600px] w-full flex justify-end">
            <div className="w-full md:w-[80%] h-[120%] -top-[10%] relative rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Creative Workspace"
                className="w-full h-full object-cover scale-110 filter grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary-blue/10 dark:bg-yellow-500/10 mix-blend-overlay"></div>
            </div>

            {/* Decorative Label */}
            <a href="https://github.com/TiyaLabs" target="_blank" rel="noreferrer" className="absolute bottom-10 -left-10 md:-left-20 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 z-20 hidden md:flex hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-yellow-500 flex items-center justify-center transition-colors duration-500 group-hover:bg-primary-blue dark:group-hover:bg-yellow-400">
                <Code size={20} className="text-white dark:text-slate-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 group-hover:text-primary-blue dark:group-hover:text-yellow-500 transition-colors duration-300">Code</p>
                <p className="font-display font-bold text-slate-900 dark:text-white transition-colors duration-500">GitHub Repo</p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
