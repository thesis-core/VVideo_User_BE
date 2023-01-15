import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PlayList {
    @ObjectIdColumn()
    _id: ObjectID;

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
}
