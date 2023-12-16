// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  webtoonsCategoriesDataValidator,
  webtoonsCategoriesPatchValidator,
  webtoonsCategoriesQueryValidator,
  webtoonsCategoriesResolver,
  webtoonsCategoriesExternalResolver,
  webtoonsCategoriesDataResolver,
  webtoonsCategoriesPatchResolver,
  webtoonsCategoriesQueryResolver
} from './webtoonsCategories.schema'

import type { Application } from '../../declarations'
import { WebtoonsCategoriesService, getOptions } from './webtoonsCategories.class'
import { webtoonsCategoriesPath, webtoonsCategoriesMethods } from './webtoonsCategories.shared'
import { webtoonCategoryCreateCheck } from '../../hooks/webtoonCategoryCreateCheck'

export * from './webtoonsCategories.class'
export * from './webtoonsCategories.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const webtoonsCategories = (app: Application) => {
  // Register our service on the Feathers application
  app.use(webtoonsCategoriesPath, new WebtoonsCategoriesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webtoonsCategoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webtoonsCategoriesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(webtoonsCategoriesExternalResolver),
        schemaHooks.resolveResult(webtoonsCategoriesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(webtoonsCategoriesQueryValidator),
        schemaHooks.resolveQuery(webtoonsCategoriesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(webtoonsCategoriesDataValidator),
        schemaHooks.resolveData(webtoonsCategoriesDataResolver),
        webtoonCategoryCreateCheck
      ],
      patch: [
        schemaHooks.validateData(webtoonsCategoriesPatchValidator),
        schemaHooks.resolveData(webtoonsCategoriesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [webtoonsCategoriesPath]: WebtoonsCategoriesService
  }
}
