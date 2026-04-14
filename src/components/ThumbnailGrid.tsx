import { motion } from "framer-motion";

const IMAGES = [
  "/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png",
  "/assets/5.png", "/assets/6.png", "/assets/7.png", "/assets/8.png",
  "/assets/9.png", "/assets/10.png", "/assets/11.png", "/assets/12.png"
];

const ThumbnailRow = ({ direction = "left", speed = 120 }: { direction?: "left" | "right", speed?: number }) => {
  // Triple the images to ensure perfect infinite loop coverage
  const tripleImages = [...IMAGES, ...IMAGES, ...IMAGES];

  return (
    <div className="flex gap-4 py-2 w-max">
      <div 
        className="flex gap-4"
        style={{ 
          animation: `hero-scroll-${direction} ${speed}s linear infinite`,
          willChange: "transform"
        }}
      >
        {tripleImages.map((src, i) => (
          <div 
            key={i} 
            className="w-48 h-28 rounded-lg overflow-hidden glass-card flex-shrink-0"
          >
            <img 
              src={src} 
              alt="" 
              className="w-full h-full object-cover opacity-60 cyan-filter" 
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ThumbnailGrid = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden sm:opacity-50">
      {/* 3D Perspective Container */}
      <div 
        className="relative w-[150vw] h-[150vh] flex flex-col justify-center gap-4"
        style={{ 
          transform: "perspective(1200px) rotateX(60deg) rotateZ(-15deg) translateY(-10%)",
          transformStyle: "preserve-3d"
        }}
      >
        <ThumbnailRow direction="left" speed={140} />
        <ThumbnailRow direction="right" speed={120} />
        <ThumbnailRow direction="left" speed={160} />
        <ThumbnailRow direction="right" speed={130} />
        <ThumbnailRow direction="left" speed={150} />
      </div>

      {/* Radial Mask to ensure center clarity */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-background/60 to-background" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background/90" />
    </div>
  );
};

export default ThumbnailGrid;
