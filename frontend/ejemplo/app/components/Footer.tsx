import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A17CC] text-white py-12" id="contactanos">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contacto */}
          <div>
            <h3 className="font-bold text-xl mb-4">CONTACTO</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-sm">info@gorazer.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="text-sm">Tech Avenue, Silicon Valley, CA</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-bold text-xl mb-4">ENLACES RÁPIDOS</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-sm hover:text-blue-200 transition-colors">Inicio</a></li>
              <li><a href="#productos" className="text-sm hover:text-blue-200 transition-colors">Productos</a></li>
              <li><a href="#servicios" className="text-sm hover:text-blue-200 transition-colors">Servicios</a></li>
              <li><a href="#conocenos" className="text-sm hover:text-blue-200 transition-colors">Conócenos</a></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-bold text-xl mb-4">SÍGUENOS</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm md:text-base font-bold">
            CopyWrite@ GORAZER 2023.
          </p>
        </div>
      </div>
    </footer>
  );
}