import {Config} from '../etc/config';
import {PassportStatic} from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions as JwtStrategyOptions,
    VerifiedCallback as JwtVerifiedCallback
} from 'passport-jwt';
import {
    Profile,
    Strategy as GoogleStrategy,
    StrategyOptions as GoogleStrategyOptions,
    VerifyCallback as GoogleVerifiedCallback
} from 'passport-google-oauth20';
import {Account, IAccount} from '../api/models/account';
import * as utils from '../lib/utils';
import * as bcrypt from 'bcrypt';

const jwtOptions: JwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.jwt.PUBLIC_KEY,
    algorithms: ['RS256'],
};

/** Implement JSON Web Token strategy */
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done: JwtVerifiedCallback) => {
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
});

const googleOptions: GoogleStrategyOptions = {
    clientID: Config.google.CLIENT_ID,
    clientSecret: Config.google.CLIENT_SECRET,
    callbackURL: Config.google.CALLBACK_URL,
};

const googleStrategy = new GoogleStrategy(googleOptions, async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: GoogleVerifiedCallback
) => {
    try {
        const googleId: number = Number(profile.id);
        const googleEmail: string | undefined = profile.emails?.[0].value;
        if (!googleEmail) {
            done(new Error('Google email not found.'), false);
        } else {
            let account: IAccount | null = await Account.findOne({googleId: googleId});
            if (!account) {
                const password: string = utils.generateRandomPassword(10);
                const hashedPassword: string = await bcrypt.hash(password, 10);
                account = await Account.create({
                    name: profile.displayName,
                    email: googleEmail,
                    password: hashedPassword,
                    isConfirmed: true,
                    isAdmin: false,
                    isActive: true,
                    numSchedules: 0,
                    schedules: [],
                    googleId: googleId,
                });
                account = await account.save();
                utils.sendPasswordEmail(account, password);
            }
            done(undefined, account);
        }
    } catch (err) {
        done(err, false);
    }
});

/** Initialize passport */
export const initializePassport = (passport: PassportStatic) => {
    passport.use(jwtStrategy);
    passport.use(googleStrategy);
}
