import { z } from "zod";

export const countdownSchema = z.object({
  title: z.string().min(3),
  date: z.string().refine((v) => !isNaN(Date.parse(v))),
  message: z.string().max(300).optional(),
});

export type TCountdownFormValues = z.infer<typeof countdownSchema>;
