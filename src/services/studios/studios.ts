// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  studioDataValidator,
  studioPatchValidator,
  studioQueryValidator,
  studioResolver,
  studioExternalResolver,
  studioDataResolver,
  studioPatchResolver,
  studioQueryResolver
} from './studios.schema'

import type { Application } from '../../declarations'
import { StudioService, getOptions } from './studios.class'
import { studioPath, studioMethods } from './studios.shared'

export * from './studios.class'
export * from './studios.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const studio = (app: Application) => {
  // Register our service on the Feathers application
  app.use(studioPath, new StudioService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: studioMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(studioPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(studioExternalResolver),
        schemaHooks.resolveResult(studioResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(studioQueryValidator), schemaHooks.resolveQuery(studioQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(studioDataValidator), schemaHooks.resolveData(studioDataResolver)],
      patch: [schemaHooks.validateData(studioPatchValidator), schemaHooks.resolveData(studioPatchResolver)],
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
    [studioPath]: StudioService
  }
}
