import { ObjectId, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  emailVerified: boolean;

  @Column()
  name: string;

  @Column()
  authId: string;
}
