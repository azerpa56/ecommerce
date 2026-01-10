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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border-2 border-[#2D28FF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative aspect-square bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#2D28FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.badge}
                </div>
              </div>
              <div className="p-4 bg-white text-center">
                <h3 className="text-[#2D28FF] font-bold text-sm mb-2">{product.name}</h3>
                <p className="text-gray-600 text-xs">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
