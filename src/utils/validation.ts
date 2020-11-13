import { registerDecorator, ValidationArguments, validate, ValidationOptions } from 'class-validator';
import { CustomerDriverLicense, StateOfIssue } from '../models/CustomerDriverLicense';

export const validateLicense = async (customer: CustomerDriverLicense): Promise<Array<any>> => {
    const validateResult = await validate(customer);
    return validateResult.reduce((accErrors, { property, constraints }) => [...accErrors, { [property]: Object.values(constraints || {}) || [] }], []);
}

export function IsStateOfIssue(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsStateOfIssue',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return typeof value === 'string' && typeof relatedValue === 'string' && Object.values(StateOfIssue).includes(value);
                }
            }
        });
    };
}