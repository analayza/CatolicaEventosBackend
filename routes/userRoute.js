import express from "express";
import { findUserController, updateUserController } from "../controllers/userController.js";

const route = express.Router();
route.get('/find/:id', findUserController);
route.patch('/update/:id', updateUserController);

export default route;