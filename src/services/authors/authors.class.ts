// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Author, AuthorData, AuthorPatch, AuthorQuery } from './authors.schema'

export type { Author, AuthorData, AuthorPatch, AuthorQuery }

export interface AuthorParams extends KnexAdapterParams<AuthorQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class AuthorService<ServiceParams extends Params = AuthorParams> extends KnexService<
  Author,
  AuthorData,
  AuthorParams,
  AuthorPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'authors'
  }
}
