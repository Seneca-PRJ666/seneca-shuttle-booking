import {expect} from "chai";
import request from 'supertest-as-promised';
import app from '../../src/app.js'
import {connectToDb, disconnectFromDb} from "../../src/config/config.database.mjs";
import CampusDb from "../../src/dbaccess/dbaccess.campus.mjs";


describe('Route: Campus', function (){
    describe("Method: Post /campuses",function () {
        process.env.NODE_ENV='test';
        before(async function (){
            await connectToDb();
            await CampusDb.deleteAll();
        })

        after(async function (){
            await CampusDb.deleteAll();
            await disconnectFromDb();
        })

        it('Should return 201', async function () {
            const newCampus = {
                name: 'newnham',
                destination: []
            }

            const response = await request(app).post("/campuses").send(newCampus);
            expect(response.status).to.be.equal(201);
            expect(response.body).to.be.an('object').which.is.not.null;
            expect(response.body).to.have.property('name', 'newnham');
            expect(response.body).to.have.property('destination').to.be.empty;

        });
    });

    describe('Method: Post /campuses/destinations', function (){
        it('Destination name provided, schedule is empty, Should return 201', async function (){
            const destinationData = {
                campus:'',
                data:{
                    campus_name:'york',
                    schedule:[]
                }
            }
            const response = await request(app).post("/campuses/destinations").send(destinationData);

            expect(response.status).to.be.equal(201);
            expect(response.body).to.be.an('object').which.is.not.null;
            expect(response.body).to.have.property('campus_name','york');
            expect(response.body).to.have.property('schedule').which.is.empty;
        })
    })
})

