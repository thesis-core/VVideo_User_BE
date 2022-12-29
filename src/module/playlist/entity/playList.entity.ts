import { Column } from 'typeorm';

export class PlayList {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    filmGroupId: [];

    constructor(name: string, description: string, filmGroupId: []) {
        this.name = name;
        this.description = description;
        this.filmGroupId = filmGroupId;
    }
}
