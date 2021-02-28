'use strict'

import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    route_name:{
        type:String,
        required:true
    },
    start_time:{
        type:String
    },
    arrival_time:{
        type:String
    },
    available_seat:{
        type:Number,
        min:0
    }
});

const DestinationSchema = new mongoose.Schema({
    campus_name:{
        type:String
    },
    schedule:[ScheduleSchema]
})

const CampusSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        set:value => value.toLowerCase()
    },
    destination:[DestinationSchema]
})

const Campus = mongoose.model('campus', CampusSchema);
export default Campus;