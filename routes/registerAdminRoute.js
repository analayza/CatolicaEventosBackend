import express from 'express';
import registerAdminController from '../controllers/registerAdminController.js';

const route = express.Router();
route.post('/register/admin', registerAdminController);

export default route;