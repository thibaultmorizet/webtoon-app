// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Episode, EpisodeData, EpisodePatch, EpisodeQuery, EpisodeService } from './episodes.class'

export type { Episode, EpisodeData, EpisodePatch, EpisodeQuery }

export type EpisodeClientService = Pick<EpisodeService<Params<EpisodeQuery>>, (typeof episodeMethods)[number]>

export const episodePath = 'episodes'

export const episodeMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const episodeClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(episodePath, connection.service(episodePath), {
    methods: episodeMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [episodePath]: EpisodeClientService
  }
}
