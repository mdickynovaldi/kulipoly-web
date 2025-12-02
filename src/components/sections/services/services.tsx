"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export default function Services() {
  const { t } = useTranslation();

  const serviceCards = [
    {
      icon: "/3D.svg",
      alt: "3D",
      title: t.services.characterModeling.title,
      description: t.services.characterModeling.description,
    },
    {
      icon: "/environtment.svg",
      alt: "environment",
      title: t.services.environmentalDesign.title,
      description: t.services.environmentalDesign.description,
      priority: true,
    },
    {
      icon: "/machine.svg",
      alt: "machine",
      title: t.services.machineModeling.title,
      description: t.services.machineModeling.description,
    },
    {
      icon: "/animation.svg",
      alt: "animation",
      title: t.services.animation.title,
      description: t.services.animation.description,
    },
  ];

  return (
    <section id="services" className="w-full min-h-screen bg-black py-16 sm:py-20 lg:py-24">
      <div className="bg-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 lg:gap-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic uppercase tracking-wide">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {t.services.title}
              </span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              {t.services.description}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-4 xl:gap-6">
            {serviceCards.map((service, index) => (
              <div
                key={service.alt}
                className="group flex flex-col items-center text-center"
              >
                {/* Image Container with Orange Ring Effect */}
                <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] mx-auto">
                  {/* Orange Ring Glow Effect */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[30px] sm:h-[35px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 rounded-[100%] blur-sm opacity-80" />
                    <div 
                      className="absolute inset-0 border-2 border-orange-500/60 rounded-[100%]"
                      style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(234, 88, 12, 0.2) 50%, rgba(234, 88, 12, 0.4) 100%)',
                        transform: 'perspective(100px) rotateX(60deg)',
                      }}
                    />
                  </div>
                  
                  {/* 3D Image */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                    <Image
                      src={service.icon}
                      height={180}
                      width={180}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      alt={service.alt}
                      priority={service.priority || index === 0}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg sm:text-xl mt-4 sm:mt-6 transition-colors group-hover:text-orange-400">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed max-w-[250px] line-clamp-3">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
