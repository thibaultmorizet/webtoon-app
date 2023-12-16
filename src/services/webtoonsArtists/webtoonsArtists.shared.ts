// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  WebtoonsArtists,
  WebtoonsArtistsData,
  WebtoonsArtistsPatch,
  WebtoonsArtistsQuery,
  WebtoonsArtistsService
} from './webtoonsArtists.class'

export type { WebtoonsArtists, WebtoonsArtistsData, WebtoonsArtistsPatch, WebtoonsArtistsQuery }

export type WebtoonsArtistsClientService = Pick<
  WebtoonsArtistsService<Params<WebtoonsArtistsQuery>>,
  (typeof webtoonsArtistsMethods)[number]
>

export const webtoonsArtistsPath = 'webtoonsArtists'

export const webtoonsArtistsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const webtoonsArtistsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(webtoonsArtistsPath, connection.service(webtoonsArtistsPath), {
    methods: webtoonsArtistsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [webtoonsArtistsPath]: WebtoonsArtistsClientService
  }
}
