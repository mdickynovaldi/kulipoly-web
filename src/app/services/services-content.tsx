"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function ServicesContent() {
  const { t } = useTranslation();

  const services = [
    {
      id: "character-modeling",
      icon: "/3D.svg",
      ...t.servicesData.characterModeling,
    },
    {
      id: "environmental-design",
      icon: "/environtment.svg",
      ...t.servicesData.environmentalDesign,
    },
    {
      id: "machine-modeling",
      icon: "/machine.svg",
      ...t.servicesData.machineModeling,
    },
    {
      id: "3d-animation",
      icon: "/animation.svg",
      ...t.servicesData.animation,
    },
  ];

  const processSteps = [
    { step: "01", ...t.processSteps.discovery },
    { step: "02", ...t.processSteps.concept },
    { step: "03", ...t.processSteps.production },
    { step: "04", ...t.processSteps.delivery },
  ];

  const benefits = [
    t.servicesPage.benefit1,
    t.servicesPage.benefit2,
    t.servicesPage.benefit3,
    t.servicesPage.benefit4,
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 opacity-30 pointer-events-none">
          <Image
            src="/ornamen.svg"
            alt=""
            width={400}
            height={400}
            aria-hidden
          />
        </div>
        <div className="absolute top-1/4 right-0 opacity-20 pointer-events-none">
          <Image
            src="/ornamen2.svg"
            alt=""
            width={300}
            height={300}
            aria-hidden
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
              {t.servicesPage.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{t.servicesPage.titlePrefix}</span>
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {t.servicesPage.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              {t.servicesPage.description}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}>
                {/* Card gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 md:p-10">
                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-red-600/30 transition-all duration-300">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-orange-400/80 font-medium">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                      {t.servicesPage.keyFeatures}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-zinc-300">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div className="flex flex-wrap gap-2">
                    {service.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-800/50 rounded-full border border-zinc-700/50">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                {t.servicesPage.howWeWork}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.servicesPage.titlePrefix}{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {t.servicesPage.ourProcess}
                </span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                {t.servicesPage.processDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((item, index) => (
                <div
                  key={item.step}
                  className="relative group"
                  style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-zinc-700 to-transparent z-0" />
                  )}

                  <div className="relative z-10 p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-all duration-300">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                  {t.servicesPage.whyChooseUs}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t.servicesPage.performanceFirst}{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    {t.servicesPage.performanceFirstSuffix}
                  </span>{" "}
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  {t.servicesPage.performanceDescription}
                </p>

                <ul className="space-y-4">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-zinc-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                      6710+
                    </div>
                    <div className="text-zinc-400">{t.servicesPage.assetsCreated}</div>
                  </div>
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                      25+
                    </div>
                    <div className="text-zinc-400">{t.servicesPage.projectsCompleted}</div>
                  </div>
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                      80%
                    </div>
                    <div className="text-zinc-400">{t.servicesPage.sizeOptimization}</div>
                  </div>
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                      100%
                    </div>
                    <div className="text-zinc-400">{t.servicesPage.clientSatisfaction}</div>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

            <div className="relative z-10 py-16 px-8 md:py-20 md:px-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {t.servicesPage.readyToGetStarted}{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {t.servicesPage.getStarted}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
                {t.servicesPage.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                  {t.servicesPage.getFreeConsultation}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-zinc-800/80 rounded-xl border border-zinc-700 hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-300">
                  {t.servicesPage.viewOurWork}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

