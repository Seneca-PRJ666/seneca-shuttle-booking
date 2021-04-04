'use strict'

import ScheduleModel from "../models/model.schedule.js";

export default class ScheduleService{
    static async getSchedule(query){
        const result = await ScheduleModel.find({from:query.from, to:query.to, date:query.date}).exec();
        return result;
    }

    static async getScheduleById(id){
        try{
            const schedule = await ScheduleModel.findOne({_id:id}).exec();
            return schedule;
        }
        catch (e) {
            console.log(e);
        }
    }

    static async createSchedule(data){
        try{
            const schedule = await ScheduleModel.insertMany(data);
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getAvailableSeat(scheduleId){
        try{
            const {available_seat}= await ScheduleModel.findOne({_id:scheduleId},"available_seat").exec();
            return available_seat;
        }
        catch (e) {
            console.log(e);
        }
    }

    static async book(scheduleId){
        try{
            const schedule = await ScheduleModel.findOne({_id:scheduleId},"available_seat").exec();
            schedule.available_seat=schedule.available_seat-1;
            await schedule.save();
        }
        catch (e) {
            console.log(e);
        }
    }
}