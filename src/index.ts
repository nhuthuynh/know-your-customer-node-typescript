import 'reflect-metadata';
import config from 'config';
import { createExpressServer } from 'routing-controllers';
import controllers from './controllers/index';

const app = createExpressServer({
    defaultErrorHandler: false,
    validation: false,
    routePrefix: '/api',
    controllers,
    middlewares: []
});

const serverInformation = config.get('server');
const { host, port } = serverInformation;
app.listen(port, host);
console.log(`Server is listening on ${host}:${port}`);