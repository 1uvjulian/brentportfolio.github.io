import image_34f5f0461dffacb6398ffb54ea0bce43e04023f9 from 'figma:asset/34f5f0461dffacb6398ffb54ea0bce43e04023f9.png';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Mail, Phone, Instagram, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { CertificatesSection } from './components/CertificatesSection';
import { MouseGlow } from './components/MouseGlow';
import { useRef, useState } from 'react';

export default function App() {
  const containerRef = useRef(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [profileMousePos, setProfileMousePos] = useState({ x: 0, y: 0 });
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  
  // Parallax for profile picture
  const profileY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  // Parallax for content sections
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profileRef.current) return;
    const rect = profileRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setProfileMousePos({
      x: (mouseX - centerX) / centerX,
      y: (mouseY - centerY) / centerY
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen cursor-none">
      {/* Mouse Glow Effect */}
      <MouseGlow />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale }}
        >
          <motion.div
            style={{ filter: useTransform(blur, (value) => `blur(${value}px)`) }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NjQzNDkzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black backdrop-blur-sm" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="relative h-full flex items-center justify-between px-8 md:px-16 lg:px-24 max-w-7xl mx-auto"
          style={{ opacity }}
        >
          {/* Left - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: profileY }}
            className="hidden lg:block"
          >
            <motion.div 
              ref={profileRef}
              className="w-80 h-80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative backdrop-blur-md bg-white/5"
              onMouseMove={handleProfileMouseMove}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => {
                setIsProfileHovered(false);
                setProfileMousePos({ x: 0, y: 0 });
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(139,92,246,0.3)' }}
              style={{
                rotateX: isProfileHovered ? profileMousePos.y * -10 : 0,
                rotateY: isProfileHovered ? profileMousePos.x * 10 : 0,
              }}
            >
              <motion.div
                animate={{
                  scale: isProfileHovered ? 1.1 : 1,
                  x: isProfileHovered ? profileMousePos.x * 10 : 0,
                  y: isProfileHovered ? profileMousePos.y * 10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              >
                <ImageWithFallback
                  src={image_34f5f0461dffacb6398ffb54ea0bce43e04023f9}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  style={{
                    filter: isProfileHovered ? 'brightness(1.1) contrast(1.05) saturate(1.1)' : 'brightness(1)',
                  }}
                />
              </motion.div>
              
              {/* Glow effect on hover */}
              {isProfileHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${(profileMousePos.x + 1) * 50}% ${(profileMousePos.y + 1) * 50}%, rgba(139,92,246,0.3) 0%, transparent 60%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Right - Name, About, Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-right max-w-2xl ml-auto"
          >
            <h1 className="text-6xl md:text-8xl mb-6 tracking-tight text-white">
              Julian Pineda
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
              I am passionate about technology, innovation, and problem-solving. I'm currently studying in Manuel S. Enverga University Foundation where I've developed skills in programming.
            </p>
            <div className="flex gap-6 justify-end">
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl overflow-hidden relative shadow-lg shadow-purple-600/30 backdrop-blur-xl"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white/10 text-white rounded-2xl relative overflow-hidden backdrop-blur-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Me</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Gallery */}
      <ProjectsGallery />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Contact Footer */}
      <footer id="contact" className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-12 text-white">Get In Touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.a
              href="mailto:your.email@example.com"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(139,92,246,0.5)' }}
            >
              <Mail size={24} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-white">your.email@example.com</div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+1234567890"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(59,130,246,0.5)' }}
            >
              <Phone size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div>
                <div className="text-sm text-gray-400">Phone</div>
                <div className="text-white">+1 (234) 567-890</div>
              </div>
            </motion.a>

            <motion.a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(236,72,153,0.5)' }}
            >
              <Instagram size={24} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
              <div>
                <div className="text-sm text-gray-400">Instagram</div>
                <div className="text-white">@yourusername</div>
              </div>
            </motion.a>

            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(156,163,175,0.5)' }}
            >
              <Github size={24} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
              <div>
                <div className="text-sm text-gray-400">GitHub</div>
                <div className="text-white">@yourusername</div>
              </div>
            </motion.a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">© 2025 Julian Pineda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}