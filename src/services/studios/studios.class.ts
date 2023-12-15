// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Studio, StudioData, StudioPatch, StudioQuery } from './studios.schema'

export type { Studio, StudioData, StudioPatch, StudioQuery }

export interface StudioParams extends KnexAdapterParams<StudioQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class StudioService<ServiceParams extends Params = StudioParams> extends KnexService<
  Studio,
  StudioData,
  StudioParams,
  StudioPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'studios'
  }
}
