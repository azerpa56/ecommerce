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
    <section className="py-8 bg-gradient-to-b from-white to-gray-50" id="servicios">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-[#2D28FF] rounded-3xl p-6 md:p-8 shadow-2xl ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Service Card - Left */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
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
                    
                    <div className="bg-[#2D28FF] text-white px-3 py-1.5 rounded-full inline-block mb-3">
                      <span className="text-xs font-semibold">Otros Servicios</span>
                    </div>

                    <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mb-3 overflow-hidden relative">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.cardTitle}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <h5 className="font-bold text-lg">{service.cardTitle}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-[#2D28FF] rounded-xl p-3">
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

                    <div className="mt-3 text-center text-xs text-gray-600 font-semibold">
                      IMPULSA TU NEGOCIO CON NOSOTROS.
                    </div>
                  </div>
                </div>

                {/* Service Description - Right */}
                <div className="lg:col-span-9">
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                    
                    <p className="text-base leading-relaxed">
                      {service.description}
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      {service.features}
                    </p>

                    <div className="pt-2">
                      <p className="font-semibold mb-3">PRECIO: CONSULTAR</p>
                      <button className="bg-white text-[#2D28FF] px-6 py-2.5 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
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
