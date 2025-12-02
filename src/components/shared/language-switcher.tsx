"use client";

import { useLanguage } from "@/lib/i18n";

type LanguageSwitcherProps = {
  className?: string;
  useWhiteColor?: boolean;
};

export default function LanguageSwitcher({
  className = "",
  useWhiteColor = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 ${
        useWhiteColor
          ? "border-white/30 hover:border-white/50 hover:bg-white/10"
          : "border-black/20 hover:border-black/40 hover:bg-black/5"
      } ${className}`}
      aria-label={`Switch language to ${
        language === "id" ? "English" : "Indonesian"
      }`}>
      {/* Globe Icon */}
      <svg
        className={`w-4 h-4 ${useWhiteColor ? "text-white" : "text-black"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>

      {/* Current Language */}
      <span
        className={`text-sm font-semibold uppercase ${
          useWhiteColor ? "text-white" : "text-black"
        }`}>
        {language.toUpperCase()}
      </span>

      {/* Toggle Indicator */}
      <div
        className={`w-8 h-4 rounded-full relative ${
          useWhiteColor ? "bg-white/20" : "bg-black/10"
        }`}>
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${
            language === "id" ? "left-0.5" : "left-4"
          } ${
            useWhiteColor
              ? "bg-white"
              : "bg-gradient-to-r from-orange-500 to-red-600"
          }`}
        />
      </div>
    </button>
  );
}
