import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Check, Target, Zap, Rocket } from "lucide-react";
import Logo from "./Logo";

const capabilities = [
  "High-CTR Thumbnail Design",
  "Visual Branding & Identity",
  "Viral Storytelling Strategy",
  "Platform-Specific Optimization",
  "Rapid 24-48h Delivery"
];

const aboutFeatures = [
  {
    icon: Target,
    title: "CTR Optimization",
    description: "Every pixel is placed with intent to drive engagement and clicks."
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "High-quality turnarounds in 24-48 hours to keep your schedule on track."
  },
  {
    icon: Rocket,
    title: "Viral Strategy",
    description: "Deep understanding of YouTube algorithms and viewer psychology."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading 
            badge="Scientific Precision" 
            title={
              <>
                Designed to Conquer the <span className="text-primary italic">Algorithm</span>
              </>
            }
            description="A thumbnail is a psychological hook. We don't just design covers—we engineer CTR catalysts that force users to stop and click."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {aboutFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md group hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 bg-secondary/30 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-foreground tracking-wide uppercase">Core Capabilities</h3>
                <ul className="space-y-4">
                  {capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-4 text-muted-foreground font-body text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="font-medium">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card flex items-center justify-center bg-background/50">
                <Logo className="w-1/2 h-auto text-primary/50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
