import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.APP_FACEBOOK_ID,
            clientSecret: process.env.APP_FACEBOOK_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/redirect`,
            scope: 'email',
            profileFields: ['emails', 'name', 'picture.type(large)'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { name, emails, id } = profile;
        // const avatarUrl = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`;
        const user = {
            email: emails ? emails[0].value : null,
            firstName: name.givenName,
            lastName: name.familyName,
            facebookId: id,
            // avatarUrl: avatarUrl,
        };
        const payload = {
            ...user,
            accessToken,
        };

        done(null, payload);
    }
}
