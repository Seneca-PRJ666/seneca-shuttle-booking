'use strict'
import logger from 'log4js'

logger.configure({
    appenders:{
        console:{type:'console'}
    },
    categories:{
        default:{appenders:['console'], level:'info'}
    }
})

const getLogger= function getLogger(category){
    return logger.getLogger(category);
}

export default getLogger;