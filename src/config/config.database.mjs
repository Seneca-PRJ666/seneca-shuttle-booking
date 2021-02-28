'use strict'
import env from 'dotenv';
import mongoose from "mongoose";
import getLogger from './config.logger.mjs';

const DB_LOGGER=getLogger('DbConfig');
env.config();

/**
 * Database connection options
 */
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10
};

/**
 * Connect to database
 */
export async function connectToDb() {
    const {uri, dbName} = (process.env.NODE_ENV === 'test' ? {
        uri: process.env.DBURI_TEST,
        dbName: 'Test Database'
    } : {uri: process.env.DBURI, dbName: 'Development Database'});
    try {
        await mongoose.connect(uri, options);
        DB_LOGGER.info("Connected to " + dbName);
    } catch (err) {
        DB_LOGGER.error("Database connection failed")
        DB_LOGGER.error(err);
    }
}

/**
 * Disconnect from db
 */
export async function disconnectFromDb() {
    try {
        await mongoose.connection.close();
        DB_LOGGER.info('Database connection closed.')
    } catch (error) {
        DB_LOGGER.error(error);
    }
}




