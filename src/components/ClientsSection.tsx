import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const clients = [
  { name: "MrBeast Gaming", subs: "38M" },
  { name: "PewDiePie", subs: "111M" },
  { name: "Sidemen", subs: "21M" },
  { name: "Logan Paul", subs: "23M" },
  { name: "Dream", subs: "31M" },
  { name: "Ninja", subs: "24M" },
  { name: "Technoblade", subs: "16M" },
  { name: "Jacksepticeye", subs: "30M" },
];

const ClientCard = ({ name, subs }: { name: string; subs: string }) => (
  <div className="flex flex-col items-center mx-10 flex-shrink-0 group">
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      className="w-20 h-20 rounded-full glass-card border border-white/10 group-hover:border-primary/50 flex items-center justify-center mb-4 transition-all duration-300 shadow-xl overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
      <span className="text-primary/40 text-[10px] font-bold tracking-widest uppercase relative z-10">Creator</span>
    </motion.div>
    <p className="text-foreground text-sm font-body font-bold tracking-wide mb-1 transition-colors group-hover:text-primary">{name}</p>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">{subs} subs</p>
    </div>
  </div>
);

const ClientsSection = () => (
  <section id="clients" className="py-24 border-y border-white/5 bg-white/5 relative">
    <div className="container mx-auto px-4 mb-16">
      <SectionHeading 
        badge="Social Proof" 
        title="Trusted by Giants"
        subtitle="Engineering visual results for the world's most demanding content pipelines."
        align="center"
      />
    </div>
    <div className="relative">
      {/* Edge Fades for Marquee */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="marquee-track py-4">
        {[...clients, ...clients].map((c, i) => (
          <ClientCard key={i} name={c.name} subs={c.subs} />
        ))}
      </div>
    </div>
  </section>
);

export default ClientsSection;
