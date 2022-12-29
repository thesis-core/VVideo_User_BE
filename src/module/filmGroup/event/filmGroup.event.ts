import { DomainEvent } from 'nest-outbox-typeorm';

export class FilmGroupEvent extends DomainEvent {
    constructor(private id: string, private type: string, private user: Record<string, unknown>) {
        super('FilmGroup', id.toString(), type, user, Date.now());
    }
}
