// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tracksiteDataValidator,
  tracksitePatchValidator,
  tracksiteQueryValidator,
  tracksiteResolver,
  tracksiteExternalResolver,
  tracksiteDataResolver,
  tracksitePatchResolver,
  tracksiteQueryResolver
} from './tracksites.schema'

import type { Application } from '../../declarations'
import { TracksiteService, getOptions } from './tracksites.class'
import { tracksitePath, tracksiteMethods } from './tracksites.shared'

export * from './tracksites.class'
export * from './tracksites.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tracksite = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tracksitePath, new TracksiteService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tracksiteMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tracksitePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(tracksiteExternalResolver),
        schemaHooks.resolveResult(tracksiteResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(tracksiteQueryValidator),
        schemaHooks.resolveQuery(tracksiteQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tracksiteDataValidator),
        schemaHooks.resolveData(tracksiteDataResolver)
      ],
      patch: [
        schemaHooks.validateData(tracksitePatchValidator),
        schemaHooks.resolveData(tracksitePatchResolver)
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
    [tracksitePath]: TracksiteService
  }
}
