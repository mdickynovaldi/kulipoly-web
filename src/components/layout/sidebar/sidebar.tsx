import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import type { ComponentType } from "react";

export default function Sidebar() {
  return (
    <aside
      aria-label="Social sidebar"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="flex  w-12 flex-col items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md shadow-lg shadow-black/5">
        <SocialLink
          href="https://www.linkedin.com/"
          label="Buka profil LinkedIn"
          Icon={Linkedin}
        />
        <SocialLink
          href="https://twitter.com/"
          label="Buka profil X/Twitter"
          Icon={Twitter}
        />
        <SocialLink
          href="https://www.instagram.com/"
          label="Buka profil Instagram"
          Icon={Instagram}
        />
      </div>
    </aside>
  );
}

type IconType = ComponentType<{ className?: string }>;

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: IconType;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-12 w-12 place-items-center rounded-full bg-white text-gray-800 shadow-md transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus:outline-none">
      <Icon className="h-3 w-3" />
    </Link>
  );
}
