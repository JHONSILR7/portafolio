import React, { useState, useEffect, useRef } from 'react';

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
        const size = 4 + (Date.now() % 6);
        
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
      if ((Date.now() % 10) > 7 && particlesRef.current.length < 15) {
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

      {/* Nuevos elementos 3D elegantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Esfera holográfica */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-600/10 animate-float-4">
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border border-purple-400/30 animate-spin-slow-reverse"></div>
          <div className="absolute inset-8 rounded-full border border-pink-400/30 animate-spin-slow"></div>
        </div>

        {/* Toroide metálico */}
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 animate-float-5">
          <div className="torus-metal">
            <div className="torus-metal-ring"></div>
          </div>
        </div>

        {/* Estructura cristalina */}
        <div className="absolute top-1/3 right-1/3 crystal-structure animate-float-6">
          <div className="crystal-beam beam-1"></div>
          <div className="crystal-beam beam-2"></div>
          <div className="crystal-beam beam-3"></div>
          <div className="crystal-core"></div>
        </div>

        {/* Geometric 3D Shapes */}
        <div className="absolute top-20 left-20 geometric-cube animate-float-1">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>

        <div className="absolute top-40 right-32 geometric-pyramid animate-float-2">
          <div className="pyramid">
            <div className="pyramid-face pyramid-front"></div>
            <div className="pyramid-face pyramid-right"></div>
            <div className="pyramid-face pyramid-back"></div>
            <div className="pyramid-face pyramid-left"></div>
            <div className="pyramid-face pyramid-bottom"></div>
          </div>
        </div>

        <div className="absolute bottom-32 left-40 geometric-octahedron animate-float-3">
          <div className="octahedron">
            <div className="oct-face oct-1"></div>
            <div className="oct-face oct-2"></div>
            <div className="oct-face oct-3"></div>
            <div className="oct-face oct-4"></div>
            <div className="oct-face oct-5"></div>
            <div className="oct-face oct-6"></div>
            <div className="oct-face oct-7"></div>
            <div className="oct-face oct-8"></div>
          </div>
        </div>

        {/* Torus Ring */}
        <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
          <div className="torus-ring animate-spin-y">
            <div className="torus-outer">
              <div className="torus-inner"></div>
            </div>
          </div>
        </div>

        {/* DNA Helix Structure */}
        <div className="absolute bottom-20 right-40 dna-helix">
          <div className="helix-strand helix-1 animate-helix-rotate"></div>
          <div className="helix-strand helix-2 animate-helix-rotate-reverse"></div>
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
            
            {/* Badge mejorado */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-6 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-semibold tracking-wide">DISPONIBLE PARA PROYECTOS</span>
            </div>

            {/* Nombre con nuevos estilos épicos */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className="text-gray-300">Hola, soy</span>{' '}
              <div className="relative inline-block mt-2">
                {/* Efecto de texto neón 3D */}
                <div className="name-neon-3d">
                  <span className="name-neon-text">Jhon Danny Silvera Rojas </span>
                  <span className="name-neon-glow"></span>
                  <span className="name-neon-reflection"></span>
                </div>
                
                {/* Partículas de energía */}
                <div className="absolute -inset-4 name-energy-particles"></div>
              </div>
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
          
          {/* Contenedor para tu foto */}
          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 animate-pulse blur-xl transition-opacity duration-300"></div>
              
              {/* Main Photo Container */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                    
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full"></div>
                    
                    {/* Tu foto - Reemplaza el src con tu imagen */}
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src="/Foto.jpg" // Cambia esta ruta por la de tu foto
                        alt="Jhon Danny Silvera Rojas"
                        className="w-full h-full object-cover"
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
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 20s linear infinite;
        }
        
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

        /* Estilos para el nombre neón 3D */
        .name-neon-3d {
        position: relative;
        display: inline-block;
        transform-style: preserve-3d;
        perspective: 1000px;
        font-size: 0.1em; /* Reducir tamaño general */
      }

      .name-neon-text {
        position: relative;
        display: inline-block;
        font-weight: 900;
        color: #fff;
        font-size: 4.5rem; /* Tamaño más pequeño para móviles */
        text-shadow: 
          0 0 5px rgba(56, 182, 255, 0.8),
          0 0 15px rgba(56, 182, 255, 0.6),
          0 0 30px rgba(56, 182, 255, 0.4),
          0 0 60px rgba(138, 99, 210, 0.3);
        transform: translateZ(20px);
        z-index: 3;
        letter-spacing: 1px;
        background: linear-gradient(90deg, #fff, #d1d5db);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: neon-flicker 3s infinite alternate;
      }

      /* Media query para pantallas más grandes */
      @media (min-width: 768px) {
        .name-neon-text {
          font-size: 3rem; /* Tamaño un poco más grande en desktop */
        }
      }

      .name-neon-glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
          rgba(56, 182, 255, 0.3) 0%, 
          rgba(138, 99, 210, 0.4) 50%, 
          rgba(236, 72, 153, 0.3) 100%);
        border-radius: 0.5rem;
        filter: blur(10px); /* Reducir blur para tamaño más pequeño */
        transform: translateZ(10px);
        z-index: 2;
        opacity: 0.8;
      }

      .name-neon-reflection {
        position: absolute;
        top: -5%; /* Ajustar para tamaño más pequeño */
        left: -5%;
        width: 110%; /* Ajustar proporción */
        height: 110%;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.1) 100%
        );
        transform: translateZ(5px) rotateX(60deg) rotateZ(45deg);
        z-index: 4;
        pointer-events: none;
      }
        
        .name-energy-particles {
          background: radial-gradient(
            circle at center,
            rgba(56, 182, 255, 0.3) 0%,
            transparent 70%
          );
          z-index: 1;
          pointer-events: none;
        }
        
        .name-energy-particles::before,
        .name-energy-particles::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(138, 99, 210, 0.3) 0%,
            transparent 70%
          );
          animation: energy-pulse 4s infinite ease-in-out;
        }
        
        .name-energy-particles::after {
          background: radial-gradient(
            circle at center,
            rgba(236, 72, 153, 0.2) 0%,
            transparent 70%
          );
          animation-delay: 1s;
        }
        
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 
              0 0 5px rgba(56, 182, 255, 0.8),
              0 0 15px rgba(56, 182, 255, 0.6),
              0 0 30px rgba(56, 182, 255, 0.4),
              0 0 60px rgba(138, 99, 210, 0.3);
          }
          20%, 24%, 55% {
            text-shadow: 
              0 0 10px rgba(56, 182, 255, 1),
              0 0 20px rgba(56, 182, 255, 0.8),
              0 0 40px rgba(56, 182, 255, 0.6),
              0 0 80px rgba(138, 99, 210, 0.5);
          }
        }
        
        @keyframes energy-pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* Nuevos estilos para elementos 3D */
        .torus-metal {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate-3d 12s infinite linear;
        }
        
        .torus-metal-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-top-color: rgba(56, 182, 255, 0.8);
          border-bottom-color: rgba(138, 99, 210, 0.8);
          border-radius: 50%;
          box-shadow: 
            0 0 20px rgba(56, 182, 255, 0.3),
            0 0 40px rgba(138, 99, 210, 0.2);
          animation: metal-glow 3s infinite alternate;
        }
        
        .crystal-structure {
          position: relative;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          animation: rotate-3d 16s infinite linear reverse;
        }
        
        .crystal-beam {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          transform-origin: center;
        }
        
        .beam-1 {
          width: 100%;
          height: 4px;
          top: 50%;
          transform: translateY(-50%) rotateX(90deg);
        }
        
        .beam-2 {
          width: 4px;
          height: 100%;
          left: 50%;
          transform: translateX(-50%) rotateY(90deg);
        }
        
        .beam-3 {
          width: 4px;
          height: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateX(45deg) rotateY(45deg);
        }
        
        .crystal-core {
          position: absolute;
          width: 16px;
          height: 16px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(56, 182, 255, 0.6) 70%,
            transparent 100%
          );
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(56, 182, 255, 0.6);
          animation: core-pulse 3s infinite alternate;
        }
        
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes metal-glow {
          0% { 
            border-top-color: rgba(56, 182, 255, 0.8);
            border-bottom-color: rgba(138, 99, 210, 0.8);
          }
          50% { 
            border-top-color: rgba(138, 99, 210, 0.8);
            border-bottom-color: rgba(56, 182, 255, 0.8);
          }
          100% { 
            border-top-color: rgba(56, 182, 255, 0.8);
            border-bottom-color: rgba(138, 99, 210, 0.8);
          }
        }
        
        @keyframes core-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-30px) rotateZ(180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        
        @keyframes float-6 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        /* 3D Geometric Shapes */
        .geometric-cube {
          width: 60px;
          height: 60px;
          perspective: 200px;
          opacity: 0.7;
        }

        .cube {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cube 12s linear infinite;
        }

        .face {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(56, 182, 255, 0.5);
          background: rgba(56, 182, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .face.front { transform: rotateY(0deg) translateZ(30px); }
        .face.back { transform: rotateY(180deg) translateZ(30px); }
        .face.right { transform: rotateY(90deg) translateZ(30px); }
        .face.left { transform: rotateY(-90deg) translateZ(30px); }
        .face.top { transform: rotateX(90deg) translateZ(30px); }
        .face.bottom { transform: rotateX(-90deg) translateZ(30px); }

        @keyframes rotate-cube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 5s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 6s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 4s ease-in-out infinite; }

        /* Pyramid */
        .geometric-pyramid {
          width: 80px;
          height: 80px;
          perspective: 300px;
          opacity: 0.6;
        }

        .pyramid {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-pyramid 15s linear infinite;
        }

        .pyramid-face {
          position: absolute;
          border: 2px solid rgba(138, 99, 210, 0.6);
          background: rgba(138, 99, 210, 0.15);
          backdrop-filter: blur(8px);
        }

        .pyramid-front {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 60px solid rgba(138, 99, 210, 0.2);
          transform: translateZ(20px);
        }

        .pyramid-right {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 60px solid rgba(138, 99, 210, 0.2);
          transform: rotateY(90deg) translateZ(20px);
        }

        .pyramid-back {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 60px solid rgba(138, 99, 210, 0.2);
          transform: rotateY(180deg) translateZ(20px);
        }

        .pyramid-left {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 60px solid rgba(138, 99, 210, 0.2);
          transform: rotateY(-90deg) translateZ(20px);
        }

        @keyframes rotate-pyramid {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        /* Octahedron */
        .geometric-octahedron {
          width: 70px;
          height: 70px;
          perspective: 250px;
          opacity: 0.65;
        }

        .octahedron {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-octahedron 10s linear infinite;
        }

        .oct-face {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 35px solid rgba(236, 72, 153, 0.2);
          border: 1px solid rgba(236, 72, 153, 0.5);
        }

        .oct-1 { transform: rotateY(0deg) translateZ(25px); }
        .oct-2 { transform: rotateY(90deg) translateZ(25px); }
        .oct-3 { transform: rotateY(180deg) translateZ(25px); }
        .oct-4 { transform: rotateY(270deg) translateZ(25px); }
        .oct-5 { transform: rotateX(180deg) rotateY(0deg) translateZ(25px); }
        .oct-6 { transform: rotateX(180deg) rotateY(90deg) translateZ(25px); }
        .oct-7 { transform: rotateX(180deg) rotateY(180deg) translateZ(25px); }
        .oct-8 { transform: rotateX(180deg) rotateY(270deg) translateZ(25px); }

        @keyframes rotate-octahedron {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        /* Torus Ring */
        .torus-ring {
          width: 100px;
          height: 100px;
          perspective: 300px;
          opacity: 0.7;
        }

        .torus-outer {
          position: relative;
          width: 100px;
          height: 100px;
          border: 6px solid rgba(59, 130, 246, 0.4);
          border-radius: 50%;
          transform-style: preserve-3d;
          background: conic-gradient(
            from 0deg, 
            rgba(59, 130, 246, 0.1) 0deg,
            rgba(16, 185, 129, 0.1) 90deg,
            rgba(236, 72, 153, 0.1) 180deg,
            rgba(245, 158, 11, 0.1) 270deg,
            rgba(59, 130, 246, 0.1) 360deg
          );
          box-shadow: 
            inset 0 0 20px rgba(59, 130, 246, 0.3),
            0 0 30px rgba(59, 130, 246, 0.2);
        }

        .torus-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 3px solid rgba(16, 185, 129, 0.6);
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          box-shadow: 
            inset 0 0 10px rgba(16, 185, 129, 0.4),
            0 0 20px rgba(16, 185, 129, 0.3);
        }

        @keyframes spin-y {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }
        .animate-spin-y { animation: spin-y 8s linear infinite; }

        /* DNA Helix */
        .dna-helix {
          width: 60px;
          height: 120px;
          position: relative;
          opacity: 0.8;
        }

        .helix-strand {
          position: absolute;
          width: 4px;
          height: 120px;
          background: linear-gradient(
            to bottom,
            rgba(245, 158, 11, 0.8) 0%,
            rgba(236, 72, 153, 0.8) 25%,
            rgba(139, 92, 246, 0.8) 50%,
            rgba(59, 130, 246, 0.8) 75%,
            rgba(16, 185, 129, 0.8) 100%
          );
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .helix-1 {
          left: 28px;
          transform-origin: center;
        }

        .helix-2 {
          right: 28px;
          transform-origin: center;
        }

        @keyframes helix-rotate {
          0% { transform: rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes helix-rotate-reverse {
          0% { transform: rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateY(-360deg) rotateZ(-360deg); }
        }

        .animate-helix-rotate { animation: helix-rotate 6s linear infinite; }
        .animate-helix-rotate-reverse { animation: helix-rotate-reverse 6s linear infinite; }

        /* Cursor Styles */
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