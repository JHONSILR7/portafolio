// components/Contact.js
'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    alert('¡Mensaje enviado! Te contactaré pronto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "5190050780" // Número sin espacios ni símbolos
    const message = "Hola! Me interesa contactarte para hablar sobre un proyecto."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const contactInfo = [
    {
      icon: "✉️",
      title: "Email",
      value: "Jhondannysilvera@gmail.com",
      description: "Envíame un mensaje",
      action: () => window.location.href = "mailto:Jhondannysilvera@gmail.com",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "+51 900 507 780",
      description: "Disponible de 9am - 6pm",
      action: handleWhatsAppClick,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🚀",
      title: "GitHub",
      value: "github.com/JHONSILR7",
      description: "Revisa mi código",
      action: () => window.open("https://github.com/JHONSILR7", '_blank'),
      gradient: "from-gray-700 to-gray-900"
    }
  ]

  return (
    <section id="contacto" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo - Simplificados para evitar hydration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 mb-4">
            <span className="text-blue-600 font-medium text-sm">💼 Disponible para proyectos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            ¡Conectemos!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Siempre estoy emocionado por nuevas oportunidades y colaboraciones creativas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Formas de Contacto
              </h3>
              <p className="text-gray-600">Elige la que más te convenga</p>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  onClick={info.action}
                  className="group relative cursor-pointer transform transition-all duration-300 hover:scale-102"
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.gradient} flex items-center justify-center text-xl shadow-md transform group-hover:rotate-6 transition-transform duration-300`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-gray-700 font-medium text-sm">{info.value}</p>
                        <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disponibilidad */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transform rotate-1"></div>
              <div className="relative bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center text-lg mr-3">
                    ⏰
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Mi Disponibilidad</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <strong>Lunes - Viernes:</strong>
                    </span>
                    <span className="text-green-700 font-medium text-sm">9:00 AM - 6:00 PM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <span className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <strong>Sábados:</strong>
                    </span>
                    <span className="text-yellow-700 font-medium text-sm">10:00 AM - 2:00 PM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <span className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <strong>Domingos:</strong>
                    </span>
                    <span className="text-red-700 font-medium text-sm">Solo emergencias</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium text-sm">Estado actual</p>
                      <p className="text-green-700 text-xs">Disponible para proyectos freelance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transform -rotate-1"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Envíame un Mensaje
                </h3>
                <p className="text-gray-600 text-sm">Te responderé en menos de 24 horas</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Proyecto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                  >
                    <option value="">¿En qué puedo ayudarte?</option>
                    <option value="proyecto">🚀 Propuesta de Proyecto</option>
                    <option value="colaboracion">🤝 Colaboración</option>
                    <option value="practicas">🎓 Oportunidad de Prácticas</option>
                    <option value="freelance">💼 Trabajo Freelance</option>
                    <option value="consultoria">💡 Consultoría</option>
                    <option value="otro">💬 Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 resize-none"
                    placeholder="Cuéntame más detalles sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar Mensaje
                  </span>
                </button>
              </form>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm text-center">
                  <strong>💡 Tip:</strong> Mientras más detalles compartas, mejor podré ayudarte
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}