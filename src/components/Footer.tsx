import Logo from "./Logo";
import { useState, useEffect } from "react";
import { MessageCircle, Twitter, Instagram, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Footer = () => {
  const [links, setLinks] = useState({
    discord: "#",
    twitter: "#",
    instagram: "#",
    email: "jwane@example.com"
  });

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase.from("settings").select("*");
      if (data) {
        const newLinks = { ...links };
        data.forEach(s => {
          if (s.key === "discord_link") newLinks.discord = s.value;
          if (s.key === "twitter_link") newLinks.twitter = s.value;
          if (s.key === "instagram_link") newLinks.instagram = s.value;
          if (s.key === "email_address") newLinks.email = s.value;
        });
        setLinks(newLinks);
      }
    };
    fetchLinks();
  }, []);

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo className="h-8 w-auto text-primary" role="img" />
          <p className="text-muted-foreground font-body text-[10px] uppercase tracking-widest">YouTube Thumbnail Design Specialist</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-8">
            {["About", "Work", "Contact"].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-muted-foreground font-body text-sm hover:text-primary transition-colors font-medium"
                aria-label={`Navigate to ${l}`}
              >
                {l}
              </a>
            ))}
          </div>
          
          <div className="flex gap-4">
            {[
              { icon: MessageCircle, href: links.discord, label: "Discord" },
              { icon: Twitter, href: links.twitter, label: "Twitter" },
              { icon: Instagram, href: links.instagram, label: "Instagram" },
              { icon: Mail, href: `mailto:${links.email}`, label: "Email" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-muted-foreground font-body text-xs mb-1">© 2025 Jwane Designs.</p>
          <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-tighter">Engineered for Performance</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
