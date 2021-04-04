'use strict'

import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    date:Date,
    from:String,
    to:String,
    start:String,
    arrive:String,
    available_seat:Number,
    route_name:String
});

const ScheduleModel = mongoose.model('Schedules', ScheduleSchema);
export default ScheduleModel;