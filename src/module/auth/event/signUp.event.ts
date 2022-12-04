import { DomainEvent } from 'nest-outbox-typeorm';

export class SignUpEvent extends DomainEvent {
    constructor(private id: string, private type: string, private user: Record<string, unknown>) {
        super('User', id.toString(), type, user, Date.now());
    }
}
