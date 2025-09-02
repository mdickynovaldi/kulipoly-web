"use client";
import dynamic from "next/dynamic";
import React from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0" aria-hidden>
      <div className="w-full h-full bg-transparent" />
    </div>
  ),
});

type SplineViewerProps = {
  scene: string;
  className?: string;
};

export default function SplineViewer({ scene, className }: SplineViewerProps) {
  return (
    <div className={className} style={{ touchAction: "none" }}>
      <Spline scene={scene} />
    </div>
  );
}
