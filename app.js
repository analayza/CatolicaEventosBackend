import express from 'express';
import loginRoute from '../backend/routes/loginRoute.js';
import registerRoute from '../backend/routes/registerRoute.js';
import registerAdminRoute from '../backend/routes/registerAdminRoute.js';
import userRoute from '../backend/routes/userRoute.js';
import userAdminRoute from '../backend/routes/userAdminRoute.js';
import eventRoute from '../backend/routes/eventRoute.js';
import activityRoute from '../backend/routes/activityRoute.js';
import sponsorRoute from '../backend/routes/sponsorRoute.js';
import enrollmentRoute from '../backend/routes/enrollmentRoute.js';
import certificateRoute from '../backend/routes/certificateRoute.js';
import recoveryRoute from '../backend/routes/recoveryRoute.js';
import { errorHandler } from './middlewares/errorHandlerMulter.js';
import cors from "cors";

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/auth', loginRoute);
app.use('/auth', registerRoute);
app.use('/auth', registerAdminRoute);
app.use('/auth', recoveryRoute)
app.use('/user', userRoute);
app.use('/admin', userAdminRoute);
app.use('/event', eventRoute);
app.use('/activity', activityRoute);
app.use('/sponsor', sponsorRoute);
app.use('/enrollment', enrollmentRoute);
app.use('/certificate', certificateRoute);

app.use(errorHandler);
export default app;