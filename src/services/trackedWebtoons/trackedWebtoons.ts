// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  trackedWebtoonDataResolver,
  trackedWebtoonDataValidator,
  trackedWebtoonExternalResolver,
  trackedWebtoonPatchResolver,
  trackedWebtoonPatchValidator,
  trackedWebtoonQueryResolver,
  trackedWebtoonQueryValidator,
  trackedWebtoonResolver
} from './trackedWebtoons.schema'

import type { Application } from '../../declarations'
import { trackedWebtoonCreateCheck } from '../../hooks/trackedWebtoonCreateCheck'
import { TrackedWebtoonService, getOptions } from './trackedWebtoons.class'
import { trackedWebtoonMethods, trackedWebtoonPath } from './trackedWebtoons.shared'

export * from './trackedWebtoons.class'
export * from './trackedWebtoons.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const trackedWebtoon = (app: Application) => {
  // Register our service on the Feathers application
  app.use(trackedWebtoonPath, new TrackedWebtoonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: trackedWebtoonMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(trackedWebtoonPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(trackedWebtoonExternalResolver),
        schemaHooks.resolveResult(trackedWebtoonResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(trackedWebtoonQueryValidator),
        schemaHooks.resolveQuery(trackedWebtoonQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(trackedWebtoonDataValidator),
        schemaHooks.resolveData(trackedWebtoonDataResolver),
        trackedWebtoonCreateCheck
      ],
      patch: [
        schemaHooks.validateData(trackedWebtoonPatchValidator),
        schemaHooks.resolveData(trackedWebtoonPatchResolver)
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
    [trackedWebtoonPath]: TrackedWebtoonService
  }
}
