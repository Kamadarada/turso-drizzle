import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	createdAt: text("createdAt").default("CURRENT_TIMESTAMP"),
});

