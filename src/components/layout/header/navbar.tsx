"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import LanguageSwitcher from "@/components/shared/language-switcher";

export default function Navbar() {
  const pathname = usePathname();
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();

  // Cek apakah di halaman home
  const isHomePage = pathname === "/";

  // Sembunyikan Navbar di halaman dashboard dan login
  const isDashboard =
    pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  // Tutup mobile menu saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Cleanup observer lama
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Jika bukan home page, tidak perlu observe
    if (!isHomePage) {
      setIsHeroInView(false); // Force white color untuk halaman lain
      return;
    }

    // Reset state saat masuk home page
    setIsHeroInView(true);

    let retryTimeout: NodeJS.Timeout | null = null;
    let isCleanedUp = false;

    // Fungsi untuk setup observer dengan retry
    const setupObserver = () => {
      if (isCleanedUp) return;

      const target = document.getElementById("hero");
      if (!target) {
        // Retry setelah DOM ready (max 10 attempts)
        retryTimeout = setTimeout(setupObserver, 100);
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === target) {
              setIsHeroInView(entry.isIntersecting);
            }
          }
        },
        {
          root: null,
          threshold: 0.1,
        }
      );

      observerRef.current.observe(target);
    };

    // Jalankan setup dengan sedikit delay untuk memastikan DOM ready
    const initialTimeout = setTimeout(setupObserver, 50);

    return () => {
      isCleanedUp = true;
      clearTimeout(initialTimeout);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [pathname, isHomePage]);

  const isActive = (href: string) => {
    return pathname === href;
  };

  // Jangan render Navbar di dashboard
  if (isDashboard) {
    return null;
  }

  // Tentukan apakah harus menggunakan warna putih
  // - Di home page: putih saat hero tidak terlihat (scroll ke services)
  // - Di halaman lain: selalu putih
  const useWhiteColor = !isHomePage || !isHeroInView;

  // Durasi transisi yang sama untuk semua elemen
  const transitionClass = "transition-all duration-500 ease-in-out";

  const navLinks = [
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
    { href: "/blog", label: t.nav.blog },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 sm:h-20 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg shadow-black/5 py-1 px-4 sm:px-6 flex items-center ${transitionClass} ${
          useWhiteColor ? "text-white" : "text-black"
        }`}>
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className={`w-16 sm:w-20 md:w-24 ${transitionClass} ${
                useWhiteColor ? "brightness-0 invert" : "brightness-100"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`font-bold text-sm lg:text-base px-3 lg:px-4 py-2 rounded-lg ${transitionClass} ${
                  isActive(link.href)
                    ? "bg-[#E5391A] text-white"
                    : `hover:bg-[#E5391A] hover:text-white ${
                        useWhiteColor ? "text-white" : "text-black"
                      }`
                }`}
                href={link.href}>
                {link.label}
              </Link>
            ))}
            
            {/* Language Switcher - Desktop */}
            <LanguageSwitcher useWhiteColor={useWhiteColor} />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileMenuOpen}>
            <svg
              className={`w-6 h-6 ${transitionClass} ${
                useWhiteColor ? "text-white" : "text-black"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-xl transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`font-bold text-lg px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(link.href)
                  ? "bg-[#E5391A] text-white"
                  : "text-white hover:bg-white/10"
              }`}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          
          {/* Language Switcher - Mobile */}
          <div className="pt-4 border-t border-white/10 mt-2">
            <LanguageSwitcher useWhiteColor={true} />
          </div>
        </div>
      </div>
    </>
  );
}
