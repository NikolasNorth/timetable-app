import {Config} from '../etc/config';
import {IAccount} from '../api/models/account';
import {SignOptions, sign, verify} from 'jsonwebtoken';
import {transporter} from '../app';

/** Generate a JSON Web Token */
export const issueJwt = (account: IAccount): string => {
    const date: Date = new Date();
    const payload: any = {
        sub: account._id,
        iat: date.setDate(date.getDate()),
        exp: date.setDate(date.getDate() + 1),  // 1 day
    };
    const options: SignOptions = {algorithm: 'RS256'}
    return sign(payload, Config.jwt.PRIVATE_KEY, options);
}

/** Send confirmation email to account. */
export const sendConfirmationEmail = (account: IAccount): void => {
    const token: string = issueJwt(account);
    const url: string = `${Config.client.hostname}/confirm-account/${token}`;
    transporter.sendMail({
        to: account.email,
        subject: 'Confirm Email',
        html: `To confirm your email: <a href="${url}">click here</a>`,
    });
}

/** Extract exp claim from JSON web token */
export const getJwtExpiration = (token: string): number => {
    try {
        const payload: any = verify(token, Config.jwt.PUBLIC_KEY);
        return payload.exp;
    } catch (err) {
        throw err;
    }
}

/** Send email with password to account */
export const sendPasswordEmail = (account: IAccount, password: string): void => {
    const url: string = `${Config.client.hostname}/password-reset`
    transporter.sendMail({
        to: account.email,
        subject: 'Account Password',
        html: `
        <p>Here is your randomly generated password:</p>
        <code>${password}</code>
        <p><a href="${url}">Click here</a> if you wish to change the password.</p>
        `
    });
}

/** Generates a random plain-text password */
export const generateRandomPassword = (length: number): string => {
    const alphaNumericChars: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array(length).fill(alphaNumericChars).map((x) => {
        return x[Math.floor(Math.random() * x.length)]
    }).join('');
}

export const sendPasswordResetEmail = (account: IAccount): void => {
    const payload: any = {
        sub: account._id,
        iat: Date.now(),
    };
    const options: SignOptions = {
        expiresIn: '1d',
    };
    const token: string = sign(payload, account.password, options);
    const url: string = `${Config.client.hostname}/password-reset/${account._id}/${token}`;
    transporter.sendMail({
        to: account.email,
        subject: 'Reset Password',
        html: `
        <p>To reset your password <a href="${url}">click here</a>.</p>
        <p>If you did not make this request, then you can ignore this message and your password will remain the same.</p>
        `
    });
}
