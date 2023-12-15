// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  WebtoonsTags,
  WebtoonsTagsData,
  WebtoonsTagsPatch,
  WebtoonsTagsQuery,
  WebtoonsTagsService
} from './webtoonsTags.class'

export type { WebtoonsTags, WebtoonsTagsData, WebtoonsTagsPatch, WebtoonsTagsQuery }

export type WebtoonsTagsClientService = Pick<
  WebtoonsTagsService<Params<WebtoonsTagsQuery>>,
  (typeof webtoonsTagsMethods)[number]
>

export const webtoonsTagsPath = 'webtoonsTags'

export const webtoonsTagsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const webtoonsTagsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(webtoonsTagsPath, connection.service(webtoonsTagsPath), {
    methods: webtoonsTagsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [webtoonsTagsPath]: WebtoonsTagsClientService
  }
}
