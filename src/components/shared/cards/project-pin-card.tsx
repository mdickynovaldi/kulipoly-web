"use client";

import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";
import React from "react";

type ProjectPinCardProps = {
  title: string;
  date?: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  accentColor?: string; // tailwind color token like 'bg-red-500'
  cutoutSize?: number; // px size for inward rounded corner
  cutoutBgClass?: string; // background class behind card (usually page bg)
};

const PLACEHOLDER_IMAGE = "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png";

export default function ProjectPinCard({
  title,
  date,
  imageSrc,
  imageAlt = "",
  href,
  className,
  containerClassName,
}: ProjectPinCardProps) {
  const imageSource = imageSrc || PLACEHOLDER_IMAGE;

  return (
    <PinContainer
      title={href ? title : undefined}
      href={href}
      containerClassName={containerClassName}
      className={cn("", className)}>
      <article
        className={cn(
          "w-[280px] sm:w-[300px] lg:w-[320px] rounded-2xl bg-zinc-900 text-white overflow-hidden border border-white/10 flex flex-col"
        )}>
        {/* Gambar/Thumbnail di atas */}
        <div className="w-full relative aspect-[16/10] bg-zinc-800">
          <Image
            src={imageSource}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 320px"
            priority={false}
          />
        </div>

        {/* Konten/Title di bawah */}
        <header className="p-4 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold leading-tight tracking-tight line-clamp-2">
            {title}
          </h3>
          <div className="mt-3 h-px w-full bg-white/10" />
          {date ? <p className="mt-3 text-xs text-white/60">{date}</p> : null}
        </header>
      </article>
    </PinContainer>
  );
}
