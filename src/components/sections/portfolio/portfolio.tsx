import ProjectPinCard from "@/components/shared/cards/project-pin-card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  return (
    <section className="w-full h-screen bg-black">
      <div className="bg-black">
        <div className="      flex flex-col gap-10 w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="text-center mt-50">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                OUR PORTFOLIO
              </h1>
              <p className="text-white text-sm">
                A Lot of applications run slow caused by oversized 3D assets.
                Let us handle
                <br /> your 3D asset needs. Optimized to boost your performance.
              </p>
            </div>
            <div className="w-full px-4 md:px-8 lg:px-20 overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 min-w-max">
                <ProjectPinCard
                  title="AR Character Experience"
                  date="september 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="AR character illustration"
                  containerClassName="mt-10"
                  accentColor="bg-blue-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
                <ProjectPinCard
                  title="3D Environment Design"
                  date="october 2023"
                  href="#"
                  imageSrc="/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                  imageAlt="3D environment illustration"
                  containerClassName="mt-10"
                  accentColor="bg-green-600"
                />
              </div>
            </div>
            <div className="my-20 w-full flex justify-center">
              <Button className="bg-orange-600 text-white font-bold">
                SEE ALL PORTFOLIOS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
