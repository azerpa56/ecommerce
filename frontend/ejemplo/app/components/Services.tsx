import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MessageCircle } from "lucide-react";

const services = [
  {
    id: 1,
    title: "DESARROLLO DE PAGINAS WEB",
    description: "Intégrate en la tecnología con nosotros, por eso te ofrecemos el Desarrollo de Páginas Web.",
    features: "Podemos crearte tu propio Sitio Web, Portafolio, Tienda y más.",
    image: "https://images.unsplash.com/photo-1551641145-a1e18544acb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjBjb2RpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY3ODkxOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "Desarrollador web",
    cardFeatures: [
      "OFRECE LOS PRODUCTOS PARA:",
      "TIENDA ONLINE",
      "PORTAFOLIOS WEB",
      "BLOGGEROS.COM",
      "ENTRE OTROS."
    ]
  },
  {
    id: 2,
    title: "SOPORTE TECNICO",
    description: "En GORAZER nos preocupa tanto tu bienestar como el de tus equipos, por eso te ofrecemos el Servicio Técnico en CPU y Laptops.",
    features: "No solo limpieza sino también reparación y repotenciación del mismo.",
    image: "https://images.unsplash.com/photo-1646756089735-487709743361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHJlcGFpciUyMHRlY2huaWNpYW58ZW58MXx8fHwxNzY3ODI4ODAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "Servicio Técnico",
    cardFeatures: [
      "REVISION GRATIS",
      "•Mantenimiento de software y hardware.",
      "•Reparación de Cargadores. (Laptop)",
      "TRABAJAMOS RAPIDO Y SEGURO"
    ]
  }
];

export function Services() {
  return (
    <section className="py-12 bg-gray-50" id="servicios">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D28FF]">SERVICIOS</h2>
          <p className="mt-2 text-sm text-gray-600">
            Soluciones tecnológicas para tu negocio y tus equipos.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-4 md:p-6 shadow-md border border-[#2D28FF]/20 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Service Card - Left */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#2D28FF]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <div className="grid grid-cols-2 gap-0.5">
                          <div className="w-2 h-2 bg-[#2D28FF] rotate-45 rounded-sm"></div>
                          <div className="w-2 h-2 bg-[#2D28FF] rotate-45 rounded-sm"></div>
                          <div className="w-2 h-2 bg-[#2D28FF] rotate-45 rounded-sm"></div>
                          <div className="w-2 h-2 bg-[#2D28FF] rotate-45 rounded-sm"></div>
                        </div>
                      </div>
                      <h4 className="text-[#2D28FF] font-bold text-sm">GORAZER, CORP</h4>
                    </div>
                    
                    <div className="bg-[#2D28FF] text-white px-3 py-1.5 rounded-full inline-block mb-3 text-xs">
                      <span className="text-xs font-semibold">Otros Servicios</span>
                    </div>

                    <div className="aspect-[4/3] max-h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mb-3 overflow-hidden relative">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.cardTitle}
                        className="card-image opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <h5 className="font-bold text-lg">{service.cardTitle}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#2D28FF]/30 rounded-xl p-3">
                      {service.cardFeatures.map((feature, idx) => (
                        <p
                          key={idx}
                          className={`text-xs ${
                            idx === 0 ? "font-bold text-[#2D28FF] mb-1" : "text-gray-700"
                          }`}
                        >
                          {feature}
                        </p>
                      ))}
                    </div>

                    <div className="mt-3 text-center text-[11px] text-gray-600 font-semibold">
                      IMPULSA TU NEGOCIO CON NOSOTROS.
                    </div>
                  </div>
                </div>

                {/* Service Description - Right */}
                <div className="lg:col-span-8">
                  <div className="text-[#1f2933] space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-[#2D28FF]">{service.title}</h3>
                    
                    <p className="text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                    
                    <p className="text-sm md:text-base leading-relaxed">
                      {service.features}
                    </p>

                    <div className="pt-2">
                      <p className="font-semibold mb-3 text-sm">PRECIO: CONSULTAR</p>
                      <button className="bg-[#2D28FF] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#2520d6] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
                        <span>CONTACTANOS</span>
                        <MessageCircle size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
