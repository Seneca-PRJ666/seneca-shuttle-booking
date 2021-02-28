'use strict'

import CampusDb from "../../src/dbaccess/dbaccess.campus.mjs";
import * as CampusService from '../../src/services/service.campus.mjs'
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
            const data={
                campus:'newnham',
                destination:{
                    campus_name:'york',
                    schedule:[]
                }
            }

            //perform operation
            const stub =sinon.stub(CampusDb, 'updateOne');
            stub.callsFake(function (){
                return data.destination;
            })
            const result = await CampusService.addNewDestination(data);

            //assertion
            expect(result).to.be.not.undefined;
            expect(result).to.be.not.null;
            expect(result).to.have.property('campus_name','york');
            expect(result).to.have.property('schedule').to.be.an('array').which.is.empty;
        })
    })
})