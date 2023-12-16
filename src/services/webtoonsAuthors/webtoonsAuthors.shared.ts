// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  WebtoonsAuthors,
  WebtoonsAuthorsData,
  WebtoonsAuthorsPatch,
  WebtoonsAuthorsQuery,
  WebtoonsAuthorsService
} from './webtoonsAuthors.class'

export type { WebtoonsAuthors, WebtoonsAuthorsData, WebtoonsAuthorsPatch, WebtoonsAuthorsQuery }

export type WebtoonsAuthorsClientService = Pick<
  WebtoonsAuthorsService<Params<WebtoonsAuthorsQuery>>,
  (typeof webtoonsAuthorsMethods)[number]
>

export const webtoonsAuthorsPath = 'webtoonsAuthors'

export const webtoonsAuthorsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const webtoonsAuthorsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(webtoonsAuthorsPath, connection.service(webtoonsAuthorsPath), {
    methods: webtoonsAuthorsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [webtoonsAuthorsPath]: WebtoonsAuthorsClientService
  }
}
