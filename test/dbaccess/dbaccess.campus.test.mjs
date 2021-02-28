process.env.NODE_ENV='test';

import CampusDb from '../../src/dbaccess/dbaccess.campus.mjs'
import {connectToDb, disconnectFromDb} from "../../src/config/config.database.mjs";
import Campus from "../../src/models/model.campus.mjs";
import mongoose from "mongoose";
import {expect} from "chai";

async function createOneCampus(){
    const routesData = [
        {
            route_name: 'a',
            start_time: '6:15',
            arrival_time: '7',
            available_seat: 10,
        }
    ]

    const destinationData = {
        campus_name: 'york',
        schedule: routesData
    }

    const campusData = {
        name: 'king',
        destination: [destinationData]
    }

    // perform operation
    const schedule = await CampusDb.insertOne(campusData);
}

describe('DB Access: Schedule', function (){
    before(async function(){
        try{
            await connectToDb();
            // clear the database
            await Campus.deleteMany({});
        }
        catch(err){
            console.log(err);
        }
    });
    after(async function(){
        //clear the database
        await Campus.deleteMany({});
        await disconnectFromDb();
    });

    describe('Function: insertSchedule', function (){
        it('All valid data, should create a new document in DB', async function (){
            //arrange data
            const routesData = [
                {
                    route_name: 'a',
                    start_time: '6:15',
                    arrival_time: '7',
                    available_seat: 10,
                }
            ]

            const destinationData = {
                campus_name: 'york',
                schedule: routesData
            }

            const scheduleData = {
                name: 'newnham',
                destination: [destinationData]
            }

            // perform operation
           const schedule = await CampusDb.insertOne(scheduleData);

            //assert
            expect(schedule).to.be.not.null;
            expect(schedule).to.be.an.instanceof(mongoose.Document);

            // retrieve the same document
            const scheduleInDb=await Campus.findOne({name:'newnham'});
            expect(scheduleInDb).to.be.not.null;
            expect(scheduleInDb).to.have.property('_id');
        })
    })

    describe('Function: updateOne', function (){
        it('All valid data, should update the document in database', async function (){
            //arrange data
            await createOneCampus();
            const campusName = 'king'
            const data={
                campus_name:'york',
                destination:[]
            }
            // perform operation
            let result = await CampusDb.updateOne(campusName,data);

            //assert
            expect(result).to.be.not.null;
            expect(result).to.be.not.undefined;
            expect(result).to.be.an.instanceof(mongoose.Document);

            // retrieve the same document
            result=await Campus.findOne({name:campusName});
            expect(result).to.be.not.null;
            expect(result).to.be.not.undefined;
            expect(result).to.have.property('destination').which.is.an('array').to.have.length(1);
            expect(result.destination[0]).to.have.property('campus_name',data.campus_name);
            expect(result.destination[0]).to.have.property('schedule').which.is.an('array').and.is.empty;
        })
    })
})