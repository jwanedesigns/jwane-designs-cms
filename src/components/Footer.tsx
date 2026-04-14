import Logo from "./Logo";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
      <Logo className="h-8 w-auto text-primary" role="img" />
      <div className="flex gap-6">
        {["Work", "About", "Contact"].map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-muted-foreground font-body text-sm hover:text-primary transition-colors"
            aria-label={`Navigate to ${l}`}
          >
            {l}
          </a>
        ))}
      </div>
      <p className="text-muted-foreground font-body text-xs">© 2025 Jwane. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
