// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  webtoonsAuthorsDataValidator,
  webtoonsAuthorsPatchValidator,
  webtoonsAuthorsQueryValidator,
  webtoonsAuthorsResolver,
  webtoonsAuthorsExternalResolver,
  webtoonsAuthorsDataResolver,
  webtoonsAuthorsPatchResolver,
  webtoonsAuthorsQueryResolver
} from './webtoonsAuthors.schema'

import type { Application } from '../../declarations'
import { WebtoonsAuthorsService, getOptions } from './webtoonsAuthors.class'
import { webtoonsAuthorsPath, webtoonsAuthorsMethods } from './webtoonsAuthors.shared'
import { webtoonAuthorCreateCheck } from '../../hooks/webtoonAuthorCreateCheck'

export * from './webtoonsAuthors.class'
export * from './webtoonsAuthors.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const webtoonsAuthors = (app: Application) => {
  // Register our service on the Feathers application
  app.use(webtoonsAuthorsPath, new WebtoonsAuthorsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webtoonsAuthorsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webtoonsAuthorsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(webtoonsAuthorsExternalResolver),
        schemaHooks.resolveResult(webtoonsAuthorsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(webtoonsAuthorsQueryValidator),
        schemaHooks.resolveQuery(webtoonsAuthorsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(webtoonsAuthorsDataValidator),
        schemaHooks.resolveData(webtoonsAuthorsDataResolver),
        webtoonAuthorCreateCheck
      ],
      patch: [
        schemaHooks.validateData(webtoonsAuthorsPatchValidator),
        schemaHooks.resolveData(webtoonsAuthorsPatchResolver)
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
    [webtoonsAuthorsPath]: WebtoonsAuthorsService
  }
}
