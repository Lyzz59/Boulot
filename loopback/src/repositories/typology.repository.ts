import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Typology, TypologyRelations} from '../models';

export class TypologyRepository extends DefaultCrudRepository<
  Typology,
  typeof Typology.prototype.id,
  TypologyRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Typology, dataSource);
  }
}
