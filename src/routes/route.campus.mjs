'use strict'

import express from "express";
import validate from 'validate.js'
import getLogger from '../config/config.logger.mjs'
import CampusService from "../services/service.campus.mjs";
import HttpStatus from "../services/service.httpStatus.mjs";
import {ItemNotFound} from "../services/services.errors.js";


const CampusRouter = express.Router();
const logger = getLogger("Campus Route");


CampusRouter.get("/", async function (req, res) {
    logger.info("Received request at /campuses");
    res.json("Hello from busSchedule");
})


CampusRouter.post("/", async function (req, res) {
    const data = req.body;
    if (validate.isEmpty(data)) {
        res.status(HttpStatus.UNPROCESSABLE).json({
            error_code: 'data required',
            message: 'Campus data must be provided.'
        });
    }
    const result = await CampusService.addNewCampus(req.body);
    res.status(HttpStatus.CREATED).json(result);
})


CampusRouter.post("/destinations", async function (req, res) {
    const data = req.body;
    logger.info("Received post request at /campuses/destinations with data "+JSON.stringify(data));
    if (validate.isEmpty(data)) {
        logger.info("Data is invalid. Returning "+HttpStatus.UNPROCESSABLE);
        res.status(HttpStatus.UNPROCESSABLE).json({
            error_code: 'data required',
            message: 'destination data must be provided'
        })
    }
    try {
        const result = await CampusService.addNewDestination(req.body);
        logger.info("Destination created. New destination is "+ JSON.stringify(result));
        logger.info("Returning "+HttpStatus.CREATED);
        res.status(HttpStatus.CREATED)
            .json({errorCode: '', message: 'Destination successfully created', data: result});
    } catch (e) {
        if (e instanceof ItemNotFound) {
            logger.info("No campus found with name "+data.campus);
            logger.info("Returning "+HttpStatus.NOT_FOUND);
            res.status(HttpStatus.NOT_FOUND).json({errorCode: 'not found', message: 'Campus not found.'})
        }
    }

})



export default CampusRouter;