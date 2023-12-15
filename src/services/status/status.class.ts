// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Status, StatusData, StatusPatch, StatusQuery } from './status.schema'

export type { Status, StatusData, StatusPatch, StatusQuery }

export interface StatusParams extends KnexAdapterParams<StatusQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class StatusService<ServiceParams extends Params = StatusParams> extends KnexService<
  Status,
  StatusData,
  StatusParams,
  StatusPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'status'
  }
}
