// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  webtoonsArtistsDataValidator,
  webtoonsArtistsPatchValidator,
  webtoonsArtistsQueryValidator,
  webtoonsArtistsResolver,
  webtoonsArtistsExternalResolver,
  webtoonsArtistsDataResolver,
  webtoonsArtistsPatchResolver,
  webtoonsArtistsQueryResolver
} from './webtoonsArtists.schema'

import type { Application } from '../../declarations'
import { WebtoonsArtistsService, getOptions } from './webtoonsArtists.class'
import { webtoonsArtistsPath, webtoonsArtistsMethods } from './webtoonsArtists.shared'
import { webtoonArtistCreateCheck } from '../../hooks/webtoonArtistCreateCheck'

export * from './webtoonsArtists.class'
export * from './webtoonsArtists.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const webtoonsArtists = (app: Application) => {
  // Register our service on the Feathers application
  app.use(webtoonsArtistsPath, new WebtoonsArtistsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webtoonsArtistsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webtoonsArtistsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(webtoonsArtistsExternalResolver),
        schemaHooks.resolveResult(webtoonsArtistsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(webtoonsArtistsQueryValidator),
        schemaHooks.resolveQuery(webtoonsArtistsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(webtoonsArtistsDataValidator),
        schemaHooks.resolveData(webtoonsArtistsDataResolver),
        webtoonArtistCreateCheck
      ],
      patch: [
        schemaHooks.validateData(webtoonsArtistsPatchValidator),
        schemaHooks.resolveData(webtoonsArtistsPatchResolver)
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
    [webtoonsArtistsPath]: WebtoonsArtistsService
  }
}
