import { Router } from "express";
import { UserService } from "../services/userService.js";
import UserController from "../controllers/UserController.js";

const route = Router();
const userService = new UserService();
const userController = new UserController(userService);


//users
route.get("/users", (req, res) => userController.getAllUsers(req, res));
route.post("/users/register", (req, res) => userController.registerUser(req, res),);
route.put("/users/:id", (req, res) => userController.updateUser(req, res));
route.delete("/users/:id", (req, res) => userController.deleteUser(req, res));
export default route;
