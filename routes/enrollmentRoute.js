import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createEnrollmentController, findActivityParticipatedUserController, findEventsParticipatedUserController} from '../controllers/enrollmentController.js';
import validateAdminType from '../middlewares/validateAdminType.js';

const route = express.Router();

route.post('/:id_activity', authMiddleware, createEnrollmentController);
route.get('/my-events', authMiddleware, findEventsParticipatedUserController);
route.get('/:id_event/my-activitys', authMiddleware, findActivityParticipatedUserController);

export default route;