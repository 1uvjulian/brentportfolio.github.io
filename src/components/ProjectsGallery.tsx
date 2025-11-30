import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with cart functionality and payment integration.',
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzY0NDA5NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Mobile App Design',
    description: 'Modern mobile application with intuitive UI/UX and responsive design.',
    image: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY0MzY2NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    githubUrl: 'https://github.com/yourusername/mobile-app',
    technologies: ['React Native', 'Firebase'],
  },
  {
    title: 'Data Dashboard',
    description: 'Interactive analytics dashboard with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjQzMjU1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    githubUrl: 'https://github.com/yourusername/data-dashboard',
    technologies: ['Python', 'D3.js', 'Flask'],
  },
];

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ y }}
      className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
    >
      {/* Mouse glow effect on card */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-10 rounded-full blur-3xl opacity-20"
          style={{
            width: '300px',
            height: '300px',
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
          }}
        />
      )}
      
      {/* Project Image */}
      <div className="aspect-video overflow-hidden relative rounded-t-3xl">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            filter: isHovered ? 'brightness(0.7)' : 'brightness(0.8)'
          }}
        />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-2xl mb-2 text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(139,92,246,0.2)', color: '#c4b5fd', borderColor: 'rgba(139,92,246,0.5)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          <Github size={20} />
          <span>View on GitHub</span>
          <ExternalLink size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
}

export function ProjectsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section id="projects" ref={ref} className="py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="text-5xl md:text-6xl mb-16 text-white"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}