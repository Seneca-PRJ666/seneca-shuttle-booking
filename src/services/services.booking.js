'use strict'

import BookingDb from "../dbaccess/dbaccess.booking.js";
import CampusDb from "../dbaccess/dbaccess.campus.mjs";
import BookingModel from "../models/model.booking.js";
import ScheduleService from "./service.schedule.js";
import {NoAvailableSeatError} from "./services.errors.js";

export default class BookingService{
    static async book(username, scheduleId){
        // get available seat
        // if it is greater than 0 book
        try{
            // const availableSeat = await ScheduleService.getAvailableSeat(scheduleId);
            const schedule = await ScheduleService.getScheduleById(scheduleId);
            if(schedule.available_seat>0){
                await ScheduleService.book(scheduleId);
                const booking = new BookingModel({username:username,
                    date:schedule.date,
                    from:schedule.from,
                    to:schedule.to,
                    start:schedule.start,
                    arrive:schedule.arrive,
                    route_name:schedule.route_name
                });
                await booking.save();
                return booking;
            }
            else {
                throw new NoAvailableSeatError("No available seat");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}