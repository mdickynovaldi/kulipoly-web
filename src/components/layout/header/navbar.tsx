"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const target = document.getElementById("hero");
    if (!target) return;

    const observer = new IntersectionObserver(
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

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full h-20 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg shadow-black/5 py-1 px-4 flex items-center ${
        !isHeroInView ? "text-white" : ""
      }`}>
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className={!isHeroInView ? "brightness-0 invert" : ""}
          />
        </Link>
        <div className="flex items-center gap-28 pr-40">
          <Link
            className={`font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/services")
                ? "bg-[#E5391A] text-white"
                : "hover:bg-[#E5391A] hover:text-white"
            }`}
            href="/services">
            Services
          </Link>
          <Link
            className={`font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/about")
                ? "bg-[#E5391A] text-white"
                : "hover:bg-[#E5391A] hover:text-white"
            }`}
            href="/about">
            Products
          </Link>
          <Link
            className={`font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/contact")
                ? "bg-[#E5391A] text-white"
                : "hover:bg-[#E5391A] hover:text-white"
            }`}
            href="/contact">
            Contact
          </Link>
          <Link
            className={`font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/blog")
                ? "bg-[#E5391A] text-white"
                : "hover:bg-[#E5391A] hover:text-white"
            }`}
            href="/blog">
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
