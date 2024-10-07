import type { Request, Response } from "express";
import {UserModelSchema } from "../models/userModel.js";
import type { UserService } from "../services/userService.js";

class UserController {
	constructor(private readonly userService: UserService) {}

	async getAllUsers(req: Request, res: Response) {
		try {
			const users = await this.userService.getAllUsers();

			res.json(users);
		} catch (error) {
			console.error("Erro ao buscar usuários:", error);

			res.status(500).send("Erro ao buscar usuários.");
		}
	}

	async registerUser(req: Request, res: Response) {
		try {
			const userData = UserModelSchema.parse(req.body);

			await this.userService.registerUser(userData);

			res.status(201).send("Usuário registrado com sucesso.");
		} catch (err) {
			console.error("Erro ao registrar usuário:", err);

			res.status(500).json({ message: "Erro ao registrar usuário.", error: err });
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const updateData = UserModelSchema.parse(req.body);

			await this.userService.updateUser(id, updateData);

			res.send("Usuário atualizado com sucesso.");
		} catch (err) {
			console.error("Erro ao atualizar usuário:", err);

			res.status(500).json({ message: "Erro ao atualizar usuário.", error: err });
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;

			await this.userService.deleteUser(id);

			res.send("Usuário deletado com sucesso.");
		} catch (err) {
			console.error("Erro ao deletar usuário:", err);

			res.status(500).json({ message: "Erro ao deletar usuário.", error: err });
		}
	}

}

export default UserController;
