import React from 'react';

export default function InteractiveBackground({ mousePos, windowDimensions }) {
  return (
    <>
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
    </>
  );
}