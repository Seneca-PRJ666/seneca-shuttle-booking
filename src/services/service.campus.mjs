'use strict'

import CampusDb from "../dbaccess/dbaccess.campus.mjs";
import {convertToDate} from "../utilities/index.js";
import {isEmpty} from "../utilities/validator.js";


export default class CampusService {
    static async addNewCampus(campusData) {
        const newCampus = await CampusDb.insertOne(campusData);
        return newCampus;
    }

    /**
     *
     * @param destinationData
     * @returns {Promise<{}>}
     * todo test
     */
    static async addNewDestination(destinationData) {
        let {data} = destinationData;
        try {
            data.map(item=>item.schedule= this.convertScheduleTimeToDate(item.schedule));
            const {destination} = await CampusDb.updateOne(destinationData.campus, data);
            return destination;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Converts the start_time and arrival_time to the Date instance.
     * @param {Object[]} schedule - The schedules
     */
    static convertScheduleTimeToDate(schedule){
        if(isEmpty(schedule)) return schedule;
        return schedule.map(item=>{
            item.start_time=convertToDate(item.start_time);
            item.arrival_time=convertToDate(item.arrival_time);
            return item;
        })
    }


    /**
     * Returns all available schedules for a given destination.
     * @param from
     * @param to
     * @returns {Promise<{directRoutes: *}>}
     */
    static async getSchedule(from, to) {
        let [routes] = await CampusDb.getRoutes(from, to);
        console.error(JSON.stringify(routes, null, 2));
        let directRoutes = null;
        let alternativeRoutes = {};
        for (let i = 0; i < routes.destination.length; i++) {
            if (routes.destination[i].campus_name === to) {
                directRoutes = routes.destination[i];
                // break;
            } else {
                alternativeRoutes[routes.destination[i].campus_name] = routes.destination[i].schedule;
            }
        }

        directRoutes = directRoutes.schedule.map(route => {
            route.from = from;
            route.to = to;
            return route;
        })
        routes = {};
        routes.directRoutes = directRoutes;
        routes.alternativeRoutes = alternativeRoutes;
        return routes;
    }

    static getJourneyPair(scheduleA, scheduleB) {

    }


}





