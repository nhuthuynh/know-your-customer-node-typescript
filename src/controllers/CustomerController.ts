import { JsonController, Get, Post, Body } from 'routing-controllers';
import fetch from 'node-fetch';

@JsonController('/customer')
export default class CustomerController {

    @Get()
    welcome(): string {
        return 'welcome';
    }

    @Post('/licenses')
    async checkingLicenses(@Body() customer: any):Promise<any> {
        const testData = { 
            "birthDate" : "1985-02-08", 
            "givenName" : "James", 
            "middleName" : "Robert", 
            "familyName" : "Smith", 
            "licenceNumber" : "94977000", 
            "stateOfIssue" : "NSW", 
            "expiryDate" : "2020-01-01" 
        };
        const response = await fetch('https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence', {
            headers: {
                'Authorization': 'Bearer 03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(testData)
        });
        const result = await response.json();
        console.log('result', result);
        return result;
    }
}