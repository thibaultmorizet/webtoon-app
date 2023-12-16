// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  webtoonsTagsDataValidator,
  webtoonsTagsPatchValidator,
  webtoonsTagsQueryValidator,
  webtoonsTagsResolver,
  webtoonsTagsExternalResolver,
  webtoonsTagsDataResolver,
  webtoonsTagsPatchResolver,
  webtoonsTagsQueryResolver
} from './webtoonsTags.schema'

import type { Application } from '../../declarations'
import { WebtoonsTagsService, getOptions } from './webtoonsTags.class'
import { webtoonsTagsPath, webtoonsTagsMethods } from './webtoonsTags.shared'
import { webtoonTagCreateCheck } from '../../hooks/webtoonTagCreateCheck'

export * from './webtoonsTags.class'
export * from './webtoonsTags.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const webtoonsTags = (app: Application) => {
  // Register our service on the Feathers application
  app.use(webtoonsTagsPath, new WebtoonsTagsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webtoonsTagsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webtoonsTagsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(webtoonsTagsExternalResolver),
        schemaHooks.resolveResult(webtoonsTagsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(webtoonsTagsQueryValidator),
        schemaHooks.resolveQuery(webtoonsTagsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(webtoonsTagsDataValidator),
        schemaHooks.resolveData(webtoonsTagsDataResolver),
        webtoonTagCreateCheck
      ],
      patch: [
        schemaHooks.validateData(webtoonsTagsPatchValidator),
        schemaHooks.resolveData(webtoonsTagsPatchResolver)
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
    [webtoonsTagsPath]: WebtoonsTagsService
  }
}
