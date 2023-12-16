// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  episodeDataResolver,
  episodeDataValidator,
  episodeExternalResolver,
  episodePatchResolver,
  episodePatchValidator,
  episodeQueryResolver,
  episodeQueryValidator,
  episodeResolver
} from './episodes.schema'

import type { Application } from '../../declarations'
import { episodeCreateCheck } from '../../hooks/episodeCreateCheck'
import { EpisodeService, getOptions } from './episodes.class'
import { episodeMethods, episodePath } from './episodes.shared'

export * from './episodes.class'
export * from './episodes.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const episode = (app: Application) => {
  // Register our service on the Feathers application
  app.use(episodePath, new EpisodeService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: episodeMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(episodePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(episodeExternalResolver),
        schemaHooks.resolveResult(episodeResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(episodeQueryValidator), schemaHooks.resolveQuery(episodeQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(episodeDataValidator),
        schemaHooks.resolveData(episodeDataResolver),
        episodeCreateCheck
      ],
      patch: [schemaHooks.validateData(episodePatchValidator), schemaHooks.resolveData(episodePatchResolver)],
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
    [episodePath]: EpisodeService
  }
}
