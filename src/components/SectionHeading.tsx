import { motion } from "framer-motion";
import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: React.ReactNode;
  description?: React.ReactNode; // Handle 'description' which I used in AboutSection
  subtitle?: React.ReactNode;    // Kept for backward compatibility
  centered?: boolean;
}

const SectionHeading = ({ badge, title, description, subtitle, centered = true }: SectionHeadingProps) => {
  const content = description || subtitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${centered ? "text-center" : "text-left"}`}
    >
      <p className="text-primary font-body text-[10px] tracking-[0.3em] uppercase mb-4 font-black">
        {badge}
      </p>
      
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight leading-[1.1]">
        {typeof title === "string" ? (
          title.split(" ").map((word, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? "text-gradient-mod" : ""}>
              {word}{" "}
            </span>
          ))
        ) : (
          title
        )}
      </h2>

      {content && (
        <div className={`font-body text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""}`}>
          {content}
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeading;
