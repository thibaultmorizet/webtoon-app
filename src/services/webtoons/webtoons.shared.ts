// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Webtoon, WebtoonData, WebtoonPatch, WebtoonQuery, WebtoonService } from './webtoons.class'

export type { Webtoon, WebtoonData, WebtoonPatch, WebtoonQuery }

export type WebtoonClientService = Pick<WebtoonService<Params<WebtoonQuery>>, (typeof webtoonMethods)[number]>

export const webtoonPath = 'webtoons'

export const webtoonMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const webtoonClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(webtoonPath, connection.service(webtoonPath), {
    methods: webtoonMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [webtoonPath]: WebtoonClientService
  }
}
