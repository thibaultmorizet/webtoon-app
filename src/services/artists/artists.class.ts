// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Artist, ArtistData, ArtistPatch, ArtistQuery } from './artists.schema'

export type { Artist, ArtistData, ArtistPatch, ArtistQuery }

export interface ArtistParams extends KnexAdapterParams<ArtistQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ArtistService<ServiceParams extends Params = ArtistParams> extends KnexService<
  Artist,
  ArtistData,
  ArtistParams,
  ArtistPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'artists'
  }
}
