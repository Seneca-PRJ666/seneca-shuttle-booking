import express from "express";
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';
import swaggerUI from "swagger-ui-express";
import logger from "./config/config.logger.mjs";
import {swaggerDocs} from "./config/config.swagger.mjs";
import loginRoutes from "./routes/login.mjs";
import campusRouter from "./routes/route.campus.mjs";

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
app.use('/login', loginRoutes);
app.use('/campuses', campusRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;


