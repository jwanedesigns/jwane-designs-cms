import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { MessageCircle, Twitter, Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-4 max-w-2xl">
      <SectionHeading 
        badge="Contact" 
        title="Let's Work Together"
        subtitle="Commissions are open. Typical turnaround is 24–48 hours. When reaching out, include the video topic, style reference, and your deadline."
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card rounded-2xl p-8 sm:p-12 text-center glow-border"
      >

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm transition-transform"
          >
            <MessageCircle size={16} /> Discord
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-body font-semibold text-sm hover:border-primary/40 transition-colors"
          >
            <Twitter size={16} /> Twitter / X
          </motion.a>
          <motion.a
            href="mailto:jwane@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-body font-semibold text-sm hover:border-primary/40 transition-colors"
          >
            <Mail size={16} /> Email
          </motion.a>
        </div>
        <p className="text-muted-foreground font-body text-xs">
          Include: video topic · style reference · deadline
        </p>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
