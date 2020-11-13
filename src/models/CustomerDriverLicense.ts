import { IsNotEmpty, Matches, MaxLength, ValidateIf } from 'class-validator';
import { DATE_FORMAT } from '../utils/utils';
import { IsStateOfIssue } from '../utils/validation';

export enum StateOfIssue {
    NSW,
    QLD,
    SA,
    TAS,
    VIC,
    WA,
    ACT,
    NT
}

export enum VerificationResultCode {
    Yes = 'Y',
    No = 'N',
    DocumentError = 'D',
    ServerError = 'S'
}

export const VerificationResultCodeMessage = {
    [VerificationResultCode.DocumentError]: 'Document Error',
    [VerificationResultCode.ServerError]: 'Server Error'
}

export class CustomerDriverLicense {
    @IsNotEmpty({ message: 'Birth date is required!' })
    @Matches(DATE_FORMAT, { message: 'Birth date format is YYYY-MM-DD!' })
    birthDate!: Date;

    @IsNotEmpty({ message: 'Given name is required!' })
    @MaxLength(100, { message: 'Maximum characters allowed is 100!'})
    givenName!: string;

    @ValidateIf(obj => !!obj.middleName)
    @MaxLength(100, { message: 'Maximum characters allowed is 100!'})
    middleName!: string;

    @MaxLength(100, { message: 'Maximum characters allowed is 100!'})
    @IsNotEmpty({ message: 'Family name is required!' })
    familyName!: string;
    
    @IsNotEmpty({ message: 'Licence number is required!' })
    licenceNumber!: string;

    @IsNotEmpty({ message: 'State of Issue is required!' })
    @IsStateOfIssue('stateOfIssue', { message: 'State of Issue is invalid!' })
    stateOfIssue!: StateOfIssue;

    @ValidateIf(obj => !!obj.expiryDate)
    @Matches(DATE_FORMAT, { message: 'Expire date format is YYYY-MM-DD!' })
    expiryDate!: string;
}