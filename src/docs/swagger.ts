import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GudangKu (NodeJS)',
            version: '1.0.0',
            description: 'API Documentation for GudangKu',
            contact: {
                name: 'Developer Support',
                email: 'flazen.edu@gmail.com',
            },
        },
        version: "1.0.0"
    },
    apis: [
        './src/modules/dictionary/docs/*.docs.ts',
    ],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
