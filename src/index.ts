import 'reflect-metadata';
import express from 'express';
import http from 'http';
import config from 'config';
import { useExpressServer } from 'routing-controllers';
import controllers from './src/controllers';


const app = express();
const server = http.createServer(app);
const serverInformation = config.get('server');
const { host, port } = serverInformation;
const isProduction = process.env.NODE_ENV === 'production';

useExpressServer(app, {
    defaultErrorHandler: false,
    validation: false,
    routePrefix: '/api',
    controllers,
    middlewares: []
});

server.listen(port, host);

console.log(`Server is listening on ${host}:${port}`);