import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <>
      {/* Main glow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Secondary glow layer */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          x,
          y,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Cursor follower dot */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          x,
          y,
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-white opacity-50" />
      </motion.div>

      {/* Small center dot */}
      <motion.div
        className="pointer-events-none fixed z-50 w-1 h-1 bg-white rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
        }}
      />
    </>
  );
}
