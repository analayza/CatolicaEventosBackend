import express from "express";
import { findUserController, updateUserController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const route = express.Router();
route.get('/find/:id',authMiddleware, findUserController);
route.patch('/update/:id',authMiddleware, updateUserController);

export default route;