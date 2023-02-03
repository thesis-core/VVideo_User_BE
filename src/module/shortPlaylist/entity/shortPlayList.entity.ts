import { AfterLoad, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class ShortPlayList {
    @ObjectIdColumn()
    _id: ObjectID | string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    shortVideoId: any[];

    @Column()
    userId: string;

    @AfterLoad()
    async convertId() {
        this._id = this._id.toString();
    }
}
