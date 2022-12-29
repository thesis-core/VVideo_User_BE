import { DomainEvent } from 'nest-outbox-typeorm';

export class ShortVideoEvent extends DomainEvent {
    constructor(private id: string, private type: string, private shortVideo: Record<string, unknown>) {
        super('ShortVideo', id.toString(), type, shortVideo, Date.now());
    }
}
