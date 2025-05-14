import { z } from "zod";

export const countdownSchema = z.object({
  title: z.string().min(3),
  date: z.string().refine((v) => !isNaN(Date.parse(v))),
  message: z.string().max(300).optional(),
  youtubeMusic: z
    .union([z.string().url(), z.literal(""), z.undefined()])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photos: z.array(z.string().url()).max(3),
});

export type TCountdownFormValues = z.infer<typeof countdownSchema>;
