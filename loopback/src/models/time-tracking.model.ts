import {Entity, model, property} from '@loopback/repository';

@model()
export class TimeTracking extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  time_minuts: number;


  constructor(data?: Partial<TimeTracking>) {
    super(data);
  }
}

export interface TimeTrackingRelations {
  // describe navigational properties here
}

export type TimeTrackingWithRelations = TimeTracking & TimeTrackingRelations;
