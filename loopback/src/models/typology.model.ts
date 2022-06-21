import {Entity, model, property} from '@loopback/repository';

@model()
export class Typology extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Typology>) {
    super(data);
  }
}

export interface TypologyRelations {
  // describe navigational properties here
}

export type TypologyWithRelations = Typology & TypologyRelations;
