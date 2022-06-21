import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TimeTracking, TimeTrackingRelations} from '../models';

export class TimeTrackingRepository extends DefaultCrudRepository<
  TimeTracking,
  typeof TimeTracking.prototype.id,
  TimeTrackingRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TimeTracking, dataSource);
  }
}
