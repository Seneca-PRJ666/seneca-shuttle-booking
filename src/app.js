import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';
import express from "express";
import swaggerUI from "swagger-ui-express";
import {swaggerDocs} from "./config/config.swagger.mjs";
import CampusRouter from "./routes/route.campus.mjs";
import ScheduleRouter from "./routes/route.schedule.js";
import UserRouter from "./routes/routes.users.mjs";

/**
 * CORS configuaration
 * https://expressjs.com/en/resources/middleware/cors.html#configuration-options
 * https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
 */
const corsConfig = {
    origin: true,
    credentials: true, //for sending cookie in the header
};

env.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsConfig));

/**
 * Attach all routes.
 */
app.use('/users', UserRouter);
app.use('/campuses', CampusRouter);
app.use('/schedule', ScheduleRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;


