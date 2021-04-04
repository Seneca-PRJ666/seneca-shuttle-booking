'use strict'

import express from "express";
import getLogger from '../config/config.logger.mjs'
import CampusService from "../services/service.campus.mjs";
import HttpStatus from "../services/service.httpStatus.mjs";
import ScheduleService from "../services/service.schedule.js";
import BookingService from "../services/services.booking.js";

const ScheduleRouter = express.Router();
const logger = getLogger("Schedule Route");

ScheduleRouter.get("/", async function (req,res){
    const from = req.query.from;
    const to = req.query.to;
    const date= req.query.date;

    const routes = await ScheduleService.getSchedule({from:from,to:to, date:date});

    res.status(HttpStatus.OK).json(routes);
});

ScheduleRouter.post("/", async function (req, res){
    console.log("Post /schedule");
    try{
        const result = await ScheduleService.createSchedule(req.body);
        res.status(HttpStatus.CREATED).json({message:"Schedules created"});
    }
    catch (e) {
        console.log(e);
    }
})

ScheduleRouter.post("/bookings", async function (req, res){
    console.log("Post /schedule/bookings");
    try{
        const result = await BookingService.book(null,req.body.scheduleId);
        res.status(HttpStatus.OK).json({message:"Booking successful", data:result});
    }
    catch (e) {
        console.log(e);
    }
})

export default ScheduleRouter;