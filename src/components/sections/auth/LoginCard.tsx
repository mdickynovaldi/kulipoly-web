"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FlipWords } from "@/components/ui/flip-words";
import { TextScramble } from "@/components/ui/text-scramble";
import { cn } from "@/lib/utils";

type LoginCardProps = {
  className?: string;
  onSubmit?: (payload: { username: string; password: string }) => void;
  loading?: boolean;
  titleWords?: string[];
};

export default function LoginCard({
  className,
  onSubmit,
  loading = false,
  titleWords = ["Masuk", "Mulai", "Eksplor"],
}: LoginCardProps) {
  const formId = useId();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disabled = loading || !username || !password;

  const gradientId = useMemo(() => `grad-${formId}`, [formId]);

  return (
    <div className={cn("relative", className)}>
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-emerald-400/10 to-transparent blur-2xl"
      />

      <CardContainer containerClassName="py-0" className="w-full max-w-md">
        <CardBody className="h-auto w-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 shadow-xl">
          <CardItem translateZ={20} className="mb-6 flex flex-col items-center">
            <TextScramble
              as="h1"
              className="text-2xl font-bold tracking-tight"
              duration={1}>
              Selamat Datang
            </TextScramble>
            <div className="mt-1 text-sm text-muted-foreground">
              <FlipWords
                className="text-primary"
                words={titleWords.map((w) => `${w} sekarang`)}
                duration={2200}
              />
            </div>
          </CardItem>

          <form
            id={formId}
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.({ username, password });
            }}>
            <CardItem translateZ={14} className="grid gap-2">
              <label
                htmlFor={`${formId}-username`}
                className="text-sm font-medium">
                Email
              </label>
              <input
                id={`${formId}-username`}
                name="email"
                type="email"
                autoComplete="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm outline-none ring-0 transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                placeholder="nama@domain.com"
                aria-invalid={!username}
                aria-describedby={`${formId}-username-help`}
              />
              <span
                id={`${formId}-username-help`}
                className="text-xs text-muted-foreground">
                Gunakan email yang terdaftar.
              </span>
            </CardItem>

            <CardItem translateZ={14} className="grid gap-2">
              <label
                htmlFor={`${formId}-password`}
                className="text-sm font-medium">
                Password
              </label>
              <input
                id={`${formId}-password`}
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background/80 px-3 text-sm outline-none ring-0 transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                placeholder="••••••••"
                aria-invalid={!password}
              />
            </CardItem>

            <CardItem translateZ={22} className="pt-2">
              <Button
                type="submit"
                disabled={disabled}
                className="w-full h-11 text-base font-semibold">
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </CardItem>
          </form>

          <CardItem translateZ={10} className="pt-1 grid grid-cols-2 gap-3">
            <form action="/auth/sign-in" method="post" className="contents">
              <button
                type="submit"
                name="provider"
                value="google"
                className="h-10 rounded-md border border-input bg-background/80 text-sm font-medium hover:bg-accent/40">
                Masuk dengan Google
              </button>
            </form>
            <form action="/auth/sign-in" method="post" className="contents">
              <button
                type="submit"
                name="provider"
                value="github"
                className="h-10 rounded-md border border-input bg-background/80 text-sm font-medium hover:bg-accent/40">
                Masuk dengan GitHub
              </button>
            </form>
          </CardItem>

          <CardItem translateZ={10} className="mt-6">
            <div className="relative h-10 w-full overflow-hidden rounded-lg">
              <svg
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-hidden>
                <defs>
                  <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(34,211,238)"
                      stopOpacity="0.9"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(16,185,129)"
                      stopOpacity="0.9"
                    />
                  </linearGradient>
                </defs>
                <motion.rect
                  initial={{ x: -200 }}
                  animate={{ x: 200 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  x="-200"
                  y="0"
                  width="400"
                  height="100%"
                  fill={`url(#${gradientId})`}
                  opacity="0.2"
                />
              </svg>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
