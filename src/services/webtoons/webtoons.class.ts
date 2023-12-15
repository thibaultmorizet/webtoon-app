// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Webtoon, WebtoonData, WebtoonPatch, WebtoonQuery } from './webtoons.schema'

export type { Webtoon, WebtoonData, WebtoonPatch, WebtoonQuery }

export interface WebtoonParams extends KnexAdapterParams<WebtoonQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class WebtoonService<ServiceParams extends Params = WebtoonParams> extends KnexService<
  Webtoon,
  WebtoonData,
  WebtoonParams,
  WebtoonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'webtoons'
  }
}
