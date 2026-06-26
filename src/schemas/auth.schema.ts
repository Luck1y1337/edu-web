import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Kamida 8 ta belgi bo'lishi kerak")
      .regex(/[A-Z]/, "Kamida 1 ta katta harf bo'lishi kerak")
      .regex(/\d/, "Kamida 1 ta raqam bo'lishi kerak"),
    confirmPassword: z.string().min(1, "Parolni tasdiqlash shart"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Joriy parol kiritilishi shart"),
    newPassword: z
      .string()
      .min(8, "Parol kamida 8ta belgi bo'lishi kerak")
      .regex(/[A-Z]/, "Kamida 1 ta katta harf bo'lishi kerak")
      .regex(/\d/, "Kamida 1 ta raqam bo'lishi kerak"),
    confirmPassword: z.string().min(1, "Parolni tasdiqlash shart"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Yangi parollar mos kelmadi",
    path: ["confirmPassword"],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
