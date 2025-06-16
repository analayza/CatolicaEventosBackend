import express from 'express';
import {createActivityController} from '../controllers/activityController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';


const route = express.Router();
route.post('/create', authMiddleware, validateAdminType, createActivityController);


export default route;