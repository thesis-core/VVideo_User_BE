import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { MongoBaseEntity } from 'nest-outbox-typeorm';

@Entity({
    name: 'setting_film',
})
export class ConfigSetting extends MongoBaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    @Expose()
    configSettingId: string;

    @Column()
    @Expose()
    key: string;

    @Column()
    @Expose()
    value: string;
}
