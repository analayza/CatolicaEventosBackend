import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminType from '../middlewares/validateAdminType.js';
import { generateCertificateController, previewCertificateController} from '../controllers/certificateController.js';


const route = express.Router();

route.get('/preview/:id_event', authMiddleware, validateAdminType, previewCertificateController);
route.post('/create' , authMiddleware, validateAdminType, generateCertificateController);

export default route;