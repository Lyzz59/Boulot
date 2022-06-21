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
import {TimeTracking} from '../models';
import {TimeTrackingRepository} from '../repositories';

export class TimeTrackingController {
  constructor(
    @repository(TimeTrackingRepository)
    public timeTrackingRepository : TimeTrackingRepository,
  ) {}

  @post('/time-trackings')
  @response(200, {
    description: 'TimeTracking model instance',
    content: {'application/json': {schema: getModelSchemaRef(TimeTracking)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeTracking, {
            title: 'NewTimeTracking',
            exclude: ['id'],
          }),
        },
      },
    })
    timeTracking: Omit<TimeTracking, 'id'>,
  ): Promise<TimeTracking> {
    return this.timeTrackingRepository.create(timeTracking);
  }

  @get('/time-trackings/count')
  @response(200, {
    description: 'TimeTracking model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TimeTracking) where?: Where<TimeTracking>,
  ): Promise<Count> {
    return this.timeTrackingRepository.count(where);
  }

  @get('/time-trackings')
  @response(200, {
    description: 'Array of TimeTracking model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TimeTracking, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TimeTracking) filter?: Filter<TimeTracking>,
  ): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find(filter);
  }

  @patch('/time-trackings')
  @response(200, {
    description: 'TimeTracking PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeTracking, {partial: true}),
        },
      },
    })
    timeTracking: TimeTracking,
    @param.where(TimeTracking) where?: Where<TimeTracking>,
  ): Promise<Count> {
    return this.timeTrackingRepository.updateAll(timeTracking, where);
  }

  @get('/time-trackings/{id}')
  @response(200, {
    description: 'TimeTracking model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TimeTracking, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TimeTracking, {exclude: 'where'}) filter?: FilterExcludingWhere<TimeTracking>
  ): Promise<TimeTracking> {
    return this.timeTrackingRepository.findById(id, filter);
  }

  @patch('/time-trackings/{id}')
  @response(204, {
    description: 'TimeTracking PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeTracking, {partial: true}),
        },
      },
    })
    timeTracking: TimeTracking,
  ): Promise<void> {
    await this.timeTrackingRepository.updateById(id, timeTracking);
  }

  @put('/time-trackings/{id}')
  @response(204, {
    description: 'TimeTracking PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() timeTracking: TimeTracking,
  ): Promise<void> {
    await this.timeTrackingRepository.replaceById(id, timeTracking);
  }

  @del('/time-trackings/{id}')
  @response(204, {
    description: 'TimeTracking DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.timeTrackingRepository.deleteById(id);
  }
}
