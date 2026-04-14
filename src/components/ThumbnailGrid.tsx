import { motion } from "framer-motion";
import { getAssetUrl } from "@/lib/assets";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const FALLBACK_IMAGES = [
  "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png",
  "assets/5.png", "assets/6.png", "assets/7.png", "assets/8.png",
  "assets/9.png", "assets/10.png", "assets/11.png", "assets/12.png"
];

const ThumbnailRow = ({ images, direction = "left", speed = 120 }: { images: string[], direction?: "left" | "right", speed?: number }) => {
  // Triple the images to ensure perfect infinite loop coverage
  const tripleImages = [...images, ...images, ...images];

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
              src={getAssetUrl(src)} 
              alt="Elite YouTube Thumbnail Portfolio Background" 
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
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("thumbnails")
        .select("image_url")
        .limit(12);
      
      if (data && data.length > 0) {
        setImages(data.map(item => item.image_url));
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden sm:opacity-50">
      <div 
        className="relative w-[150vw] h-[150vh] flex flex-col justify-center gap-4"
        style={{ 
          transform: "perspective(1200px) rotateX(60deg) rotateZ(-15deg) translateY(-10%)",
          transformStyle: "preserve-3d"
        }}
      >
        <ThumbnailRow images={images} direction="left" speed={140} />
        <ThumbnailRow images={images} direction="right" speed={120} />
        <ThumbnailRow images={images} direction="left" speed={160} />
        <ThumbnailRow images={images} direction="right" speed={130} />
        <ThumbnailRow images={images} direction="left" speed={150} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-background/60 to-background" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background/90" />
    </div>
  );
};

export default ThumbnailGrid;
