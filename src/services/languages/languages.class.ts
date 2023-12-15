// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Language, LanguageData, LanguagePatch, LanguageQuery } from './languages.schema'

export type { Language, LanguageData, LanguagePatch, LanguageQuery }

export interface LanguageParams extends KnexAdapterParams<LanguageQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LanguageService<ServiceParams extends Params = LanguageParams> extends KnexService<
  Language,
  LanguageData,
  LanguageParams,
  LanguagePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'languages'
  }
}
