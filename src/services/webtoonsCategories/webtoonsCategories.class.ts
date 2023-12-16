// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  WebtoonsCategories,
  WebtoonsCategoriesData,
  WebtoonsCategoriesPatch,
  WebtoonsCategoriesQuery
} from './webtoonsCategories.schema'

export type { WebtoonsCategories, WebtoonsCategoriesData, WebtoonsCategoriesPatch, WebtoonsCategoriesQuery }

export interface WebtoonsCategoriesParams extends KnexAdapterParams<WebtoonsCategoriesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class WebtoonsCategoriesService<
  ServiceParams extends Params = WebtoonsCategoriesParams
> extends KnexService<
  WebtoonsCategories,
  WebtoonsCategoriesData,
  WebtoonsCategoriesParams,
  WebtoonsCategoriesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'webtoons-categories'
  }
}
