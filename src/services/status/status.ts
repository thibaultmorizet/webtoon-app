// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  statusDataValidator,
  statusPatchValidator,
  statusQueryValidator,
  statusResolver,
  statusExternalResolver,
  statusDataResolver,
  statusPatchResolver,
  statusQueryResolver
} from './status.schema'

import type { Application } from '../../declarations'
import { StatusService, getOptions } from './status.class'
import { statusPath, statusMethods } from './status.shared'

export * from './status.class'
export * from './status.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const status = (app: Application) => {
  // Register our service on the Feathers application
  app.use(statusPath, new StatusService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: statusMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(statusPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(statusExternalResolver),
        schemaHooks.resolveResult(statusResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(statusQueryValidator), schemaHooks.resolveQuery(statusQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(statusDataValidator), schemaHooks.resolveData(statusDataResolver)],
      patch: [schemaHooks.validateData(statusPatchValidator), schemaHooks.resolveData(statusPatchResolver)],
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
    [statusPath]: StatusService
  }
}
