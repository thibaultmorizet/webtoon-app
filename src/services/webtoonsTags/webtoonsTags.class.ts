// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  WebtoonsTags,
  WebtoonsTagsData,
  WebtoonsTagsPatch,
  WebtoonsTagsQuery
} from './webtoonsTags.schema'

export type { WebtoonsTags, WebtoonsTagsData, WebtoonsTagsPatch, WebtoonsTagsQuery }

export interface WebtoonsTagsParams extends KnexAdapterParams<WebtoonsTagsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class WebtoonsTagsService<ServiceParams extends Params = WebtoonsTagsParams> extends KnexService<
  WebtoonsTags,
  WebtoonsTagsData,
  WebtoonsTagsParams,
  WebtoonsTagsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'webtoons-tags'
  }
}
