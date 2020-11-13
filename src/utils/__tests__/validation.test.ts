import { plainToClass } from 'class-transformer';
import { CustomerDriverLicense } from '../../models/CustomerDriverLicense';
import { validateLicense } from "../validation";


describe('test validateLicense function', () => {
    it('add valid customer driver license info and should return an empty array', async () => {
        const customerDriverLicense = plainToClass(CustomerDriverLicense, {
            birthDate: '1985-01-08',
            givenName: 'nick',
            middleName: '',
            familyName: 'Joe',
            licenceNumber: '94977000',
            stateOfIssue: 'ACT',
            expiryDate: '2020-01-01'
        });
        const actual = await validateLicense(customerDriverLicense);
        expect(actual.length).toEqual(0);
    });

    it('add empty birthdate should return an array with one item with birthDate property', async () => {
        const customerWithEmptyBirthDate = plainToClass(CustomerDriverLicense, {
            birthDate: '',
            givenName: 'nick',
            middleName: '',
            familyName: 'Joe',
            licenceNumber: '94977000',
            stateOfIssue: 'ACT',
            expiryDate: '2020-01-01'
        });
        const expectedResult = [{ birthDate: ['Birth date format is YYYY-MM-DD!', "Birth date is required!"] }];
        const actual = await validateLicense(customerWithEmptyBirthDate);
        expect(actual.length).toEqual(1);
        expect(actual).toEqual(expect.arrayContaining(expectedResult));
    });

    it('add empty data should return an array with one', async () => {
        const customerWithEmptyBirthDate = plainToClass(CustomerDriverLicense, {});
        const actual = await validateLicense(customerWithEmptyBirthDate);
        const expectedResult = [{ 
                birthDate: ['Birth date format is YYYY-MM-DD!', "Birth date is required!"]
            }, { 
                givenName: ['Maximum characters allowed is 100!', "Given name is required!"]
            }, {
                familyName: ['Family name is required!', 'Maximum characters allowed is 100!']
            }, {
                licenceNumber: ['Licence number is required!']
            }, {
                stateOfIssue: ['State of Issue is invalid!', 'State of Issue is required!']
            }
        ];
        expect(actual).toEqual(expect.arrayContaining(expectedResult));
    });
});