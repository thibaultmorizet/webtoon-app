// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { tracksiteSchema } from '../tracksites/tracksites.schema'
import { userSchema } from '../users/users.schema'
import { webtoonSchema } from '../webtoons/webtoons.schema'
import type { TrackedWebtoonService } from './trackedWebtoons.class'

// Main data model schema
export const trackedWebtoonSchema = Type.Object(
  {
    id: Type.Number(),
    user_id: Type.Number(),
    user: Type.Ref(userSchema),
    webtoon_id: Type.Number(),
    webtoon: Type.Ref(webtoonSchema),
    tracksite_id: Type.Number(),
    tracksite: Type.Ref(tracksiteSchema),
    created_at: Type.String({ format: 'date' }),
    deleted_at: Type.String({ format: 'date' })
  },
  { $id: 'TrackedWebtoon', additionalProperties: false }
)
export type TrackedWebtoon = Static<typeof trackedWebtoonSchema>
export const trackedWebtoonValidator = getValidator(trackedWebtoonSchema, dataValidator)
export const trackedWebtoonResolver = resolve<TrackedWebtoon, HookContext<TrackedWebtoonService>>({
  user: virtual(async (trackedWebtoons, context) => {
    return await context.app.service('users').get(trackedWebtoons.user_id)
  }),
  webtoon: virtual(async (trackedWebtoons, context) => {
    return await context.app.service('webtoons').get(trackedWebtoons.webtoon_id)
  }),
  tracksite: virtual(async (trackedWebtoons, context) => {
    return await context.app.service('tracksites').get(trackedWebtoons.tracksite_id)
  })
})

export const trackedWebtoonExternalResolver = resolve<TrackedWebtoon, HookContext<TrackedWebtoonService>>({
  user_id: async () => undefined,
  webtoon_id: async () => undefined,
  tracksite_id: async () => undefined
})

// Schema for creating new entries
export const trackedWebtoonDataSchema = Type.Pick(
  trackedWebtoonSchema,
  ['user_id', 'webtoon_id', 'tracksite_id'],
  {
    $id: 'TrackedWebtoonData'
  }
)
export type TrackedWebtoonData = Static<typeof trackedWebtoonDataSchema>
export const trackedWebtoonDataValidator = getValidator(trackedWebtoonDataSchema, dataValidator)
export const trackedWebtoonDataResolver = resolve<TrackedWebtoon, HookContext<TrackedWebtoonService>>({
  created_at: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const trackedWebtoonPatchSchema = Type.Partial(trackedWebtoonSchema, {
  $id: 'TrackedWebtoonPatch'
})
export type TrackedWebtoonPatch = Static<typeof trackedWebtoonPatchSchema>
export const trackedWebtoonPatchValidator = getValidator(trackedWebtoonPatchSchema, dataValidator)
export const trackedWebtoonPatchResolver = resolve<TrackedWebtoon, HookContext<TrackedWebtoonService>>({})

// Schema for allowed query properties
export const trackedWebtoonQueryProperties = Type.Pick(trackedWebtoonSchema, [
  'id',
  'user_id',
  'webtoon_id',
  'tracksite_id',
  'created_at'
])
export const trackedWebtoonQuerySchema = Type.Intersect(
  [
    querySyntax(trackedWebtoonQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TrackedWebtoonQuery = Static<typeof trackedWebtoonQuerySchema>
export const trackedWebtoonQueryValidator = getValidator(trackedWebtoonQuerySchema, queryValidator)
export const trackedWebtoonQueryResolver = resolve<TrackedWebtoonQuery, HookContext<TrackedWebtoonService>>(
  {}
)
