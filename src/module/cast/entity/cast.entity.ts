import { Column } from 'typeorm';

export class Cast {
    @Column()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
