"use client";

import React, { JSX } from "react";
import { useTranslation } from "@/lib/i18n";

export default function ContactForm(): JSX.Element {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <form
      className="mt-8 flex flex-col gap-8"
      action="#"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-white/80">
          {t.contact.name}
        </label>
        <input
          id="name"
          type="text"
          className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
          placeholder=""
          aria-label={t.contact.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-white/80">
          {t.contact.email}
        </label>
        <input
          id="email"
          type="email"
          className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
          placeholder=""
          aria-label={t.contact.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm text-white/80">
          {t.contact.phoneNumber}
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
          placeholder=""
          aria-label={t.contact.phoneNumber}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-white/80">
          {t.contact.message}
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full resize-none border-b border-white/20 bg-transparent pb-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500"
          placeholder=""
          aria-label={t.contact.message}
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-7 py-4 font-bold uppercase tracking-wide text-white transition-colors hover:from-orange-600 hover:to-red-700">
          {t.contact.sendMessage}
        </button>
      </div>
    </form>
  );
}
