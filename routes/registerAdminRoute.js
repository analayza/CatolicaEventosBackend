import express from 'express';
import registerAdminController from '../controllers/registerAdminController.js';
import validateAdminType from '../middlewares/validateAdminType.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const route = express.Router();
route.post('/register/admin', authMiddleware, validateAdminType, registerAdminController);

export default route;