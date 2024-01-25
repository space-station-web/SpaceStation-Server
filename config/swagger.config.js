import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: 'Space Station API',
            version: '1.0.0',
            description: ' 우주정거장 API'
        },
        host: 'localhost:8080',
        basepath: '../'
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);