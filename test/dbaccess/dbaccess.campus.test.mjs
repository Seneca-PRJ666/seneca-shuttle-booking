process.env.NODE_ENV = 'test';

import {expect} from "chai";
import mongoose from "mongoose";
import {connectToDb, disconnectFromDb} from "../../src/config/config.database.mjs";
import CampusDb from '../../src/dbaccess/dbaccess.campus.mjs'
import Campus from "../../src/models/model.campus.mjs";

async function createOneCampus() {
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
        name: 'newnham',
        destination: [destinationData]
    }

    // perform operation
    const schedule = await CampusDb.insertOne(campusData);
}

async function arrangeData() {
    try{
        // Create newnham campus
        const newnham = new Campus({name: 'newnham'});
        newnham.destination = [
            {
                "campus_name": "york",
                "schedule": [
                    {
                        "route_name": "a",
                        "start_time": "6:15",
                        "arrival_time": "7:00",
                        "available_seat": "40"
                    },
                    {
                        "route_name": "b",
                        "start_time": "7:15",
                        "arrival_time": "8:00",
                        "available_seat": "40"
                    },
                ]
            },
            {
                "campus_name": "king",
                "schedule": [
                    {
                        "route_name": "c",
                        "start_time": "7:00",
                        "arrival_time": "8:00",
                        "available_seat": "40"
                    }
                ]
            },
            {
                "campus_name": "markham",
                "schedule": [
                    {
                        "route_name": "e",
                        "start_time": "7:15",
                        "arrival_time": "7:45",
                        "available_seat": "40"
                    }
                ]
            }
        ]
        await newnham.save();

        // Create york campus
        const york = new Campus({name: 'york'});
        york.destination = [
            {
                "campus_name": "king",
                "schedule": [
                    {
                        "route_name": "a",
                        "start_time": "7:00",
                        "arrival_time": "8:00",
                        "available_seat": "40"
                    },
                    {
                        "route_name": "d",
                        "start_time": "9:00",
                        "arrival_time": "10:00",
                        "available_seat": "40"
                    }
                ]
            },
            {
                "campus_name":"newnham",
                "schedule":[
                    {
                        "route_name": "a",
                        "start_time": "9:30",
                        "arrival_time": "10:15",
                        "available_seat": "40"
                    }
                ]
            }
        ]
        await york.save();
    }
    catch (e) {
        console.error('Error in data arrangement before test');
        console.error(e);
    }


}

describe('DB Access: Schedule', function () {
    before(async function () {
        try {
            await connectToDb();
            // clear the database
            await Campus.deleteMany({});
        } catch (err) {
            console.log(err);
        }
    });
    after(async function () {
        //clear the database
        await Campus.deleteMany({});
        await disconnectFromDb();
    });

    describe('Function: insertSchedule', function () {
        it('All valid data, should create a new document in DB', async function () {
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
            const scheduleInDb = await Campus.findOne({name: 'newnham'});
            expect(scheduleInDb).to.be.not.null;
            expect(scheduleInDb).to.have.property('_id');
        })
    })

    describe('Function: updateOne', function () {
        it('All valid data, should update the document in database', async function () {
            //arrange data
            await createOneCampus();
            const campusName = 'newnham'
            const data = {
                campus_name: 'york',
                destination: []
            }
            // perform operation
            let result = await CampusDb.updateOne(campusName, data);

            //assert
            expect(result).to.be.not.null;
            expect(result).to.be.not.undefined;
            expect(result).to.be.an.instanceof(mongoose.Document);

            // retrieve the same document
            result = await Campus.findOne({name: campusName});
            expect(result).to.be.not.null;
            expect(result).to.be.not.undefined;
            expect(result).to.have.property('destination').which.is.an('array').to.have.length(1);
            expect(result.destination[0]).to.have.property('campus_name', data.campus_name);
            expect(result.destination[0]).to.have.property('schedule').which.is.an('array').and.is.empty;
        })
    });

    describe('Function: getRoutes', function () {
        before(async function(){
            await arrangeData();
        })
        it('Should return some schedule', async function () {

            const schedule = await CampusDb.getRoutes('newnham', 'york');
            console.error(JSON.stringify(schedule,null,2));
            expect(schedule).to.be.not.null;
            expect(schedule).to.be.not.undefined;
            expect(schedule).to.be.an('array').to.have.length(1);
            expect(schedule[0]).to.have.property('destination').which.is.an('array').with.length(3);
            expect(schedule[0]).to.have.property('alternativeroutes').which.is.an('array').with.length(0);
        });

        it('There is alternative route, it should return alternative route', async function (){
            const schedule = await CampusDb.getRoutes('newnham', 'king');
            console.error(JSON.stringify(schedule,null,2));
            expect(schedule).to.be.not.null;
            expect(schedule).to.be.not.undefined;
            expect(schedule).to.be.an('array').to.have.length(1);
            expect(schedule[0]).to.have.property('destination').which.is.an('array').with.length(2);
            expect(schedule[0]).to.have.property('alternativeroutes').which.is.an('array').with.length(1);
        });
        it('There is no alternative route, alternative route should be empty', async function (){
            const schedule = await CampusDb.getRoutes('newnham', 'markham');
            console.error(JSON.stringify(schedule,null,2));
            expect(schedule).to.be.not.null;
            expect(schedule).to.be.not.undefined;
            expect(schedule).to.be.an('array').to.have.length(1);
            expect(schedule[0]).to.have.property('destination').which.is.an('array').with.length(1);
            expect(schedule[0]).to.have.property('alternativeroutes').which.is.an('array').with.length(0);
        });

    });
})