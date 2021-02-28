'use strict'

import swaggerJsdoc from 'swagger-jsdoc';

const swaggerJsdocOption={
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title:'Seneca Shuttle Booking API',
            version:'1.0.0'
        }
    },
    apis:['../routes/*.js']
};

export const swaggerDocs = await swaggerJsdoc(swaggerJsdocOption);