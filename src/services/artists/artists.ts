// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  artistDataValidator,
  artistPatchValidator,
  artistQueryValidator,
  artistResolver,
  artistExternalResolver,
  artistDataResolver,
  artistPatchResolver,
  artistQueryResolver
} from './artists.schema'

import type { Application } from '../../declarations'
import { ArtistService, getOptions } from './artists.class'
import { artistPath, artistMethods } from './artists.shared'

export * from './artists.class'
export * from './artists.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const artist = (app: Application) => {
  // Register our service on the Feathers application
  app.use(artistPath, new ArtistService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: artistMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(artistPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(artistExternalResolver),
        schemaHooks.resolveResult(artistResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(artistQueryValidator), schemaHooks.resolveQuery(artistQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(artistDataValidator), schemaHooks.resolveData(artistDataResolver)],
      patch: [schemaHooks.validateData(artistPatchValidator), schemaHooks.resolveData(artistPatchResolver)],
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
    [artistPath]: ArtistService
  }
}
