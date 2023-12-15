// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Status, StatusData, StatusPatch, StatusQuery, StatusService } from './status.class'

export type { Status, StatusData, StatusPatch, StatusQuery }

export type StatusClientService = Pick<StatusService<Params<StatusQuery>>, (typeof statusMethods)[number]>

export const statusPath = 'status'

export const statusMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const statusClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(statusPath, connection.service(statusPath), {
    methods: statusMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [statusPath]: StatusClientService
  }
}
