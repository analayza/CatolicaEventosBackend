import express from 'express';
import {createEventController, deleteEventController, disableEventController, findEventByIdController, findSponsoresOfOneEventController, listAllEventsByAdminController, listAllEventsController, updateEventController} from "../controllers/eventController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';

const route = express.Router();
route.post('/create', authMiddleware, validateAdminType, createEventController);
route.get('/find/:id_event', findEventByIdController);
route.get('/listAll', listAllEventsController);
route.get('/listAllByAdmin',authMiddleware, validateAdminType, listAllEventsByAdminController);
route.patch('/update/:id_event', authMiddleware, validateAdminType, updateEventController);
route.patch('/disable/:id_event', authMiddleware, validateAdminType, disableEventController);
route.delete('/delete/:id_event', authMiddleware, validateAdminType, deleteEventController);
route.get('/sponsors/:id_event', findSponsoresOfOneEventController);

export default route;
