import {Config} from '../etc/config';
import {IAccount} from '../api/models/account';
import {SignOptions, sign} from 'jsonwebtoken';
import {transporter} from '../app';

/** Generate a JSON Web Token */
export const issueJwt = (user: IAccount): string => {
    const payload: any = {
        sub: user._id,
        iat: Date.now(),
    };
    const options: SignOptions = {
        expiresIn: '1d',
        algorithm: 'RS256',
    }
    return sign(payload, Config.jwt.PRIVATE_KEY, options);
}

/** Send confirmation email to account. */
export const sendConfirmationEmail = (user: IAccount): void => {
    const token: string = issueJwt(user);
    const confirmUrl: string = `${Config.client.hostname}/confirm-account/${token}`;
    transporter.sendMail({
        to: user.email,
        subject: 'Confirm Email',
        html: `Confirm your email: <a href="${confirmUrl}">${confirmUrl}</a>`,
    });
}
