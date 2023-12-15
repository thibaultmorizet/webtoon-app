// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Artist, ArtistData, ArtistPatch, ArtistQuery, ArtistService } from './artists.class'

export type { Artist, ArtistData, ArtistPatch, ArtistQuery }

export type ArtistClientService = Pick<ArtistService<Params<ArtistQuery>>, (typeof artistMethods)[number]>

export const artistPath = 'artists'

export const artistMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const artistClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(artistPath, connection.service(artistPath), {
    methods: artistMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [artistPath]: ArtistClientService
  }
}
