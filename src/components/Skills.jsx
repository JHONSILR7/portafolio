"use client"
import { useState, useEffect } from 'react';

export default function Skills() {
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Detectar cuando estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generar partículas solo después de que el componente esté hidratado
  useEffect(() => {
    if (isClient) {
      const particleData = [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6
      }));
      setParticles(particleData);
    }
  }, [isClient]);

  // Tecnologías organizadas por expertise level
  const skillsData = [
    {
      category: "Frontend",
      emoji: "🎨",
      gradient: "from-pink-500 to-purple-600",
      skills: [
        { 
          name: "Next.js", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
          color: "from-gray-700 to-gray-900"
        },
        { 
          name: "JavaScript", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
          color: "from-yellow-400 to-yellow-600"
        },
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          color: "from-purple-600 to-purple-800"
        },
        {
          name: "Tailwind",
          icon: "https://unpkg.com/simple-icons@v11/icons/tailwindcss.svg",
          color: "from-teal-400 to-cyan-500"
        }
      ]
    },
    {
      category: "Backend",
      emoji: "⚡",
      gradient: "from-green-500 to-emerald-600",
      skills: [
        { 
          name: "Node.js", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
          color: "from-green-500 to-green-700"
        },
        { 
          name: "Python", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
          color: "from-blue-400 to-yellow-500"
        },
        { 
          name: "Java", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
          color: "from-red-500 to-orange-600"
        },
        { 
          name: "PHP", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", 
          color: "from-indigo-500 to-purple-600"
        }
      ]
    },
    {
      category: "Database",
      emoji: "🗄️",
      gradient: "from-blue-500 to-indigo-600",
      skills: [
        { 
          name: "MySQL", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", 
          color: "from-blue-600 to-blue-800"
        },
        { 
          name: "SQL Server", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", 
          color: "from-red-600 to-red-800"
        }
      ]
    },
    {
      category: "Tools",
      emoji: "🛠️",
      gradient: "from-orange-500 to-red-600",
      skills: [
        { 
          name: "Git", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
          color: "from-orange-500 to-red-600"
        },
        { 
          name: "Docker", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", 
          color: "from-blue-400 to-blue-600"
        },
        { 
          name: "VS Code", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", 
          color: "from-blue-500 to-indigo-600"
        },
        { 
          name: "Figma", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", 
          color: "from-purple-400 to-pink-500"
        }
      ]
    }
  ];

  const futureSkills = [
    { 
      name: "AWS", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", 
      color: "from-orange-400 to-yellow-500"
    },
    { 
      name: "Kubernetes", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", 
      color: "from-blue-400 to-indigo-500"
    },
    { 
      name: "TensorFlow", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", 
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "Flutter", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", 
      color: "from-blue-400 to-cyan-500"
    }
  ];

  return (
    <section id="habilidades" className="relative py-16 bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Partículas animadas - solo se renderizan en el cliente */}
        {isClient && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-50"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        {/* Formas geométricas */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Tech Stack
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tecnologías que domino para crear 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold"> experiencias increíbles</span>
          </p>
        </div>

        {/* Grid de habilidades */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {skillsData.map((category, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Card principal */}
              <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
                {/* Header de categoría */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-xl">{category.emoji}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{category.category}</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
                </div>
                
                {/* Skills grid */}
                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="group/skill relative flex items-center p-3 rounded-lg bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 border border-white/5 hover:border-white/20"
                    >
                      {/* Icono */}
                      <div className={`relative w-10 h-10 rounded-lg mr-3 bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-md group-hover/skill:scale-105 transition-all duration-300 p-2`}>
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full bg-white/20 rounded items-center justify-center text-white font-bold text-xs">
                          {skill.name.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Info del skill */}
                      <div className="flex-1">
                        <span className="text-white font-medium text-sm">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de próximas tecnologías */}
        <div className="text-center">
          <div className="inline-block p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
              🎯 Next Level Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {futureSkills.map((skill, i) => (
                <div 
                  key={i} 
                  className="group/future relative"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-md group-hover/future:scale-110 group-hover/future:-rotate-6 transition-all duration-300 p-2.5`}>
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-full h-full object-contain filter drop-shadow-sm opacity-80 group-hover/future:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-white/20 rounded items-center justify-center text-white font-bold text-xs">
                      {skill.name.charAt(0)}
                    </div>
                  </div>
                  <p className="text-white text-xs font-medium mt-2 opacity-80 group-hover/future:opacity-100 transition-opacity duration-300">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}