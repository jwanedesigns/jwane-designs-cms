import { motion } from "framer-motion";
import { Quote, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import SectionHeading from "./SectionHeading";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (!error) {
        setTestimonials(data || []);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
          <SectionHeading 
            badge="Testimonials" 
            title="What Creators Say"
            subtitle="My work is measured by the growth and engagement of my clients. Here is what some of the biggest names in the space have to say."
          />
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
             <>
               {[1,2,3].map(i => (
                 <div key={i} className="glass-card rounded-xl p-6 h-48 animate-pulse bg-white/5" />
               ))}
             </>
          ) : (
            testimonials.map((t, i) => (
              <motion.div
                key={t.id || i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-6 flex flex-col cursor-default"
              >
                <Quote className="text-primary/40 mb-4" size={28} />
                <p className="text-foreground/90 font-body text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-foreground font-body font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground font-body text-xs">{t.size}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
