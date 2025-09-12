import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export default function Services() {
  return (
    <section id="services" className="w-full h-screen bg-black">
      <div className="bg-black">
        <div className="  mt-36    flex flex-col gap-10 w-full">
          <div className="w-full flex flex-col gap-1.5">
            <div className="text-center mt-50">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                OUR SERVICE
              </h1>
              <p className="text-white text-sm">
                A Lot of applications run slow caused by oversized 3D assets.
                Let us handle
                <br /> your 3D asset needs. Optimized to boost your performance.
              </p>
            </div>
            <div className="w-full flex  bg-center items-center justify-center">
              <CardContainer className="inter-var w-2xs">
                <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border  ">
                  <CardItem
                    translateZ="100"
                    className="flex items-center justify-center">
                    <Image
                      src="/3D.svg"
                      height={100}
                      width={100}
                      className=" w-full h-1/2 object-cover"
                      alt="3D"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className=" w-full text-2xl font-bold text-white text-center flex items-center justify-center">
                    Character Modeling
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="w-full text-white  text-center text-sm">
                    Create 3D Characters for any use. Be it VR, AR, Simulation
                    or Games
                  </CardItem>
                </CardBody>
              </CardContainer>

              <CardContainer className="inter-var w-sm">
                <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border  ">
                  <CardItem translateZ="100" className=" h-full w-full">
                    <Image
                      priority
                      src="/environtment.svg"
                      height={300}
                      width={300}
                      className=" w-full h-full object-cover flex items-center justify-center"
                      alt="environment"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className=" w-full text-2xl font-bold text-white text-center flex items-center justify-center">
                    Environmental Design
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="w-full text-white  text-center text-sm">
                    Replicate your working areas, offices, interiors in 3D for
                    any use. Be it VR, AR, Simulation or Games
                  </CardItem>
                </CardBody>
              </CardContainer>

              <CardContainer className="inter-var w-sm">
                <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border  ">
                  <CardItem translateZ="100" className=" h-full w-full">
                    <Image
                      src="/machine.svg"
                      height={300}
                      width={300}
                      className=" w-full h-full object-cover flex items-center justify-center"
                      alt="environment"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className=" w-full text-2xl font-bold text-white text-center flex items-center justify-center ">
                    Machine 3D Modeling
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="w-full text-white  text-center text-sm">
                    Replicate your factory equipments in 3D for any use. Be it
                    VR, AR, Simulation or Games
                  </CardItem>
                </CardBody>
              </CardContainer>

              <CardContainer className="inter-var w-sm">
                <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border  ">
                  <CardItem translateZ="100" className=" h-full w-full">
                    <Image
                      src="/animation.svg"
                      height={300}
                      width={300}
                      className=" w-full h-full object-cover flex items-center justify-center"
                      alt="environment"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className=" w-full text-2xl font-bold text-white text-center flex items-center justify-center ">
                    3D Animation
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="w-3/3 text-white  text-center flex items-center justify-center text-sm">
                    On a tight schedule ? Grab what you need from our 3D Asset
                    Library
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
