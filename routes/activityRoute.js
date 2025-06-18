import express from 'express';
import {createActivityController, deleteActivityController, disableActivityController, findActivityByIdController, updateActivityController} from '../controllers/activityController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';


const route = express.Router();
route.post('/create/:id_event', authMiddleware, validateAdminType, createActivityController);
route.get('/find/:id_activity',findActivityByIdController);
route.delete('/delete/:id_activity', authMiddleware, validateAdminType, deleteActivityController);
route.patch('/disable/:id_activity', authMiddleware, validateAdminType, disableActivityController);
route.patch('/update/:id_activity', authMiddleware, validateAdminType, updateActivityController);

export default route;