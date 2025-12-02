import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email wajib diisi" })
      .trim()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string({ message: "Password wajib diisi" })
      .min(8, "Password minimal 8 karakter")
      .max(128, "Password terlalu panjang"),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
