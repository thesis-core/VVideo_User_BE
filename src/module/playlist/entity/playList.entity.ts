import { AfterLoad, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export enum PlayListType {
    FilmGroup,
    ShortVideo,
}

@Entity()
export class PlayList {
    @ObjectIdColumn()
    _id: ObjectID | string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    filmGroupId: any[];

    @Column()
    userId: string;

    @Column()
    type: PlayListType;

    @AfterLoad()
    async convertId() {
        this._id = this._id.toString();
    }
}
