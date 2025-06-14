import express from 'express';
import {createEventController, findEventByIdController, listAllEventsByAdminController, listAllEventsController, updateEventController} from "../controllers/eventController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';

const route = express.Router();
route.post('/create', authMiddleware, validateAdminType, createEventController);
route.get('/find/:id_event', authMiddleware, findEventByIdController);
route.get('/listAll', listAllEventsController);
route.get('/listAllByAdmin',authMiddleware, validateAdminType, listAllEventsByAdminController);
route.patch('/update/:id_event', authMiddleware, validateAdminType, updateEventController);

export default route;
