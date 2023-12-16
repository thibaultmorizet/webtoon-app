// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Tracksite, TracksiteData, TracksitePatch, TracksiteQuery } from './tracksites.schema'

export type { Tracksite, TracksiteData, TracksitePatch, TracksiteQuery }

export interface TracksiteParams extends KnexAdapterParams<TracksiteQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TracksiteService<ServiceParams extends Params = TracksiteParams> extends KnexService<
  Tracksite,
  TracksiteData,
  TracksiteParams,
  TracksitePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'tracksites'
  }
}
