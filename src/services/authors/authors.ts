// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  authorDataValidator,
  authorPatchValidator,
  authorQueryValidator,
  authorResolver,
  authorExternalResolver,
  authorDataResolver,
  authorPatchResolver,
  authorQueryResolver
} from './authors.schema'

import type { Application } from '../../declarations'
import { AuthorService, getOptions } from './authors.class'
import { authorPath, authorMethods } from './authors.shared'

export * from './authors.class'
export * from './authors.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const author = (app: Application) => {
  // Register our service on the Feathers application
  app.use(authorPath, new AuthorService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: authorMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(authorPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(authorExternalResolver),
        schemaHooks.resolveResult(authorResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(authorQueryValidator), schemaHooks.resolveQuery(authorQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(authorDataValidator), schemaHooks.resolveData(authorDataResolver)],
      patch: [schemaHooks.validateData(authorPatchValidator), schemaHooks.resolveData(authorPatchResolver)],
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
    [authorPath]: AuthorService
  }
}
