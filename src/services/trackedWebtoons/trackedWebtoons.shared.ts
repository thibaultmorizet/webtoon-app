// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TrackedWebtoon,
  TrackedWebtoonData,
  TrackedWebtoonPatch,
  TrackedWebtoonQuery,
  TrackedWebtoonService
} from './trackedWebtoons.class'

export type { TrackedWebtoon, TrackedWebtoonData, TrackedWebtoonPatch, TrackedWebtoonQuery }

export type TrackedWebtoonClientService = Pick<
  TrackedWebtoonService<Params<TrackedWebtoonQuery>>,
  (typeof trackedWebtoonMethods)[number]
>

export const trackedWebtoonPath = 'trackedWebtoons'

export const trackedWebtoonMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const trackedWebtoonClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(trackedWebtoonPath, connection.service(trackedWebtoonPath), {
    methods: trackedWebtoonMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [trackedWebtoonPath]: TrackedWebtoonClientService
  }
}
