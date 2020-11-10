import { Middleware, ExpressMiddlewareInterface} from "routing-controllers";

@Middleware({ type: 'before'} )
export default class LoggingMiddleware implements ExpressMiddlewareInterface {
    
    use(request: any, response: any, next: (err?: any) => any): void {
        console.log('incomming request');
        next && next();
    }
}