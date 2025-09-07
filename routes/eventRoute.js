import express from 'express';
import { activationEventController, createEventController, deleteEventController, disableEventController, findEventByIdController, findSponsoresOfOneEventController, listAllEventsByAdminController, listAllEventsController, updateEventController } from "../controllers/eventController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';
import { uploadImages } from '../middlewares/multerMiddleware.js';
import { findAllActivityActiveOfEventController, findAllActivityOfEventController } from '../controllers/activityController.js';

const route = express.Router();
route.post('/create', authMiddleware, validateAdminType,
    uploadImages.fields([{ name: 'image', maxCount: 1 }, { name: 'certificate_background', maxCount: 1 }]), createEventController);
route.get('/find/:id_event', findEventByIdController);
route.get('/listAll', listAllEventsController);
route.get('/listAllByAdmin', authMiddleware, validateAdminType, listAllEventsByAdminController);
route.patch('/update/:id_event', authMiddleware, validateAdminType, 
    uploadImages.fields([{ name: 'image', maxCount: 1 }, { name: 'certificate_background', maxCount: 1 }]), updateEventController);
route.patch('/disable/:id_event', authMiddleware, validateAdminType, disableEventController);
route.patch('/activation/:id_event', authMiddleware, validateAdminType, activationEventController);
route.delete('/delete/:id_event', authMiddleware, validateAdminType, deleteEventController);
route.get('/sponsors/:id_event', findSponsoresOfOneEventController);
route.get('/:id_event/activities', authMiddleware, validateAdminType, findAllActivityOfEventController);
route.get('/:id_event/activities/active', findAllActivityActiveOfEventController);

export default route;
