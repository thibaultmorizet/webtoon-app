// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  languageDataValidator,
  languagePatchValidator,
  languageQueryValidator,
  languageResolver,
  languageExternalResolver,
  languageDataResolver,
  languagePatchResolver,
  languageQueryResolver
} from './languages.schema'

import type { Application } from '../../declarations'
import { LanguageService, getOptions } from './languages.class'
import { languagePath, languageMethods } from './languages.shared'

export * from './languages.class'
export * from './languages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const language = (app: Application) => {
  // Register our service on the Feathers application
  app.use(languagePath, new LanguageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: languageMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(languagePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(languageExternalResolver),
        schemaHooks.resolveResult(languageResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(languageQueryValidator),
        schemaHooks.resolveQuery(languageQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(languageDataValidator),
        schemaHooks.resolveData(languageDataResolver)
      ],
      patch: [
        schemaHooks.validateData(languagePatchValidator),
        schemaHooks.resolveData(languagePatchResolver)
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
    [languagePath]: LanguageService
  }
}
