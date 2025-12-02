"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/sections/contact/contact-form";
import { useTranslation } from "@/lib/i18n";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98H14v2.05h.08c.7-1.33 2.42-2.73 4.98-2.73 5.33 0 6.32 3.5 6.32 8.05V24h-5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.33 0-2.69 1.82-2.69 3.7V24h-5V8.98z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.26 2.36.43.6.23 1.03.51 1.48.96.45.45.73.88.96 1.48.17.46.37 1.16.43 2.36.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 1.9-.43 2.36-.23.6-.51 1.03-.96 1.48-.45.45-.88.73-1.48.96-.46.17-1.16.37-2.36.43-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.9-.26-2.36-.43-.6-.23-1.03-.51-1.48-.96-.45-.45-.73-.88-.96-1.48-.17-.46-.37-1.16-.43-2.36C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-1.9.43-2.36.23-.6.51-1.03.96-1.48.45-.45.88-.73 1.48-.96.46-.17 1.16-.37 2.36-.43C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.74 0 8.33 0 7.02.07 5.7.14 4.8.36 4.05.64c-.74.29-1.38.68-2.02 1.32C1.39 2.6 1 3.26.71 4c-.28.74-.5 1.64-.57 2.96C.07 8.28 0 8.7 0 12s.07 3.72.14 5.04c.07 1.32.29 2.22.57 2.96.29.74.68 1.4 1.32 2.04.64.64 1.28 1.03 2.02 1.32.74.28 1.64.5 2.96.57C8.28 23.93 8.7 24 12 24s3.72-.07 5.04-.14c1.32-.07 2.22-.29 2.96-.57.74-.29 1.4-.68 2.04-1.32.64-.64 1.03-1.28 1.32-2.02.28-.74.5-1.64.57-2.96.07-1.32.14-1.74.14-5.04s-.07-3.72-.14-5.04c-.07-1.32-.29-2.22-.57-2.96-.29-.74-.68-1.4-1.32-2.04C21.4 1.32 20.74.93 20 .64c-.74-.28-1.64-.5-2.96-.57C15.72.07 15.3 0 12 0z" />
        <circle cx="18.5" cy="5.5" r="1.5" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 2.079 1.189 2.618 2.553 2.618 1.072 0 1.762-.441 2.019-1.126h3.184zM15.97 11.793h4.918c-.052-1.382-.802-2.218-2.295-2.218-1.326 0-2.225.645-2.623 2.218zm-8.73 5.207c1.725 0 2.76-.832 2.76-2.298 0-1.466-1.035-2.298-2.76-2.298H3v4.596h4.24zM3 7h3.885c1.525 0 2.615-.693 2.615-2.133 0-1.44-1.09-2.134-2.615-2.134H3V7zm4.27.867C8.795 7.867 9.5 8.463 9.5 9.5c0 1.037-.705 1.633-2.23 1.633H3V7.867h4.27zM3 2h4.27C9.635 2 11.5 2.693 11.5 4.867c0 1.174-.595 2.042-1.705 2.5 1.315.458 2.035 1.53 2.035 2.833 0 2.27-1.905 3.8-4.56 3.8H0V2h3z" />
      </svg>
    ),
  },
];

export default function ContactContent() {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: t.contactPage.emailUs,
      description: t.contactPage.emailDescription,
      value: "contact@kulipoly.com",
      href: "mailto:contact@kulipoly.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: t.contactPage.callUs,
      description: t.contactPage.callDescription,
      value: "+62 851-5626-2400",
      href: "tel:+6285156262400",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: t.contactPage.visitUs,
      description: t.contactPage.visitDescription,
      value:
        "Perumahan Banjararum Asri, Jl. Selandia Baru Blok BB-2, Singosari, Kab. Malang 65153, Jawa Timur",
      href: "https://maps.app.goo.gl/sqB6XX7s9M784qfK8",
    },
  ];

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
        <div className="absolute top-1/3 right-0 opacity-20 pointer-events-none">
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
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
              {t.contactPage.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{t.contactPage.title} </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {t.contactPage.titleHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              {t.contactPage.description}
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactMethods.map((method) => (
              <Link
                key={method.title}
                href={method.href}
                className="group relative p-8 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center text-orange-400 group-hover:from-orange-500/30 group-hover:to-red-600/30 transition-all duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="text-zinc-300 font-medium">{method.value}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Left - Form */}
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {t.contactPage.sendMessage}{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      {t.contactPage.messageHighlight}
                    </span>
                  </h2>
                  <p className="text-zinc-400">
                    {t.contactPage.formDescription}
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Right - Info & Map placeholder */}
            <div className="order-1 lg:order-2 flex flex-col gap-8">
              {/* Company Info Card */}
              <div className="rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 p-8 md:p-10">
                <div className="flex items-center gap-5 mb-8">
                  <Image
                    src="/logo.png"
                    alt="Kulipoly logo"
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Kulipoly</h3>
                    <p className="text-orange-400 text-sm font-medium">
                      {t.contactPage.performanceDriven}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      {t.contact.address}
                    </h4>
                    <p className="text-zinc-300">
                      Perumahan Banjararum Asri, Jl. Selandia Baru Blok BB-2,
                      Singosari, Kab. Malang 65153, Jawa Timur
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      {t.contactPage.businessHours}
                    </h4>
                    <p className="text-zinc-300">
                      {t.contactPage.weekdays}
                      <br />
                      {t.contactPage.weekends}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                      {t.contactPage.connectWithUs}
                    </h4>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          aria-label={social.name}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-orange-500/25">
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {t.contactPage.quickResponse}
                    </h4>
                    <p className="text-zinc-400 text-sm">
                      {t.contactPage.quickResponseDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                {t.contactPage.commonQuestions}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.contactPage.frequentlyAsked}{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {t.contactPage.frequentlyAskedHighlight}
                </span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                {t.contactPage.faqDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:border-orange-500/20 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold">
                      ?
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

            <div className="relative z-10 py-16 px-8 md:py-20 md:px-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {t.contactPage.readyToStart}{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {t.contactPage.startYourProject}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
                {t.contactPage.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                  {t.contactPage.viewPortfolio}
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
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-zinc-800/80 rounded-xl border border-zinc-700 hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-300">
                  {t.contactPage.exploreServices}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
