import { useEffect, useRef } from "react";

const SceneBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 30; // Highly optimized

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        this.r = Math.random() * 1.5 + 0.3;
        this.opacity = Math.random() * 0.3 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#0a0a0a]">
      {/* High-Performance Mesh Gradients (CSS Only) */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/5 blur-[100px] animate-float-slow" />
      <div className="absolute -bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[80px]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />
      
      <div className="absolute inset-0 noise-overlay opacity-[0.015]" />
    </div>
  );
};

export default SceneBackground;
