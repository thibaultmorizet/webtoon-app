// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Episode, EpisodeData, EpisodePatch, EpisodeQuery } from './episodes.schema'

export type { Episode, EpisodeData, EpisodePatch, EpisodeQuery }

export interface EpisodeParams extends KnexAdapterParams<EpisodeQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class EpisodeService<ServiceParams extends Params = EpisodeParams> extends KnexService<
  Episode,
  EpisodeData,
  EpisodeParams,
  EpisodePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'episodes'
  }
}
