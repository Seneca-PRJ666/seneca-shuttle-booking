'use strict'

import CampusDb from "../dbaccess/dbaccess.campus.mjs";
import {ItemNotFound} from "./services.errors.js";


export async function addNewCampus(campusData){
    const newCampus = await CampusDb.insertOne(campusData);
    return newCampus;
}

/**
 *
 * @param destinationData
 * @returns {Promise<{}>}
 */
export async function addNewDestination(destinationData){
    const {data}=destinationData;
    try{
        const updatedCampus = await CampusDb.updateOne(destinationData.campus,data);
        return updatedCampus;
    }
    catch (e) {
        throw e;
    }
}