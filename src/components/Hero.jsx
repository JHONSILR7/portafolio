import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const particlesRef = useRef([]);
  const cursorTrailRef = useRef([]);
  const mouseTimeoutRef = useRef(null);

  // Iconos para las tecnologías
  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' }
  ];

  // Manejar dimensiones de ventana
  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    setIsClient(true);
    updateDimensions();
    
    window.addEventListener('resize', updateDimensions);
    
    // Delay para evitar flash
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePos(newPos);
      setIsMouseMoving(true);
      
      // Clear timeout para detectar cuando para el movimiento
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);

      // Trail effect - crear rastro del cursor
      if (cursorTrailRef.current.length < 8) {
        const trail = document.createElement('div');
        const size = 4 + (Date.now() % 6); // Usar timestamp en lugar de Math.random()
        
        trail.className = 'fixed rounded-full pointer-events-none z-45';
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.background = 'radial-gradient(circle, rgba(56, 182, 255, 0.8) 0%, rgba(138, 99, 210, 0.4) 70%, transparent 100%)';
        trail.style.transform = 'translate(-50%, -50%)';
        trail.style.animation = 'trail-fade 0.6s forwards';
        trail.style.boxShadow = '0 0 10px rgba(56, 182, 255, 0.6)';
        
        document.body.appendChild(trail);
        cursorTrailRef.current.push(trail);
        
        setTimeout(() => {
          if (trail.parentNode) {
            trail.remove();
          }
          cursorTrailRef.current = cursorTrailRef.current.filter(t => t !== trail);
        }, 600);
      }
      
      // Partículas energéticas mejoradas
      if ((Date.now() % 10) > 7 && particlesRef.current.length < 15) { // Reemplazar Math.random()
        const particle = document.createElement('div');
        const size = 3 + (Date.now() % 8);
        const colors = [
          'rgba(56, 182, 255, 0.9)',
          'rgba(138, 99, 210, 0.9)',
          'rgba(236, 72, 153, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(16, 185, 129, 0.9)'
        ];
        const randomColor = colors[Date.now() % colors.length];
        
        particle.className = 'fixed rounded-full pointer-events-none z-40';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${e.clientX + ((Date.now() % 60) - 30)}px`;
        particle.style.top = `${e.clientY + ((Date.now() % 60) - 30)}px`;
        particle.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;
        particle.style.boxShadow = `0 0 20px ${randomColor}`;
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animation = `cosmic-drift ${0.8 + (Date.now() % 10) / 10}s forwards`;
        
        document.body.appendChild(particle);
        particlesRef.current.push(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
          particlesRef.current = particlesRef.current.filter(p => p !== particle);
        }, 1800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [isClient]);
  return (
    <section id="inicio" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center">
      
      {/* Cursor Principal Épico */}
      <div 
        className={`fixed pointer-events-none z-50 ${isMouseMoving ? 'scale-110' : 'scale-100'}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'scale 0.1s ease-out',
        }}
      >
        {/* Núcleo del cursor */}
        <div 
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(56, 182, 255, 1) 0%, rgba(138, 99, 210, 0.8) 50%, transparent 100%)',
            boxShadow: `
              0 0 20px rgba(56, 182, 255, 0.8),
              0 0 40px rgba(56, 182, 255, 0.6),
              0 0 60px rgba(56, 182, 255, 0.4),
              inset 0 0 10px rgba(255, 255, 255, 0.5)
            `,
          }}
        />
        
        {/* Anillo exterior pulsante */}
        <div 
          className={`absolute top-1/2 left-1/2 rounded-full border-2 transition-all duration-300 ${
            isMouseMoving ? 'border-cyan-300' : 'border-cyan-400'
          }`}
          style={{
            width: isMouseMoving ? '60px' : '40px',
            height: isMouseMoving ? '60px' : '40px',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 30px rgba(56, 182, 255, ${isMouseMoving ? '0.8' : '0.5'})`,
            animation: 'cursor-pulse 2s infinite ease-in-out'
          }}
        />
        
        {/* Anillo intermedio */}
        <div 
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border border-purple-400/30"
          style={{
            transform: 'translate(-50%, -50%)',
            animation: 'cursor-rotate 8s linear infinite reverse'
          }}
        />
        
        {/* Elementos orbitales */}
        <div 
          className="absolute top-1/2 left-1/2 w-20 h-20"
          style={{
            transform: 'translate(-50%, -50%)',
            animation: 'cursor-rotate 4s linear infinite'
          }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-cyan-400/50" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-purple-400/50" />
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-pink-400/50" />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-blue-400/50" />
        </div>
      </div>

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="meshGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="meshGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <g>
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d={`M ${(mousePos.x * 0.1 + i * 120) % windowDimensions.width} 0 
                   Q ${(mousePos.x * 0.05 + i * 80) % windowDimensions.width} ${windowDimensions.height / 2} 
                     ${(mousePos.x * 0.1 + i * 120 + 100) % windowDimensions.width} ${windowDimensions.height}`}
                stroke="url(#meshGradient1)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            
            {[...Array(8)].map((_, i) => (
              <path
                key={`h-${i}`}
                d={`M 0 ${(mousePos.y * 0.1 + i * 80) % windowDimensions.height}
                   Q ${windowDimensions.width / 2} ${(mousePos.y * 0.05 + i * 60) % windowDimensions.height}
                     ${windowDimensions.width} ${(mousePos.y * 0.1 + i * 80 + 50) % windowDimensions.height}`}
                stroke="url(#meshGradient2)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Interactive Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse transition-all duration-300"
          style={{
            left: `${mousePos.x * 0.03}px`,
            top: `${mousePos.y * 0.03}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse delay-300"
          style={{
            right: `${(windowDimensions.width - mousePos.x) * 0.02}px`,
            top: `${mousePos.y * 0.01 + 100}px`,
          }}
        />
        
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/12 to-blue-400/12 rounded-full blur-3xl animate-pulse delay-700"
          style={{
            left: `${mousePos.x * 0.01}px`,
            bottom: `${(windowDimensions.height - mousePos.y) * 0.02}px`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Contenido Principal */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">Disponible para proyectos</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              Hola, soy{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Jhon Danny Silvera Rojas
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-30 animate-pulse"></div>
              </span>
            </h1>
            
            <div className="space-y-3 mb-6">
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Desarrollador Full Stack
              </p>
              
              <p className="text-base text-gray-300 max-w-xl leading-relaxed lg:mx-0 mx-auto">
                Estudiante de Ingeniería de Sistemas en 7mo ciclo. Especializado en crear experiencias digitales 
                excepcionales mediante código limpio, arquitecturas escalables y las últimas tecnologías.
              </p>
            </div>

            {/* Tech Stack con Iconos */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
              {techStack.map((tech, index) => (
                <span 
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-base">{tech.icon}</span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-2 border-white/30 text-white px-7 py-3 rounded-full font-bold text-base backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50"
              >
                <span className="flex items-center gap-2">
                  Contactarme
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Avatar Profesional */}
          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 animate-pulse blur-xl transition-opacity duration-300"></div>
              
              {/* Main Avatar Container */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                    
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full"></div>
                    
                    {/* Tu foto */}
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/Foto.jpg"
                        alt="Jhon Danny Silvera Rojas"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        quality={100}
                        priority
                      />
                    </div>
                    
                    {/* Floating Code Elements */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-3 right-6 text-cyan-400 text-xs font-mono animate-pulse">&lt;/&gt;</div>
                      <div className="absolute bottom-6 left-5 text-purple-400 text-xs font-mono animate-pulse delay-500">{ }</div>
                      <div className="absolute top-1/2 left-3 text-blue-400 text-xs font-mono animate-pulse delay-1000">🚀</div>
                    </div>
                  </div>
                </div>
                
                {/* Orbiting Elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <span className="text-xl">⚡</span>
                </div>
                
                <div className="absolute bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse delay-700 shadow-lg">
                  <span className="text-lg">✨</span>
                </div>
                
                <div className="absolute top-1/2 -right-5 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-ping shadow-lg">
                  <span className="text-sm">🎯</span>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">7mo</div>
                  <div className="text-xs text-gray-300">Ciclo</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">∞</div>
                  <div className="text-xs text-gray-300">Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-sm font-medium">Explorar</span>
            <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/60 rounded-full mt-1.5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        /* Efecto de cursor épico */
        @keyframes cursor-pulse {
          0% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes cursor-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Efecto de rastro del cursor */
        @keyframes trail-fade {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }
        }
        
        /* Efecto de partículas cósmicas mejorado */
        @keyframes cosmic-drift {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(
              calc(-50% + 25px),
              calc(-50% + 25px)
            ) scale(1.2) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: translate(
              calc(-50% + 50px),
              calc(-50% + 50px)
            ) scale(0.1) rotate(360deg);
            opacity: 0;
          }
        }
        
        /* Ocultar cursor por defecto solo cuando está cargado el cliente */
        ${isClient ? `
        * {
          cursor: none !important;
        }
        
        a, button, [role="button"] {
          cursor: none !important;
        }
        ` : ''}
      `}</style>
    </section>
  );
}