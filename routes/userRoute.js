import express from "express";
import { findUserController } from "../controllers/userController.js";

const route = express.Router();
route.get('/findUser/:id', findUserController);

export default route;