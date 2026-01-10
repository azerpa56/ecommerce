import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  isMenuOpen = false;
  menuItems = ["INICIO", "PRODUCTOS", "SERVICIOS", "CONOCENOS", "CONTACTANOS"];

  categories = [
    {
      id: 1,
      name: "AUDÍFONOS",
      description: "No importa si son inalámbricos o no, los Audífonos que te ofrece GORAZER son la mejor en calidad de sonido,durabilidad y precio.",
      iconName: 'headphones',
    },
    {
      id: 2,
      name: "SMARTWATCH",
      description: "Actualízate con un Reloj inteligente que te permita no solo ver la hora, si no también recibir las notificaciones del Telefono, medir tu presión arterial y muchas más funciones actualizadas, por un bajo costo.",
      iconName: 'watch',
    },
    {
      id: 3,
      name: "ACCESORIOS PARA PC",
      description: "Dale otro estilo a tu PC. Los Accesorios que te ofrece GORAZER",
      iconName: 'monitor',
    },
    {
      id: 4,
      name: "ACCESORIOS PARA TELEFONO",
      description: "Mejora la calidad de carga, el sonido, la funcionalidad y el estilo de tu Telefono con nuestros Accesorios, todo a un bajo costo.",
      iconName: 'smartphone',
    },
  ];

  services = [
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

  aboutUsItems = [
    {
      title: "¿QUIENES SOMOS?",
      iconName: 'help-circle',
      image: "https://images.unsplash.com/photo-1650446007980-b1c1093eb2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBxdWVzdGlvbiUyMG1hcmslMjB0aGlua2luZ3xlbnwxfHx8fDE3Njc4OTE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: '<span class="font-bold">GORAZER TECH,</span> es una empresa dedicada a la venta de equipos de tecnología, y ofreces servicios de la misma en la que se puedan cumplir con las necesidades en cuanto al área tecnológica.'
    },
    {
      title: "MISIÓN",
      iconName: 'target',
      image: "https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY3ODQ0MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: 'Nuestra Misión es en cumplir con todas las necesidades de nuestros clientes en el área <span class="font-bold">TECNOLÓGICA.</span>'
    },
    {
      title: "VISIÓN",
      iconName: 'eye',
      image: "https://images.unsplash.com/photo-1579864795584-092b04e14e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHZpc2lvbiUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzY3ODE1NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: 'Nuestra Visión es convertirnos en una marca reconocida representativa en distintas categorías a nivel mundial, en donde ya nos conozcan por todo lo que somos, ofreciendo servicios y productos de calidad.'
    }
  ];

  // Mock data compatible with the design
  products = [
    {
      id: 1,
      name: "AUDÍFONOS SPIDERMAN",
      description: "Audífonos inalámbricos con diseño moderno",
      image: "https://images.unsplash.com/photo-1748698361079-fd70b999be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2NzgzNjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "Nuevo",
      price: 0 // Added for compatibility if needed
    },
    {
      id: 2,
      name: "AUDÍFONOS M80PRO",
      description: "Audífonos inalámbricos gaming",
      image: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMHJnYnxlbnwxfHx8fDE3Njc3OTk2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "Nuevo",
      price: 0
    },
    {
      id: 3,
      name: "CINTA LED 10MTS",
      description: "Decora tus espacios en nuestras Luces Led",
      image: "https://images.unsplash.com/photo-1577222960414-17797ba82e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBjaHJpc3RtYXN8ZW58MXx8fHwxNzY3ODkxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "Nuevo",
      price: 0
    },
    {
      id: 4,
      name: "AMOUSE INALÁMBRICO",
      description: "Mouse inalámbrico 2.4Ghz Gaming",
      image: "https://images.unsplash.com/photo-1760482280819-3212f185d50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMG1vdXNlJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzY3NzkyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "Nuevo",
      price: 0
    },
    {
      id: 5,
      name: "MINI CÁMARA WIFI",
      description: "Cámara de seguridad WiFi",
      image: "https://images.unsplash.com/photo-1715869428589-366729e7fdcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWZpJTIwY2FtZXJhJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY3ODkxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "Nuevo",
      price: 0
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    // Optionally connect to backend later
    // this.productService.getProducts().subscribe(...)
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
