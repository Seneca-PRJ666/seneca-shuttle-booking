'use strict'

/**
 * Returns the difference between two time periods.
 * @param {String} timeA - Time represented like "6:30" where 6 is hour 30 is minute.
 * @param timeB
 * @returns {String} The difference bewteen two times.
 */
export function getTimeDifference(timeA, timeB){
    let diff = (timeA.getTime() - timeB.getTime())/1000;
    diff /=60;
    return Math.round(diff);
}

export function getHourValue(time){
    return (time.split(":"))[0];
}

export function getMinuteValue(time){
    return (time.split(":"))[1];
}

export function convertToDate(time){
    const today = new Date();
    today.setHours(getHourValue(time));
    today.setMinutes(getMinuteValue(time));
    return today;
}
