// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Tracksite,
  TracksiteData,
  TracksitePatch,
  TracksiteQuery,
  TracksiteService
} from './tracksites.class'

export type { Tracksite, TracksiteData, TracksitePatch, TracksiteQuery }

export type TracksiteClientService = Pick<
  TracksiteService<Params<TracksiteQuery>>,
  (typeof tracksiteMethods)[number]
>

export const tracksitePath = 'tracksites'

export const tracksiteMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tracksiteClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tracksitePath, connection.service(tracksitePath), {
    methods: tracksiteMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [tracksitePath]: TracksiteClientService
  }
}
