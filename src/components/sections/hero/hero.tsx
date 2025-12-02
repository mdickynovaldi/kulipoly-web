"use client";

import { FlipWords } from "@/components/ui/flip-words";
import SplineViewer from "./SplineViewer";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";
import { useTranslation } from "@/lib/i18n";

export default function Hero() {
  const words = ["AR", "VR", "DIGITAL TWIN", "ANIMATION"];
  const { t } = useTranslation();

  return (
    <section id="hero" className="w-full min-h-screen relative overflow-hidden">
      <div className="w-full min-h-screen relative">
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
          <div className="mt-24 sm:mt-28 md:mt-32 lg:mt-36 px-4 sm:px-8 md:px-16 lg:px-28 flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full">
            <div className="w-full flex flex-col sm:flex-row gap-1.5">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  {t.hero.title1}
                  <br />
                  {t.hero.title2}
                </h1>
              </div>
              <div className="flex items-end">
                <FlipWords
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E5391A]"
                  words={words}
                />
              </div>
            </div>
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/4">
              <p className="text-sm sm:text-base">{t.hero.description}</p>
            </div>
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/4 mt-10 sm:mt-14 lg:mt-20 px-4 sm:px-8 md:px-16 lg:px-28 flex flex-col gap-2">
            <div>
              <h2 className="text-gray-400 text-sm sm:text-base">{t.hero.established}</h2>
              <TextScramble
                duration={1}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-xl sm:text-2xl">
                2024
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm sm:text-base">{t.hero.threeD_created}</h2>
              <TextScramble
                duration={2}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-xl sm:text-2xl">
                06710
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm sm:text-base">{t.hero.project_created}</h2>
              <TextScramble
                duration={3}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-xl sm:text-2xl">
                00025
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
          </div>
        </div>
        {/* Spline 3D - hanya tampil di laptop/desktop (lg breakpoint ke atas) */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-auto">
          <SplineViewer
            className="w-full h-full"
            scene="https://prod.spline.design/5JZhv0Zi2z0yUG4Y/scene.splinecode"
          />
        </div>
        {/* Background fallback untuk mobile - gradient yang menarik */}
        <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-br from-gray-100 via-white to-orange-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(229,57,26,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(229,57,26,0.05),transparent_50%)]" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 lg:w-auto">
        <Image 
          src="/ornamen.svg" 
          alt="" 
          width={500} 
          height={500} 
          className="w-full h-auto"
          aria-hidden
        />
      </div>
      <div className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-48 lg:w-auto">
        <Image 
          src="/ornamen2.svg" 
          alt="" 
          width={400} 
          height={400} 
          className="w-full h-auto"
          aria-hidden
        />
      </div>
    </section>
  );
}
