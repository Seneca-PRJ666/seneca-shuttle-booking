'use strict'

import CampusDb from "../../src/dbaccess/dbaccess.campus.mjs";
import Campus from "../../src/models/model.campus.mjs";
import CampusService from '../../src/services/service.campus.mjs'
import {expect} from "chai";
import sinon from 'sinon'

describe('Service: Campus', function () {
    describe('Function: addNewCampus', function () {
        it('Valid data, should return new campus', async function () {

            const campusData = {
                name: 'newnham',
                destination: []
            }

            // perform operation
            const stub = sinon.stub(CampusDb, 'insertOne');
            stub.withArgs(campusData).returns(campusData);
            const result = await CampusService.addNewCampus(campusData);

            // assertions
            expect(result).to.be.not.undefined;
        })
    });

    describe('Function: addNewDestination', function(){
        it('Valid data, should return new destination', async function(){
            const input={
                campus:'newnham',
                data:[{campus_name:'york', schedule:[]}]
            }

            const output={
                _id:'randomid',
                name:'newnham',
                destination: [{campus_name:'york',schedule:[]}]
            }

            //perform operation
            const stub =sinon.stub(CampusDb, 'updateOne');
            stub.callsFake(function (){
                return output;
            })
            const result = await CampusService.addNewDestination(input);

            //assertion
            expect(result).to.be.not.undefined;
            expect(result).to.be.not.null;
            expect(result).to.be.an('array').with.length(1);
            expect(result[0]).to.have.property('campus_name','york');
            expect(result[0]).to.have.property('schedule').to.be.an('array').which.is.empty;
        });
        it('Schedule time is converted into Date', async function(){
            const input={
                campus:'newnham',
                data:[{
                    campus_name:'york',
                    schedule:[
                        {
                            "route_name": "a",
                            "start_time": "8:00",
                            "arrival_time": "9:00",
                            "available_seat": "40"
                        },
                        {
                            "route_name": "a",
                            "start_time": "13:00",
                            "arrival_time": "14:15",
                            "available_seat": "40"
                        }
                    ]
                }]
            }

            const dbOutput = [
                {
                    campus_name:"york",
                    schedule:[
                        {

                        }
                    ]
                }
            ]

            //perform operation
            const stub =sinon.stub(CampusDb, 'updateOne');
            stub.callsFake(function (){
                return input.destination;
            })
            const result = await CampusService.addNewDestination(input);

            //assertion
            expect(result).to.be.not.undefined;
            expect(result).to.be.not.null;
            expect(result).to.have.property('campus_name','york');
            expect(result).to.have.property('schedule').to.be.an('array').which.is.empty;
        })
    });
    describe('Method: convertScheduleTimeToDate', function(){
        it('Should convert all schedule times', function (){
            const data=[
                {
                    start_time:"6:15",
                    arrival_time:"7:00",
                    route:"test"
                },
                {
                    start_time: "8:45",
                    arrival_time: "9:50",
                    route:"test"
                }
            ];

            const result = CampusService.convertScheduleTimeToDate(data);

            expect(result).to.be.an('array').with.length(2);
            expect(result[0]).to.be.an('object')
                .which.has.property('start_time')
                .which.is.an.instanceof(Date);
            expect(result[0]).has.property('arrival_time')
                .which.is.an.instanceof(Date);
            expect(result[0].start_time.getHours()).to.be.equal(6);
            expect(result[0].start_time.getMinutes()).to.be.equal(15);
            expect(result[0].arrival_time.getHours()).to.be.equal(7);
            expect(result[0].arrival_time.getMinutes()).to.be.equal(0);
            expect(result[0]).to.have.property('route','test');

            expect(result[1]).to.be.an('object')
                .which.has.property('start_time')
                .which.is.an.instanceof(Date);
            expect(result[1]).has.property('arrival_time')
                .which.is.an.instanceof(Date);
            expect(result[1].start_time.getHours()).to.be.equal(8);
            expect(result[1].start_time.getMinutes()).to.be.equal(45);
            expect(result[1].arrival_time.getHours()).to.be.equal(9);
            expect(result[1].arrival_time.getMinutes()).to.be.equal(50);
            expect(result[1]).to.have.property('route','test');
        })
    })
    describe('Function: getRoutes', function(){
        it('No alternative routes, should only return direct routes', async function(){
            const data=[
                {
                    "_id": "604533ec9cda1846f802b0c6",
                    "name": "newnham",
                    "destination": [
                        {
                            "_id": "604533ec9cda1846f802b0ca",
                            "campus_name": "king",
                            "schedule": [
                                {
                                    "_id": "604533ec9cda1846f802b0cb",
                                    "route_name": "c",
                                    "start_time": "7:00",
                                    "arrival_time": "8:00",
                                    "available_seat": 40
                                },
                                {
                                    "_id": "604533ec9cda1846f802b0cb",
                                    "route_name": "c",
                                    "start_time": "9:00",
                                    "arrival_time": "10:00",
                                    "available_seat": 40
                                }
                            ]
                        }
                    ]
                }
            ];

            const from='newnham';
            const to='king';

            //perform operation
            const stub =sinon.stub(CampusDb, 'getRoutes');
            stub.callsFake(function (){
                return data;
            })
            const result = await CampusService.getSchedule(from,to);

            console.error(JSON.stringify(result, null, 2));

            //assertion
            expect(result).to.be.not.undefined;
            expect(result).to.be.not.null;
            expect(result).to.be.an('object');
            expect (result).to.have.property('directRoutes').which.is.an('array').with.length(2);
            expect(result.directRoutes[0]).to.be.an('object');
            expect( result.directRoutes [0]).to.have.property('from',from);
            expect( result.directRoutes[0]).to.have.property('to',to);
            expect( result.directRoutes [0]).to.have.property('route_name','c');
            expect( result.directRoutes [0]).to.have.property('start_time','7:00');
            expect( result.directRoutes [0]).to.have.property('arrival_time','8:00');
            expect( result.directRoutes [0]).to.have.property('available_seat',40);
            expect( result.directRoutes [0]).to.have.property('_id').to.be.not.empty;

            expect(result.directRoutes[1]).to.be.an('object');
            expect( result.directRoutes [1]).to.have.property('from',from);
            expect( result.directRoutes [1]).to.have.property('to',to);
            expect( result.directRoutes [1]).to.have.property('route_name','c');
            expect( result.directRoutes [1]).to.have.property('start_time','9:00');
            expect( result.directRoutes [1]).to.have.property('arrival_time','10:00');
            expect( result.directRoutes [1]).to.have.property('available_seat',40);
            expect( result.directRoutes [1]).to.have.property('_id').to.be.not.empty;
            // expect(result).to.have.property('campus_name','york');
            // expect(result).to.have.property('schedule').to.be.an('array').which.is.empty;
        });
        it('Alternative routes, should only return direct routes', async function(){
            const data=[
                {
                    "_id": "604533ec9cda1846f802b0c6",
                    "name": "newnham",
                    "destination": [
                        {
                            "_id": "604533ec9cda1846f802b0c7",
                            "campus_name": "york",
                            "schedule": [
                                {
                                    "_id": "604533ec9cda1846f802b0c8",
                                    "route_name": "a",
                                    "start_time": "6:15",
                                    "arrival_time": "7:00",
                                    "available_seat": 40
                                },
                                {
                                    "_id": "604533ec9cda1846f802b0c9",
                                    "route_name": "b",
                                    "start_time": "7:15",
                                    "arrival_time": "8:00",
                                    "available_seat": 40
                                }
                            ]
                        },
                        {
                            "_id": "604533ec9cda1846f802b0ca",
                            "campus_name": "king",
                            "schedule": [
                                {
                                    "_id": "604533ec9cda1846f802b0cb",
                                    "route_name": "c",
                                    "start_time": "7:00",
                                    "arrival_time": "8:00",
                                    "available_seat": 40
                                },
                                {
                                    "_id": "604533ec9cda1846f802b0cb",
                                    "route_name": "c",
                                    "start_time": "9:00",
                                    "arrival_time": "10:00",
                                    "available_seat": 40
                                }
                            ]
                        }
                    ]
                    ,
                    "alternativeroutes": [
                        {
                            "from": "york",
                            "destination": [
                                {
                                    "_id": "604533ec9cda1846f802b0cf",
                                    "campus_name": "king",
                                    "schedule": [
                                        {
                                            "_id": "604533ec9cda1846f802b0d0",
                                            "route_name": "a",
                                            "start_time": "7:00",
                                            "arrival_time": "8:00",
                                            "available_seat": 40
                                        },
                                        {
                                            "_id": "604533ec9cda1846f802b0d1",
                                            "route_name": "d",
                                            "start_time": "9:00",
                                            "arrival_time": "10:00",
                                            "available_seat": 40
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];

            const from='newnham';
            const to='king';

            //perform operation
            const stub =sinon.stub(CampusDb, 'getRoutes');
            stub.callsFake(function (){
                return data;
            })
            const result = await CampusService.getSchedule(from,to);

            console.error(JSON.stringify(result, null, 2));

            //assertion
            expect(result).to.be.not.undefined;
            expect(result).to.be.not.null;
            expect(result).to.be.an('object');
            expect (result).to.have.property('directRoutes').which.is.an('array').with.length(2);
            expect(result.directRoutes[0]).to.be.an('object');
            expect( result.directRoutes [0]).to.have.property('from',from);
            expect( result.directRoutes[0]).to.have.property('to',to);
            expect( result.directRoutes [0]).to.have.property('route_name','c');
            expect( result.directRoutes [0]).to.have.property('start_time','7:00');
            expect( result.directRoutes [0]).to.have.property('arrival_time','8:00');
            expect( result.directRoutes [0]).to.have.property('available_seat',40);
            expect( result.directRoutes [0]).to.have.property('_id').to.be.not.empty;

            expect(result.directRoutes[1]).to.be.an('object');
            expect( result.directRoutes [1]).to.have.property('from',from);
            expect( result.directRoutes [1]).to.have.property('to',to);
            expect( result.directRoutes [1]).to.have.property('route_name','c');
            expect( result.directRoutes [1]).to.have.property('start_time','9:00');
            expect( result.directRoutes [1]).to.have.property('arrival_time','10:00');
            expect( result.directRoutes [1]).to.have.property('available_seat',40);
            expect( result.directRoutes [1]).to.have.property('_id').to.be.not.empty;
            // expect(result).to.have.property('campus_name','york');
            // expect(result).to.have.property('schedule').to.be.an('array').which.is.empty;
        })
    })
})