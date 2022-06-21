import {Entity, model, property, hasMany} from '@loopback/repository';
import {Role} from './role.model';

@model({
  settings : { 
    indexes: { 
      uniqueEmail: { 
        keys: { 
          email: 1, 
        }, 
        options: { 
          unique: true, 
        }, 
      }, 
    }, 
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    nullable: false,
  })
  role: string;

  @hasMany(() => Role)
  roles: Role[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
