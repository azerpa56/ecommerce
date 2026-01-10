import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["INICIO", "PRODUCTOS", "SERVICIOS", "CONOCENOS", "CONTACTANOS"];

  return (
    <header className="bg-[#2D28FF] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {/* Logo Icon */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-3 h-3 bg-white rotate-45 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white rotate-45 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white rotate-45 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white rotate-45 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h1 className="font-bold text-xl leading-tight">GORAZER, CORP</h1>
                <p className="text-xs leading-tight opacity-90">La Tecnología es el Futuro</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-200 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-200 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
