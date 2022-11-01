import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    logger = new Logger('authGuard');

    constructor() {
        super({ usernameField: 'email' });
    }

    canActivate(context: ExecutionContext): any {
        return super.canActivate(context);
    }
}
