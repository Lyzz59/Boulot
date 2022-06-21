import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Typology} from '../models';
import {TypologyRepository} from '../repositories';

export class TypologyController {
  constructor(
    @repository(TypologyRepository)
    public typologyRepository : TypologyRepository,
  ) {}

  @post('/typologies')
  @response(200, {
    description: 'Typology model instance',
    content: {'application/json': {schema: getModelSchemaRef(Typology)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Typology, {
            title: 'NewTypology',
            exclude: ['id'],
          }),
        },
      },
    })
    typology: Omit<Typology, 'id'>,
  ): Promise<Typology> {
    return this.typologyRepository.create(typology);
  }

  @get('/typologies/count')
  @response(200, {
    description: 'Typology model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Typology) where?: Where<Typology>,
  ): Promise<Count> {
    return this.typologyRepository.count(where);
  }

  @get('/typologies')
  @response(200, {
    description: 'Array of Typology model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Typology, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Typology) filter?: Filter<Typology>,
  ): Promise<Typology[]> {
    return this.typologyRepository.find(filter);
  }

  @patch('/typologies')
  @response(200, {
    description: 'Typology PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Typology, {partial: true}),
        },
      },
    })
    typology: Typology,
    @param.where(Typology) where?: Where<Typology>,
  ): Promise<Count> {
    return this.typologyRepository.updateAll(typology, where);
  }

  @get('/typologies/{id}')
  @response(200, {
    description: 'Typology model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Typology, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Typology, {exclude: 'where'}) filter?: FilterExcludingWhere<Typology>
  ): Promise<Typology> {
    return this.typologyRepository.findById(id, filter);
  }

  @patch('/typologies/{id}')
  @response(204, {
    description: 'Typology PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Typology, {partial: true}),
        },
      },
    })
    typology: Typology,
  ): Promise<void> {
    await this.typologyRepository.updateById(id, typology);
  }

  @put('/typologies/{id}')
  @response(204, {
    description: 'Typology PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() typology: Typology,
  ): Promise<void> {
    await this.typologyRepository.replaceById(id, typology);
  }

  @del('/typologies/{id}')
  @response(204, {
    description: 'Typology DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.typologyRepository.deleteById(id);
  }
}
