'use strict'

import Campus from '../models/model.campus.mjs'
import getLogger from '../config/config.logger.mjs'
import {ItemNotFound} from "../services/services.errors.js";

export default class CampusDb{
    static logger = getLogger("CampusDao");
    static async deleteAll(){
        await Campus.deleteMany();
    }

    static async insertOne(campusData){
        const campus = new Campus(campusData);
        try{
            await campus.save();
            return campus;
        }catch (e) {
            //todo handle error
            throw e;
        }
    }

    static async updateOne(campusName,data){
        try{
            let campus = await Campus.findOne({name:campusName});
            if(!campus){
                throw new ItemNotFound("Campus not found");
            }

            campus.destination=data;
            await campus.save();
            return campus;
        }
        catch (e) {
            this.logger.error(e.getMessage());
            this.logger.error(e);
            //todo
        }
    }
}



