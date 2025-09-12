"use client";

import React, { JSX } from "react";

export default function ContactForm(): JSX.Element {
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
  );
}
