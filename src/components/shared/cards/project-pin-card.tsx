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

export default function ProjectPinCard({
  title,
  date,
  imageSrc,
  imageAlt = "",
  href,
  className,
  containerClassName,
}: ProjectPinCardProps) {
  return (
    <PinContainer
      title={href ? title : undefined}
      href={href}
      containerClassName={containerClassName}
      className={cn("w-[22rem] max-w-full", className)}>
      <article
        className={cn(
          "w-[22rem] max-w-full rounded-3xl bg-zinc-900 text-white overflow-hidden border border-white/10"
        )}>
        <header className="relative p-6 pb-4">
          {/* Inward rounded corner (cut-out) */}

          <h3 className="text-2xl font-bold leading-tight tracking-tight">
            {title}
          </h3>
          <div className="mt-3 h-px w-full bg-white/10" />
          {date ? <p className="mt-3 text-sm text-white/70">{date}</p> : null}
        </header>

        <div className="relative aspect-[6/3]">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 22rem"
            priority={false}
          />
        </div>
      </article>
    </PinContainer>
  );
}
