// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Author, AuthorData, AuthorPatch, AuthorQuery, AuthorService } from './authors.class'

export type { Author, AuthorData, AuthorPatch, AuthorQuery }

export type AuthorClientService = Pick<AuthorService<Params<AuthorQuery>>, (typeof authorMethods)[number]>

export const authorPath = 'authors'

export const authorMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const authorClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(authorPath, connection.service(authorPath), {
    methods: authorMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [authorPath]: AuthorClientService
  }
}
