import express from 'express';
import {activationActivityController, createActivityController, deleteActivityController, disableActivityController, findActivityByIdController, findAllActivityActiveOfEventController, updateActivityController} from '../controllers/activityController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';
import { findAllUsersEnrollmentActivityController } from '../controllers/activityController.js';


const route = express.Router();
route.post('/create/:id_event', authMiddleware, validateAdminType, createActivityController);
route.get('/find/:id_activity',findActivityByIdController);
route.delete('/delete/:id_activity', authMiddleware, validateAdminType, deleteActivityController);
route.patch('/disable/:id_activity', authMiddleware, validateAdminType, disableActivityController);
route.patch('/activation/:id_activity', authMiddleware, validateAdminType, activationActivityController);
route.patch('/update/:id_activity', authMiddleware, validateAdminType, updateActivityController);
route.get('/:id_activity/users', authMiddleware, validateAdminType, findAllUsersEnrollmentActivityController);

export default route;