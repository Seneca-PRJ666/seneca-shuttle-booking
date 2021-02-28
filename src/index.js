'use strict'

import {connectToDb} from "./config/config.database.mjs";
import app from './app.js';
import env from 'dotenv';
import getLogger from './config/config.logger.mjs'

env.config();
const indexLogger = getLogger("Index");

/**
 * Starts the server.
 *
 * @param {Object} app - Express application.
 * @returns {Promise<void>}
 */
(async function startServer () {
    try {
        await connectToDb();

        const port= (process.env.NODE_ENV==='Test'?process.env.PORT_TEST:process.env.PORT);
        const host=process.env.HOST;

        app.listen(port, () => {
            indexLogger.info(`Server is listening to http://${host}:${port}`)
        });
        return app;
    } catch (err) {
        console.log(err);
    }
})();

