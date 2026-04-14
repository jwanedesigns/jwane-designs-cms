import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { supabase } from "@/lib/supabase";

const genres = ["All", "Gaming", "Vlog", "Horror", "Sports", "Other"];

const ThumbnailCard = ({ t }: { t: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.5 }
      }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer relative h-full"
      style={{ willChange: "transform" }}
    >
      <div className="relative aspect-video bg-neutral-900 overflow-hidden">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 z-10 w-full h-full bg-white/5 animate-pulse" />
        )}
        
        <img 
          src={t.image_url} 
          alt={t.title} 
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } group-hover:scale-105`}
          loading="lazy"
          decoding="async"
        />
        
        {/* Views Badge - Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
            <span className="text-white font-body text-[10px] font-bold tracking-widest uppercase">
              {t.views} views
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="z-10 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white font-display text-xl leading-tight mb-2">{t.title}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-px bg-primary" />
              <p className="text-primary font-body text-[10px] font-bold tracking-[0.2em] uppercase">
                {t.genre}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GenreShowcase = () => {
  const [thumbnails, setThumbnails] = useState<any[]>([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThumbnails();
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchThumbnails = async () => {
    const { data, error } = await supabase
      .from("thumbnails")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (!error) {
      setThumbnails(data || []);
    }
    setLoading(false);
  };

  const filtered = activeGenre === "All" ? thumbnails : thumbnails.filter(t => t.genre === activeGenre);
  
  // Logic for slicing on mobile
  const displayLimit = (isMobile && !isExpanded) ? 4 : filtered.length;
  const visibleThumbnails = filtered.slice(0, displayLimit);
  const hasMore = isMobile && filtered.length > 4;

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4">Portfolio</p>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-4">
            MY <span className="text-gradient-mod">WORK</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            A curated selection of high-impact visual stories engineered for maximum audience retention.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => {
                setActiveGenre(g);
                setIsExpanded(false);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeGenre === g
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                  : "border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20 bg-secondary/30"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="aspect-video bg-white/5 rounded-2xl animate-pulse" />
               ))}
            </div>
        ) : filtered.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 text-center opacity-40">
                <ImageIcon size={48} />
                <p className="font-display uppercase tracking-widest text-sm">No Assets Found in Category</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleThumbnails.map(t => (
                  <ThumbnailCard key={t.id} t={t} />
                ))}
              </AnimatePresence>
            </div>
        )}

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass-card px-8 py-4 rounded-full flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-foreground hover:text-primary group"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /></>
              ) : (
                <>Show More <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /></>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GenreShowcase;
