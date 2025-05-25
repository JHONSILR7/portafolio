// components/Footer.js
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Información personal */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Jhon Danny Silvera Rojas</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Estudiante de Ingeniería de Sistemas apasionado por crear soluciones 
              tecnológicas innovadoras y funcionales.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/JHONSILR7" className="text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('habilidades').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Habilidades
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto rápido */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📧 Jhondannysilvera@gmail.com</li>
              <li>📱 +51 900507780</li>
              <li>📍 Andahuaylas, Perú</li>
              <li>🎓 7mo Ciclo - Ing. Sistemas</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Jhon Danny. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <p className="text-gray-300 text-sm">
                Hecho con ❤️ usando Next.js & Tailwind CSS
              </p>
              <button 
                onClick={scrollToTop}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                aria-label="Volver arriba"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}