import express from 'express';
import loginRoute from '../backend/routes/loginRoute.js';
import registerRoute from '../backend/routes/registerRoute.js';
import registerAdminRoute from '../backend/routes/registerAdminRoute.js';

const app = express();
app.use(express.json());

app.use('/auth', loginRoute);
app.use('/auth', registerRoute);
app.use('/auth', registerAdminRoute);

export default app;