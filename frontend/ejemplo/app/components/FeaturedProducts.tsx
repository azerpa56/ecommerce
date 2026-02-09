import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredProducts = [
  {
    id: 1,
    name: "AUDÍFONOS SPIDERMAN",
    description: "Audífonos inalámbricos con diseño moderno",
    image: "https://images.unsplash.com/photo-1748698361079-fd70b999be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2NzgzNjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Nuevo"
  },
  {
    id: 2,
    name: "AUDÍFONOS M80PRO",
    description: "Audífonos inalámbricos gaming",
    image: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMHJnYnxlbnwxfHx8fDE3Njc3OTk2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Nuevo"
  },
  {
    id: 3,
    name: "CINTA LED 10MTS",
    description: "Decora tus espacios en nuestras Luces Led",
    image: "https://images.unsplash.com/photo-1577222960414-17797ba82e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBjaHJpc3RtYXN8ZW58MXx8fHwxNzY3ODkxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Nuevo"
  },
  {
    id: 4,
    name: "AMOUSE INALÁMBRICO",
    description: "Mouse inalámbrico 2.4Ghz Gaming",
    image: "https://images.unsplash.com/photo-1760482280819-3212f185d50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMG1vdXNlJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzY3NzkyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Nuevo"
  },
  {
    id: 5,
    name: "MINI CÁMARA WIFI",
    description: "Cámara de seguridad WiFi",
    image: "https://images.unsplash.com/photo-1715869428589-366729e7fdcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWZpJTIwY2FtZXJhJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY3ODkxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Nuevo"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-white" id="inicio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D28FF]">PRODUCTOS DESTACADOS</h2>
          <p className="mt-2 text-sm text-gray-600">
            Recorre el carrusel para ver algunos de nuestros productos más populares.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#2D28FF]/60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex-shrink-0 min-w-[230px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] max-w-xs snap-center"
              >
                <div className="relative bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                  />
                  <div className="absolute top-3 right-3 bg-[#2D28FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.badge}
                  </div>
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="text-[#2D28FF] font-bold text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-xs line-clamp-3">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
