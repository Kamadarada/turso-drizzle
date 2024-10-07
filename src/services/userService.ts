import { ulid } from "ulid";
import { db } from "../database/database.js";
import type { UserModel } from "../models/userModel.js";
import { usersTable } from "../database/schemas.js";
import { eq } from "drizzle-orm";

export class UserService {
	async getAllUsers() {
		const result = await db.select().from(usersTable).all();
		return result;
	}

	async registerUser(userData: UserModel): Promise<void> {
		const user = {
			...userData,
			id: userData.id ?? ulid(),
		};

		await db.insert(usersTable).values(user);
	}

	async updateUser(id: string, updateData: Partial<UserModel>): Promise<void> {
		await db.update(usersTable).set(updateData).where(eq(usersTable.id, id));
	}

	async deleteUser(id: string): Promise<void> {
		if (!id || typeof id !== "string") {
			return 
		}
		
		await db.delete(usersTable).where(eq(usersTable.id, id));
	}
}
