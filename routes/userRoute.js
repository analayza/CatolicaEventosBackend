import express from "express";
import { findUserController, updateUserController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadImages } from "../middlewares/multerMiddleware.js";

const route = express.Router();
route.get('/find',authMiddleware, findUserController);
route.patch('/update',authMiddleware, uploadImages.single('profile_picture'), updateUserController);

export default route;