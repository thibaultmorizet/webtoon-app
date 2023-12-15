// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  webtoonDataValidator,
  webtoonPatchValidator,
  webtoonQueryValidator,
  webtoonResolver,
  webtoonExternalResolver,
  webtoonDataResolver,
  webtoonPatchResolver,
  webtoonQueryResolver
} from './webtoons.schema'

import type { Application } from '../../declarations'
import { WebtoonService, getOptions } from './webtoons.class'
import { webtoonPath, webtoonMethods } from './webtoons.shared'
import { webtoonCreateCheck } from '../../hooks/webtoonCreateCheck'

export * from './webtoons.class'
export * from './webtoons.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const webtoon = (app: Application) => {
  // Register our service on the Feathers application
  app.use(webtoonPath, new WebtoonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: webtoonMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(webtoonPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(webtoonExternalResolver),
        schemaHooks.resolveResult(webtoonResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(webtoonQueryValidator), schemaHooks.resolveQuery(webtoonQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(webtoonDataValidator), schemaHooks.resolveData(webtoonDataResolver), webtoonCreateCheck],
      patch: [schemaHooks.validateData(webtoonPatchValidator), schemaHooks.resolveData(webtoonPatchResolver)],
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
    [webtoonPath]: WebtoonService
  }
}
