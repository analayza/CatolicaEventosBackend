import express from 'express';
import {createEventController} from "../controllers/eventController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';

const route = express.Router();
route.post('/create/:id_admin', authMiddleware, validateAdminType, createEventController);

export default route;
