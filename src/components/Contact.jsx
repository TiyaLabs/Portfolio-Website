import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link, MessageCircle, Camera, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Contact = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Magnetic button effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power3.out"
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }, []);

  return (
    <section id="contact" className="py-16 md:py-20 relative bg-transparent" ref={containerRef}>
      
      {/* Immersive Floating Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Large Typography */}
          <div className="flex flex-col">
            <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white leading-[0.9] mb-8">
              Let's create <br/>
              <span className="text-slate-400 italic font-medium">together.</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-md editorial-spacing font-medium leading-relaxed mb-12">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>

            <div className="flex flex-col gap-6">
              <a href="mailto:Aufatir78@gmail.com" className="flex items-center gap-6 group w-max">
                <div className="w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-primary-blue group-hover:border-primary-blue transition-colors duration-300">
                  <Mail size={24} className="text-slate-300 group-hover:text-white transition-colors" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:translate-y-[-100%] transition-transform duration-300">Email</p>
                  <p className="text-2xl font-display font-semibold text-white group-hover:-translate-y-6 transition-transform duration-300">Aufatir78@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/6282284423169" target="_blank" rel="noreferrer" className="flex items-center gap-6 group w-max">
                <div className="w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-soft-orange group-hover:border-soft-orange transition-colors duration-300">
                  <MessageCircle size={24} className="text-slate-300 group-hover:text-white transition-colors" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:translate-y-[-100%] transition-transform duration-300">WhatsApp</p>
                  <p className="text-2xl font-display font-semibold text-white group-hover:-translate-y-6 transition-transform duration-300">+62 822-8442-3169</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Immersive Form */}
          <div className="flex justify-start lg:justify-end">
            <form className="w-full max-w-md relative group/form" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 -z-10 group-focus-within/form:bg-white/10 transition-colors duration-500"></div>
              
              <div className="p-10 flex flex-col gap-8">
                <div className="relative group">
                  <input type="text" id="name" required className="w-full bg-transparent border-b border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-primary-blue transition-colors peer" placeholder=" " />
                  <label htmlFor="name" className="absolute left-0 top-4 text-slate-500 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-blue peer-valid:-top-3 peer-valid:text-xs transition-all uppercase tracking-widest font-bold">What's your name?</label>
                </div>

                <div className="relative group">
                  <input type="email" id="email" required className="w-full bg-transparent border-b border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-primary-blue transition-colors peer" placeholder=" " />
                  <label htmlFor="email" className="absolute left-0 top-4 text-slate-500 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-blue peer-valid:-top-3 peer-valid:text-xs transition-all uppercase tracking-widest font-bold">Your email address</label>
                </div>

                <div className="relative group">
                  <textarea id="message" required rows="3" className="w-full bg-transparent border-b border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-primary-blue transition-colors peer resize-none" placeholder=" "></textarea>
                  <label htmlFor="message" className="absolute left-0 top-4 text-slate-500 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-blue peer-valid:-top-3 peer-valid:text-xs transition-all uppercase tracking-widest font-bold">Tell me about the project</label>
                </div>

                <div className="pt-4">
                  <button className="magnetic-btn w-32 h-32 rounded-full bg-primary-blue dark:bg-yellow-500 text-white dark:text-slate-900 flex flex-col items-center justify-center gap-2 hover:bg-white hover:text-primary-blue dark:hover:bg-white dark:hover:text-slate-900 transition-colors duration-300">
                    <span className="text-sm font-bold uppercase tracking-widest">Send</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
