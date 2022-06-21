import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Role} from '../models';
import {RoleRepository} from './role.repository';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly roles: HasManyRepositoryFactory<Role, typeof User.prototype.id>;
  role: any;

  userCredentials(id: number | undefined) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<Role | undefined> {
    try {
      return await this.role(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
