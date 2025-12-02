"use client";

import React, { JSX, useState } from "react";
import { useTranslation } from "@/lib/i18n";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm(): JSX.Element {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.nameRequired;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
    }
    if (!formData.message.trim()) {
      newErrors.message = t.contact.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error saat user mulai mengetik
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setSubmitStatus("idle");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-white/80">
          {t.contact.name}
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full border-b bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500 disabled:opacity-50 ${
            errors.name ? "border-red-500" : "border-white/20"
          }`}
          placeholder=""
          aria-label={t.contact.name}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className="text-xs text-red-400">{errors.name}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-white/80">
          {t.contact.email}
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full border-b bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500 disabled:opacity-50 ${
            errors.email ? "border-red-500" : "border-white/20"
          }`}
          placeholder=""
          aria-label={t.contact.email}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm text-white/80">
          {t.contact.phoneNumber}
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500 disabled:opacity-50"
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
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full resize-none border-b bg-transparent pb-2 text-white outline-none transition-colors placeholder:text-white/40 focus:border-orange-500 disabled:opacity-50 ${
            errors.message ? "border-red-500" : "border-white/20"
          }`}
          placeholder=""
          aria-label={t.contact.message}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="text-xs text-red-400">{errors.message}</span>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="rounded-lg bg-green-500/20 p-4 text-green-400">
          {t.contact.successMessage}
        </div>
      )}
      {submitStatus === "error" && (
        <div className="rounded-lg bg-red-500/20 p-4 text-red-400">
          {t.contact.errorMessage}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-7 py-4 font-bold uppercase tracking-wide text-white transition-colors hover:from-orange-600 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? t.contact.sending : t.contact.sendMessage}
        </button>
      </div>
    </form>
  );
}
