import { motion } from "framer-motion";
import ThumbnailGrid from "./ThumbnailGrid";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
      <ThumbnailGrid />
      
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] hero-glow-backdrop opacity-40 z-[-1]" />
          
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-primary font-body text-[10px] sm:text-[11px] uppercase mb-8 md:mb-12 font-black tracking-[0.5em] px-4 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm"
          >
            ELITE THUMBNAIL DESIGN
          </motion.div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none mb-8 md:mb-10 select-none tracking-tighter">
            <span className="text-gradient-mod">JWANE DESIGNS</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground font-body text-base sm:text-xl max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed"
        >
          Gaming, Vlog, Horror & Sports — <span className="text-foreground font-semibold">scroll-stopping</span> visuals engineered for maximum YouTube performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mt-4 mb-4 md:mb-0"
        >
          <a
            href="#work"
            className="btn-glow inline-flex items-center justify-center px-12 py-4 rounded-full bg-primary text-primary-foreground font-body font-bold text-xs tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,245,255,0.4)]"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="glass-card inline-flex items-center justify-center px-12 py-4 rounded-full border border-white/10 text-foreground font-body font-bold text-xs tracking-[0.2em] uppercase hover:border-primary/50 hover:bg-white/5 transition-all"
          >
            Work With Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
