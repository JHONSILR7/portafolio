import React, { useState, useEffect, useRef } from 'react';
import '@/styles/hero.css';
import InteractiveBackground from './Inter';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const particlesRef = useRef([]);
  const cursorTrailRef = useRef([]);
  const mouseTimeoutRef = useRef(null);
  const cursorRef = useRef(null);
  const rafId = useRef(null);

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

  // Función para actualizar la posición del cursor de forma suave
  const updateCursorPosition = (targetX, targetY) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
    }
  };

  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e) => {
      const newPos = { 
        x: e.clientX, 
        y: e.clientY 
      };
      
      setMousePos(newPos);
      setIsMouseMoving(true);
      
      // Actualizar inmediatamente la posición del cursor
      updateCursorPosition(newPos.x, newPos.y);
      
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
        
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          left: ${newPos.x}px;
          top: ${newPos.y}px;
          background: radial-gradient(circle, rgba(56, 182, 255, 0.8) 0%, rgba(138, 99, 210, 0.4) 70%, transparent 100%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 45;
          box-shadow: 0 0 10px rgba(56, 182, 255, 0.6);
          animation: trail-fade 0.6s forwards;
        `;
        
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
        
        particle.className = 'cursor-particle';
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          left: ${newPos.x + ((Date.now() % 60) - 30)}px;
          top: ${newPos.y + ((Date.now() % 60) - 30)}px;
          background: radial-gradient(circle, ${randomColor} 0%, transparent 70%);
          box-shadow: 0 0 20px ${randomColor};
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 40;
          animation: cosmic-drift ${0.8 + (Date.now() % 10) / 10}s forwards;
        `;
        
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isClient]);

  return (
    <section id="inicio" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center">
      
      {/* Cursor Principal Épico Mejorado */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 ${isMouseMoving ? 'scale-110' : 'scale-100'}`}
        style={{
          left: 0,
          top: 0,
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'scale 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        {/* Núcleo del cursor */}
        <div 
          className="w-4 h-4 rounded-full absolute top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
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
          className={`absolute top-1/2 left-1/2 rounded-full border-2 transition-all duration-200 ${
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

      <InteractiveBackground 
        mousePos={mousePos} 
        windowDimensions={windowDimensions} 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Contenido Principal */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-6 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-semibold tracking-wide">DISPONIBLE PARA PROYECTOS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className="text-gray-200">Hola, soy</span>{' '}
              <div className="relative inline-block mt-2">
                <div className="name-neon-3d">
                  <span className="name-neon-text">JHON DANNY SILVERA ROJAS</span>
                  <span className="name-neon-glow"></span>
                  <span className="name-neon-reflection"></span>
                </div>
                
                {/* Partículas de energía */}
                <div className="absolute -inset-4 name-energy-particles"></div>
              </div>
            </h1>
            
            <div className="space-y-3 mb-6">
              {/* Título mejorado y más destacado */}
              <div className="relative">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">
                  Estudiante en Ingeniería de Sistemas
                </p>
                
                {/* Efectos de resplandor para el título */}
                <div className="absolute inset-0 text-xl sm:text-2xl lg:text-3xl font-black text-cyan-400/20 blur-sm">
                  Estudiante de Ingeniería de Sistemas
                </div>
                <div className="absolute inset-0 text-xl sm:text-2xl lg:text-3xl font-black text-blue-400/20 blur-md">
                  Estudiante de Ingeniería de Sistemas
                </div>
                
                {/* Línea decorativa debajo */}
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto lg:mx-0 mt-2 rounded-full shadow-lg shadow-cyan-400/50"></div>
              </div>
              
              <p className="text-base text-gray-300 max-w-xl leading-relaxed lg:mx-0 mx-auto">
                Especializado en crear experiencias digitales 
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

      <style jsx>{`
        @keyframes trail-fade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
        }

        @keyframes cosmic-drift {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) rotate(360deg);
          }
        }

        @keyframes cursor-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }

        @keyframes cursor-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        * {
          cursor: none !important;
        }
      `}</style>
    </section>
  );
}