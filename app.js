import express from 'express';
import loginRoute from '../backend/routes/loginRoute.js';
import registerRoute from '../backend/routes/registerRoute.js';
import registerAdminRoute from '../backend/routes/registerAdminRoute.js';
import userRoute from '../backend/routes/userRoute.js';
import userAdminRoute from '../backend/routes/userAdminRoute.js';
import eventRoute from '../backend/routes/eventRoute.js';
import activityRoute from '../backend/routes/activityRoute.js';
import sponsorRoute from '../backend/routes/sponsorRoute.js';

const app = express();
app.use(express.json());

app.use('/auth', loginRoute);
app.use('/auth', registerRoute);
app.use('/auth', registerAdminRoute);
app.use('/user', userRoute);
app.use('/admin', userAdminRoute);
app.use('/event', eventRoute);
app.use('/activity', activityRoute);
app.use('/sponsor', sponsorRoute);

export default app;