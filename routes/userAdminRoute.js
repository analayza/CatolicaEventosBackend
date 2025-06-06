import express from "express";
import { findUserAdminController, updateUserAdminController } from "../controllers/userAdminController.js";

const route = express.Router();
route.get('/find/:id', findUserAdminController);
route.patch('/update/:id', updateUserAdminController);

export default route;