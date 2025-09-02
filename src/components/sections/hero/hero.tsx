import { FlipWords } from "@/components/ui/flip-words";
import SplineViewer from "./SplineViewer";
import Image from "next/image";

import { TextScramble } from "@/components/ui/text-scramble";

export default function Hero() {
  const words = ["AR", "VR", "DIGITAL TWIN", "ANIMATION"];
  return (
    <section className="w-full h-screen">
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
          <div className="  mt-36 pl-28   flex flex-col gap-10 w-full">
            <div className="w-full flex flex-row gap-1.5">
              <div>
                <h1 className="text-6xl font-bold ">
                  PERFORMANCE
                  <br />
                  DRIVEN 3D FOR
                </h1>
              </div>
              <div className="flex items-end">
                <FlipWords
                  className="text-6xl font-bold text-[#E5391A] "
                  words={words}
                />
              </div>
            </div>
            <div className="w-1/4">
              <p>
                A Lot of applications run slow caused by oversized 3D assets.
                Let us handle your 3D asset needs. Optimized to boost your
                performance.
              </p>
            </div>
          </div>
          <div className="w-1/4 mt-20 pl-28 flex flex-col gap-2">
            <div>
              <h2 className="text-gray-400">Established </h2>
              <TextScramble
                duration={1}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-2xl">
                2024
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
            <div>
              <h2 className="text-gray-400">3D Created </h2>
              <TextScramble
                duration={2}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-2xl">
                06710
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
            <div>
              <h2 className="text-gray-400">Project Created </h2>
              <TextScramble
                duration={3}
                speed={0.04}
                characterSet="0123456789"
                className="font-bold text-2xl">
                00025
              </TextScramble>
              <div className="w-full h-0.5 bg-black my-2"></div>
            </div>
          </div>
        </div>
        <SplineViewer
          className="absolute inset-0 z-0 pointer-events-auto"
          scene="https://prod.spline.design/5JZhv0Zi2z0yUG4Y/scene.splinecode"
        />
      </div>
      <div className="absolute bottom-30 right-270">
        <Image src="/ornamen.svg" alt="hero-image" width={400} height={400} />
      </div>
      <div className="absolute bottom-0 right-0">
        <Image src="/ornamen2.svg" alt="hero2-image" width={400} height={400} />
      </div>
    </section>
  );
}
