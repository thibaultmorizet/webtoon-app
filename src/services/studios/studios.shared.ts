// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Studio, StudioData, StudioPatch, StudioQuery, StudioService } from './studios.class'

export type { Studio, StudioData, StudioPatch, StudioQuery }

export type StudioClientService = Pick<StudioService<Params<StudioQuery>>, (typeof studioMethods)[number]>

export const studioPath = 'studios'

export const studioMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const studioClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(studioPath, connection.service(studioPath), {
    methods: studioMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [studioPath]: StudioClientService
  }
}
