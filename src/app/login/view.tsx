"use client";

import { useState } from "react";
import LoginCard from "@/components/sections/auth/LoginCard";
import { loginSchema } from "@/lib/validation/auth";

export default function LoginCardClient() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400/25 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/3 left-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/3 right-1/4 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-gradient-to-tl from-sky-500/20 to-transparent blur-2xl" />
      </div>

      <LoginCard
        titleWords={["Masuk", "Mulai", "Eksplor"]}
        className="mx-auto"
        loading={loading}
        onSubmit={async ({ username, password }) => {
          const parsed = loginSchema.safeParse({ email: username, password });
          if (!parsed.success) {
            const issues = parsed.error.format();
            const message =
              (issues.email?._errors?.[0] || issues.password?._errors?.[0]) ??
              "Input tidak valid";
            alert(message);
            return;
          }

          setLoading(true);
          try {
            const res = await fetch("/auth/sign-in", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsed.data),
            });
            if (res.ok) {
              window.location.assign("/dashboard");
            } else {
              const data = await res
                .json()
                .catch(() => ({} as { error: string }));
              alert(data?.error ?? "Gagal masuk");
            }
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
}
