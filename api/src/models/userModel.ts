import { z } from "zod";

export const UserModelSchema = z.object({
	id: z.string().ulid().optional(),
	name: z.string().min(1, "O nome é obrigatório."),
	email: z.string().email("Email inválido."),
	createdAt: z.string().optional().default(new Date().toISOString()),
});

export type UserModel = z.infer<typeof UserModelSchema>;

