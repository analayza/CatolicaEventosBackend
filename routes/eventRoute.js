import express from 'express';
import {createEventController, findEventByIdController} from "../controllers/eventController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';

const route = express.Router();
route.post('/create', authMiddleware, validateAdminType, createEventController);
route.get('/findAdmin/:id_event', authMiddleware, validateAdminType, findEventByIdController);

export default route;
