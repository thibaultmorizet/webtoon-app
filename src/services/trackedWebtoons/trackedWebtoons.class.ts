// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  TrackedWebtoon,
  TrackedWebtoonData,
  TrackedWebtoonPatch,
  TrackedWebtoonQuery
} from './trackedWebtoons.schema'

export type { TrackedWebtoon, TrackedWebtoonData, TrackedWebtoonPatch, TrackedWebtoonQuery }

export interface TrackedWebtoonParams extends KnexAdapterParams<TrackedWebtoonQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TrackedWebtoonService<ServiceParams extends Params = TrackedWebtoonParams> extends KnexService<
  TrackedWebtoon,
  TrackedWebtoonData,
  TrackedWebtoonParams,
  TrackedWebtoonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'tracked-webtoons'
  }
}
