import express from 'express';
import { forgotPasswordController, resetPasswordController } from "../controllers/recoveryController.js";
import {recoveryTokenMiddleware} from "../middlewares/validateRecoveryToken.js";

const route = express.Router();

route.post("/forgot-password", forgotPasswordController);
route.put("/reset-password", recoveryTokenMiddleware , resetPasswordController);

export default route;
