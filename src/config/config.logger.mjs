'use strict'
import logger from 'log4js'
console.error(process.env.NODE_ENV);

if(process.env.NODE_ENV !=='test'){
    console.error("logger")
    console.error(process.env.NODE_ENV);
    logger.configure({
        appenders:{
            console:{type:'console'}
        },
        categories:{
            default:{appenders:['console'], level:'info'}
        }
    })
}


const getLogger= function getLogger(category){
    return logger.getLogger(category);
}

export default getLogger;