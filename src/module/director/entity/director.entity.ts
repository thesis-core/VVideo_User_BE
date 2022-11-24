import { Column } from 'typeorm';

export class Director {
    @Column()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
