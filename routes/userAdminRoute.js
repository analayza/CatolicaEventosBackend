import express from "express";
import { findUserAdminController, updateUserAdminController } from "../controllers/userAdminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateAdminType from "../middlewares/validateAdminType.js";

const route = express.Router();
route.get('/find',authMiddleware, validateAdminType, findUserAdminController);
route.patch('/update',authMiddleware,validateAdminType, updateUserAdminController);

export default route;