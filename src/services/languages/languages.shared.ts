// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Language, LanguageData, LanguagePatch, LanguageQuery, LanguageService } from './languages.class'

export type { Language, LanguageData, LanguagePatch, LanguageQuery }

export type LanguageClientService = Pick<
  LanguageService<Params<LanguageQuery>>,
  (typeof languageMethods)[number]
>

export const languagePath = 'languages'

export const languageMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const

export const languageClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(languagePath, connection.service(languagePath), {
    methods: languageMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [languagePath]: LanguageClientService
  }
}
