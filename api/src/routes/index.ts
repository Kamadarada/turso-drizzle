import { Router } from "express";
import { UserService } from "../services/userService.js";
import UserController from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const route = Router();
const userService = new UserService();
const userController = new UserController(userService);

route.get("/users", (req, res) => userController.getAllUsers(req, res));

route.post("/users/register", (req, res) =>
	userController.registerUser(req, res),
);

route.put("/users/:id", requireAuth, (req, res) =>
	userController.updateUser(req, res),
);
route.delete("/users/:id", requireAuth, (req, res) =>
	userController.deleteUser(req, res),
);

export default route;
