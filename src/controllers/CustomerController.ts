import fetch from 'node-fetch';
import config from 'config';
import { JsonController, Get, Post, Body } from 'routing-controllers';
import { CustomerDriverLicense, VerificationResultCode, VerificationResultCodeMessage } from '../models/CustomerDriverLicense';
import { validateLicense } from '../utils/validation';

@JsonController('/customer')
export default class CustomerController {

    @Post('/licenses')
    async checkingLicenses(@Body({ required: true }) customerDriverLicense: CustomerDriverLicense):Promise<any> {
        const errors = await validateLicense(customerDriverLicense);
        if (errors.length > 0) {
            return {
                message: 'Input object is invalid',
                errors
            }
        }
        const { api_key, endpoint } = config.get('KYC');
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(customerDriverLicense)
        });
        const result = await response.json();
        if (result.verificationResultCode && result.verificationResultCode === VerificationResultCode.Yes || result.verificationResultCode === VerificationResultCode.No) {
            return {
                data: {
                    kycResult: result.verificationResultCode === VerificationResultCode.Yes
                }
            };
        } else {
            return {
                message: VerificationResultCodeMessage[result.verificationResultCode],
                errors: {
                    code: result.verificationResultCode
                }
            };
        }
    }
}