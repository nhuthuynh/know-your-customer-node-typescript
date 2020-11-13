import request from 'supertest';
import app from '../../index';

describe('CustomerController', () => {
    describe('POST /api/customer/licenses', () => {
        it('response should have success with data or errors with code', async done => {
            const validCustomerDriverLicense = { 
                birthDate: '1985-01-08',
                givenName: 'nick',
                middleName: '',
                familyName: 'Joe',
                licenceNumber: '94977000',
                stateOfIssue: 'ACT',
                expiryDate: '2020-01-01' };
            const response = await request(app).post('/api/customer/licenses').send(validCustomerDriverLicense)
            expect(response.body).toHaveProperty('data'); // this test will not return correctly as api return random data.
        })
    })
});