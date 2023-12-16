// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  WebtoonsAuthors,
  WebtoonsAuthorsData,
  WebtoonsAuthorsPatch,
  WebtoonsAuthorsQuery
} from './webtoonsAuthors.schema'

export type { WebtoonsAuthors, WebtoonsAuthorsData, WebtoonsAuthorsPatch, WebtoonsAuthorsQuery }

export interface WebtoonsAuthorsParams extends KnexAdapterParams<WebtoonsAuthorsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class WebtoonsAuthorsService<ServiceParams extends Params = WebtoonsAuthorsParams> extends KnexService<
  WebtoonsAuthors,
  WebtoonsAuthorsData,
  WebtoonsAuthorsParams,
  WebtoonsAuthorsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'webtoons-authors'
  }
}
