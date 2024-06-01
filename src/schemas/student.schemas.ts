import { z } from "zod";

export const studentSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100).min(3),
  email: z.string().max(254).email(),
  cpf: z.string().max(11).min(11),
});

export const studentCreateSchema = studentSchema.omit({ id: true });
export const studentUpdateSchema = studentCreateSchema.partial();
