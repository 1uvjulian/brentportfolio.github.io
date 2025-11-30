import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

const certificates: Certificate[] = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Coursera',
    date: 'October 2024',
    image: 'https://images.unsplash.com/photo-1752937326758-f130e633b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2NDM5ODExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    credentialUrl: 'https://coursera.org/verify/your-credential-id',
  },
  {
    title: 'Python for Data Science',
    issuer: 'Coursera',
    date: 'August 2024',
    image: 'https://images.unsplash.com/photo-1752937326758-f130e633b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2NDM5ODExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    credentialUrl: 'https://coursera.org/verify/your-credential-id-2',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'Coursera',
    date: 'June 2024',
    image: 'https://images.unsplash.com/photo-1752937326758-f130e633b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2NDM5ODExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    credentialUrl: 'https://coursera.org/verify/your-credential-id-3',
  },
];

function CertificateCard({ cert, index, isInView }: { cert: Certificate; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.a
      ref={cardRef}
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ y }}
      className="group bg-white/5 backdrop-blur-xl border border-white/10 text-white overflow-hidden rounded-3xl shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05, rotate: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backgroundColor: 'rgba(255,255,255,0.1)' }}
    >
      {/* Mouse glow effect on certificate */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-20 rounded-full blur-3xl opacity-30"
          style={{
            width: '250px',
            height: '250px',
            left: mousePosition.x - 125,
            top: mousePosition.y - 125,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
          }}
        />
      )}
      {/* Certificate Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 relative rounded-t-3xl">
        <ImageWithFallback
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            opacity: isHovered ? 0.4 : 0.3,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Award size={64} className="text-purple-400" />
        </motion.div>
      </div>

      {/* Certificate Info */}
      <div className="p-6 bg-transparent">
        <h3 className="text-2xl mb-2 text-white group-hover:text-purple-400 transition-colors">{cert.title}</h3>
        <p className="text-gray-400 mb-1">{cert.issuer}</p>
        <p className="text-sm text-purple-400">{cert.date}</p>
      </div>
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.a>
  );
}

export function CertificatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

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
          Certificates
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.title}
              cert={cert}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}