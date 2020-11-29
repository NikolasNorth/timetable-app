import {PassportStatic} from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import {Account, IAccount} from '../api/models/account';
import * as bcrypt from 'bcrypt';
import {Config} from '../etc/config';

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.jwt.PUBLIC_KEY,
    algorithms: ['RS256'],
};

/** Implement JSON Web Token strategy */
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done: VerifiedCallback) => {
    try {
        const account: IAccount | null = await Account.findOne({_id: payload.sub});
        if (!account) {
            return done(null, false);
        } else {
            return done(null, account);
        }
    } catch (err) {
        return done(err, false);
    }
})

/** Initialize passport */
export const initializePassport = (passport: PassportStatic) => {
    passport.use(jwtStrategy);
}
