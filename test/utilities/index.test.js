
import {expect} from "chai";
import dayjs from "dayjs";
import {convertToDate, getTimeDifference} from "../../src/utilities/index.js";

describe("Utilities: index", function (){
    describe("Function: getTimeDifference", function (){
        it("Should return correct time difference", function (){
            const timeA= new Date();
            timeA.setHours(6);
            timeA.setMinutes(15);
            const timeB=new Date();
                timeB.setHours(6);
                timeB.setMinutes(30);
            const result = getTimeDifference(timeA, timeB);
            console.error(typeof result);
        })
    });
    describe("Function: convertToDate", function (){
        it("Should return correct Date", function (){
            const timeA="6:15";
            const result = convertToDate(timeA);
            expect(result).to.be.instanceOf(Date);
            expect(result.getHours()).to.be.equal(6);
            expect(result.getMinutes()).to.be.equal(15);
        })
    })
})