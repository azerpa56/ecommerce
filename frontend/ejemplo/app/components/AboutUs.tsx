import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HelpCircle, Target, Eye } from "lucide-react";

export function AboutUs() {
  return (
    <section className="py-16 bg-[#2D28FF] text-white" id="conocenos">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">CONÓCENOS</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiénes Somos */}
          <div className="bg-[#3832FF] border-2 border-white rounded-3xl p-6 hover:bg-[#4A44FF] transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <HelpCircle size={32} />
                <h3 className="font-bold text-2xl">¿QUIENES SOMOS?</h3>
              </div>
              
              <div className="bg-white rounded-2xl overflow-hidden mb-4 w-full max-w-sm mx-auto aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1650446007980-b1c1093eb2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBxdWVzdGlvbiUyMG1hcmslMjB0aGlua2luZ3xlbnwxfHx8fDE3Njc4OTE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="¿Quiénes Somos?"
                  className="card-image"
                />
              </div>
              
              <p className="text-sm leading-relaxed">
                <span className="font-bold">GORAZER TECH,</span> es una empresa dedicada a la venta de equipos de tecnología, y ofreces servicios de la misma en la que se puedan cumplir con las necesidades en cuanto al área tecnológica.
              </p>
            </div>
          </div>

          {/* Misión */}
          <div className="bg-[#3832FF] border-2 border-white rounded-3xl p-6 hover:bg-[#4A44FF] transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Target size={32} />
                <h3 className="font-bold text-2xl">MISIÓN</h3>
              </div>
              
              <div className="bg-white rounded-2xl overflow-hidden mb-4 w-full max-w-sm mx-auto aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY3ODQ0MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Misión"
                  className="card-image"
                />
              </div>
              
              <p className="text-sm leading-relaxed">
                Nuestra Misión es en cumplir con todas las necesidades de nuestros clientes en el área <span className="font-bold">TECNOLÓGICA.</span>
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-[#3832FF] border-2 border-white rounded-3xl p-6 hover:bg-[#4A44FF] transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Eye size={32} />
                <h3 className="font-bold text-2xl">VISIÓN</h3>
              </div>
              
              <div className="bg-white rounded-2xl overflow-hidden mb-4 w-full max-w-sm mx-auto aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579864795584-092b04e14e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHZpc2lvbiUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzY3ODE1NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Visión"
                  className="card-image"
                />
              </div>
              
              <p className="text-sm leading-relaxed">
                Nuestra Visión es convertirnos en una marca reconocida representativa en distintas categorías a nivel mundial, en donde ya nos conozcan por todo lo que somos, ofreciendo servicios y productos de calidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
