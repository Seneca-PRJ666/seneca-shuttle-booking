import {expect} from 'chai';
import mongoose from "mongoose";
import Campus from '../../src/models/model.campus.mjs'


describe('Model: Schedule', function () {

    it('All data provided, should create a new campus object', function () {
        // arrange data
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
        const schedule = new Campus(campusData);

        //assert
        expect(schedule).to.be.not.null;
        expect(schedule).to.be.an.instanceof(Campus);
        expect(schedule).to.be.an.instanceof(mongoose.Document);
        expect(schedule).to.have.property('name').to.be.equal(campusData.name);
        expect(schedule).to.have.property('destination').to.be.an.instanceof(Array).to.have.length(1);
        expect(schedule.destination[0]).to.have.property('campus_name', campusData.destination[0].campus_name);
        expect(schedule.destination[0]).to.have.property('schedule').to.be.an.instanceof(Array).to.have.length(1);
        expect(schedule.destination[0].schedule[0]).to.have.property('start_time', routesData[0].start_time);
        expect(schedule.destination[0].schedule[0]).to.have.property('arrival_time', routesData[0].arrival_time);
        expect(schedule.destination[0].schedule[0]).to.have.property('route_name', routesData[0].route_name);
        expect(schedule.destination[0].schedule[0]).to.have.property('available_seat', routesData[0].available_seat);
    })
})