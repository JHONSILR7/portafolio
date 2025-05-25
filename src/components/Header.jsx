import { useState, useEffect } from 'react'

export default function EpicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [scrollProgress, setScrollProgress] = useState(0)

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'habilidades', label: 'Skills', icon: '⚡' },
    { id: 'contacto', label: 'Contacto', icon: '📱' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }

      // Calculate scroll progress more accurately
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const trackLength = docHeight - windowHeight
      const progress = Math.floor((scrollTop / trackLength) * 100)
      setScrollProgress(progress > 100 ? 100 : progress < 0 ? 0 : progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10' 
          : 'bg-transparent'
      }`}>
        {/* Progress Bar mejorada - Ahora con cálculo preciso */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700/30 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ 
              width: `${scrollProgress}%`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.7)',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
            }}
          />
        </div>

        <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex justify-between items-center py-3">
            
            {/* Logo - Alineado a la izquierda */}
            <div className="relative group">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                   onClick={() => scrollToSection('inicio')}>
                <span className="relative">
                  Mi Portafolio
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation - Alineado a la derecha */}
            <div className="hidden lg:flex items-center space-x-1 ml-auto mr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button - Separado del menú */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  ¡Hablemos! <span className="ml-2">🚀</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 flex items-center justify-center group ml-4"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm transform ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'
                }`} />
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'
                }`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Ahora aparece desde la derecha */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 fixed top-16 right-3 w-72 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl shadow-purple-500/10">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
              
              {/* Mobile CTA */}
              <button 
                onClick={() => scrollToSection('contacto')}
                className="w-full mt-3 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center"
              >
                ¡Conectemos! <span className="ml-2">🚀</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Estilos globales para animaciones */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .menu-item {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  )
}