import { JsonController, Body, Post, Get } from 'routing-controllers';

@JsonController('/customer')
export default class CheckYourCustomerController {

    @Get()
    welcome(): string {
        return 'welcome';
    }
}