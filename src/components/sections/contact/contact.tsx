import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-black">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Intro, logo, address, contact info */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-center text-sm text-gray-200 lg:text-left">
              Not sure where to start ? We offer a{" "}
              <span className="font-semibold text-white">free</span>{" "}
              consultation to discuss your 3D production needs
            </p>
            <div className="mt-10 flex flex-col items-center lg:items-start">
              <Image
                src="/logo.png"
                alt="Kulipoly logo"
                width={220}
                height={220}
                priority={false}
              />
              <h2 className="mt-6 text-2xl font-bold text-white">Address</h2>
              <p className="mt-2 text-sm text-white">
                Jl. Singosari XXX Kecamatan Lowokwaru Kota Malang Jawa Timur
              </p>
            </div>
            <div className="mt-12 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-base font-semibold text-white">Email</p>
                <p className="mt-2 text-sm text-gray-300">kulipoli@kp.global</p>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Phone</p>
                <p className="mt-2 text-sm text-gray-300">+62 82215079351</p>
                <p className="text-sm text-gray-300">+62 82115079999</p>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Follow us</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:text-white">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98H14v2.05h.08c.7-1.33 2.42-2.73 4.98-2.73 5.33 0 6.32 3.5 6.32 8.05V24h-5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.33 0-2.69 1.82-2.69 3.7V24h-5V8.98z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:text-white">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M17.21 3H20l-6.99 8.02L21.5 21h-7.3l-5.23-6.28L2.5 21H0l7.74-8.88L.5 3h7.3l4.77 5.73L17.21 3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:text-white">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.26 2.36.43.6.23 1.03.51 1.48.96.45.45.73.88.96 1.48.17.46.37 1.16.43 2.36.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 1.9-.43 2.36-.23.6-.51 1.03-.96 1.48-.45.45-.88.73-1.48.96-.46.17-1.16.37-2.36.43-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.9-.26-2.36-.43-.6-.23-1.03-.51-1.48-.96-.45-.45-.73-.88-.96-1.48-.17-.46-.37-1.16-.43-2.36C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-1.9.43-2.36.23-.6.51-1.03.96-1.48.45-.45.88-.73 1.48-.96.46-.17 1.16-.37 2.36-.43C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.74 0 8.33 0 7.02.07 5.7.14 4.8.36 4.05.64c-.74.29-1.38.68-2.02 1.32C1.39 2.6 1 3.26.71 4c-.28.74-.5 1.64-.57 2.96C.07 8.28 0 8.7 0 12s.07 3.72.14 5.04c.07 1.32.29 2.22.57 2.96.29.74.68 1.4 1.32 2.04.64.64 1.28 1.03 2.02 1.32.74.28 1.64.5 2.96.57C8.28 23.93 8.7 24 12 24s3.72-.07 5.04-.14c1.32-.07 2.22-.29 2.96-.57.74-.29 1.4-.68 2.04-1.32.64-.64 1.03-1.28 1.32-2.02.28-.74.5-1.64.57-2.96.07-1.32.14-1.74.14-5.04s-.07-3.72-.14-5.04c-.07-1.32-.29-2.22-.57-2.96-.29-.74-.68-1.4-1.32-2.04C21.4 1.32 20.74.93 20 .64c-.74-.28-1.64-.5-2.96-.57C15.72.07 15.3 0 12 0z" />
                      <circle cx="18.5" cy="5.5" r="1.5" />
                      <circle cx="12" cy="12" r="3.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact form card */}
          <div className="lg:pl-4">
            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] md:p-10">
              <h3 className="text-2xl font-extrabold tracking-wide text-white">
                GET IN TOUCH
              </h3>
              <form className="mt-8 flex flex-col gap-8" action="#">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-white/80">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
                    placeholder=""
                    aria-label="Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-white/80">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
                    placeholder=""
                    aria-label="Email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm text-white/80">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
                    placeholder=""
                    aria-label="Phone Number"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-white/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full resize-none border-b border-white/20 bg-transparent pb-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
                    placeholder=""
                    aria-label="Message"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-7 py-4 font-bold uppercase tracking-wide text-white transition-colors hover:from-orange-600 hover:to-red-700">
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
