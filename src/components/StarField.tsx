import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 150;
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 5,
        });
      }
      
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-starlight animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: star.size > 2 
              ? `0 0 ${star.size * 2}px hsl(var(--starlight) / 0.5)` 
              : 'none',
          }}
        />
      ))}
      
      {/* Shooting stars */}
      <div className="absolute w-1 h-1 bg-starlight rounded-full animate-shooting-star" 
           style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
      <div className="absolute w-1 h-1 bg-starlight rounded-full animate-shooting-star" 
           style={{ top: '40%', left: '60%', animationDelay: '3s' }} />
      <div className="absolute w-1 h-1 bg-starlight rounded-full animate-shooting-star" 
           style={{ top: '70%', left: '30%', animationDelay: '7s' }} />
    </div>
  );
};

export default StarField;
