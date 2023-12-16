// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  WebtoonsCategories,
  WebtoonsCategoriesData,
  WebtoonsCategoriesPatch,
  WebtoonsCategoriesQuery,
  WebtoonsCategoriesService
} from './webtoonsCategories.class'

export type { WebtoonsCategories, WebtoonsCategoriesData, WebtoonsCategoriesPatch, WebtoonsCategoriesQuery }

export type WebtoonsCategoriesClientService = Pick<
  WebtoonsCategoriesService<Params<WebtoonsCategoriesQuery>>,
  (typeof webtoonsCategoriesMethods)[number]
>

export const webtoonsCategoriesPath = 'webtoonsCategories'

export const webtoonsCategoriesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const webtoonsCategoriesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(webtoonsCategoriesPath, connection.service(webtoonsCategoriesPath), {
    methods: webtoonsCategoriesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [webtoonsCategoriesPath]: WebtoonsCategoriesClientService
  }
}
