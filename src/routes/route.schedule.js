'use strict'

import express from "express";
import validate from 'validate.js'
import CampusService from "../services/service.campus.mjs";
import HttpStatus from "../services/service.httpStatus.mjs";
import getLogger from '../config/config.logger.mjs'
import {ItemNotFound} from "../services/services.errors.js";

const ScheduleRouter = express.Router();
const logger = getLogger("Schedule Route");

ScheduleRouter.get("/", async function (req,res){
    const from = req.query.from;
    const to = req.query.to;

    const routes = await CampusService.getSchedule(from,to);

    res.status(HttpStatus.OK).json(routes);
})

export default ScheduleRouter;