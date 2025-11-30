import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'HTML', level: 95, color: 'from-orange-500 to-red-500' },
  { name: 'CSS', level: 90, color: 'from-blue-500 to-cyan-500' },
  { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-orange-500' },
  { name: 'Python', level: 80, color: 'from-blue-600 to-purple-600' },
];

function SkillBar({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
    >
      {/* Mouse glow on skill bar */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-10 rounded-full blur-3xl opacity-20"
          style={{
            width: '200px',
            height: '200px',
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)',
          }}
        />
      )}
      
      <div className="flex justify-between mb-3">
        <span className="text-xl text-white">{skill.name}</span>
        <span className="text-lg text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-3 bg-white/10 overflow-hidden rounded-full relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
          style={{ 
            boxShadow: '0 0 20px rgba(139,92,246,0.5)'
          }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="text-5xl md:text-6xl mb-16 text-white"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}