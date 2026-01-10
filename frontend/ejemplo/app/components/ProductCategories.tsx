import { Headphones, Watch, Monitor, Smartphone } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "AUDÍFONOS",
    description: "No importa si son inalámbricos o no, los Audífonos que te ofrece GORAZER son la mejor en calidad de sonido,durabilidad y precio.",
    icon: Headphones,
  },
  {
    id: 2,
    name: "SMARTWATCH",
    description: "Actualízate con un Reloj inteligente que te permita no solo ver la hora, si no también recibir las notificaciones del Telefono, medir tu presión arterial y muchas más funciones actualizadas, por un bajo costo.",
    icon: Watch,
  },
  {
    id: 3,
    name: "ACCESORIOS PARA PC",
    description: "Dale otro estilo a tu PC. Los Accesorios que te ofrece GORAZER",
    icon: Monitor,
  },
  {
    id: 4,
    name: "ACCESORIOS PARA TELEFONO",
    description: "Mejora la calidad de carga, el sonido, la funcionalidad y el estilo de tu Telefono con nuestros Accesorios, todo a un bajo costo.",
    icon: Smartphone,
  },
];

export function ProductCategories() {
  return (
    <section className="py-16 bg-[#2D28FF] text-white" id="productos">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">PRODUCTOS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-[#3832FF] border-2 border-white rounded-3xl p-6 hover:bg-[#4A44FF] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 bg-white/10 p-6 rounded-full group-hover:bg-white/20 transition-all duration-300">
                    <IconComponent size={80} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-xl mb-4">{category.name}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{category.description}</p>
                  <button className="mt-6 bg-white text-[#2D28FF] px-8 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                    VISITAR
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
