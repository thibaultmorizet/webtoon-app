// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WebtoonService } from './webtoons.class'
import { studioSchema } from '../studios/studios.schema'

// Main data model schema
export const webtoonSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    description: Type.String(),
    poster: Type.String(),
    release_date: Type.String({ format: 'date' }),
    studio_id: Type.Number(),
    studio: Type.Ref(studioSchema),
    language_id: Type.Number(),
    status_id: Type.Number(),

    created_at: Type.String({ format: 'date' }),
    updated_at: Type.String({ format: 'date' }),
    deleted_at: Type.String({ format: 'date' })
  },
  { $id: 'Webtoon', additionalProperties: false }
)
export type Webtoon = Static<typeof webtoonSchema>
export const webtoonValidator = getValidator(webtoonSchema, dataValidator)
export const webtoonResolver = resolve<Webtoon, HookContext<WebtoonService>>({})

export const webtoonExternalResolver = resolve<Webtoon, HookContext<WebtoonService>>({})

// Schema for creating new entries
export const webtoonDataSchema = Type.Pick(
  webtoonSchema,
  [
    'title',
    'description',
    'poster',
    'release_date',
    'studio_id',
    'language_id',
    'status_id',
    'created_at',
    'updated_at',
    'deleted_at'
  ],
  {
    $id: 'WebtoonData'
  }
)
export type WebtoonData = Static<typeof webtoonDataSchema>
export const webtoonDataValidator = getValidator(webtoonDataSchema, dataValidator)
export const webtoonDataResolver = resolve<Webtoon, HookContext<WebtoonService>>({})

// Schema for updating existing entries
export const webtoonPatchSchema = Type.Partial(webtoonSchema, {
  $id: 'WebtoonPatch'
})
export type WebtoonPatch = Static<typeof webtoonPatchSchema>
export const webtoonPatchValidator = getValidator(webtoonPatchSchema, dataValidator)
export const webtoonPatchResolver = resolve<Webtoon, HookContext<WebtoonService>>({})

// Schema for allowed query properties
export const webtoonQueryProperties = Type.Pick(webtoonSchema, [
  'id',
  'title',
  'description',
  'poster',
  'release_date',
  'studio_id',
  'language_id',
  'status_id',
  'created_at',
  'updated_at',
  'deleted_at'
])
export const webtoonQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonQuery = Static<typeof webtoonQuerySchema>
export const webtoonQueryValidator = getValidator(webtoonQuerySchema, queryValidator)
export const webtoonQueryResolver = resolve<WebtoonQuery, HookContext<WebtoonService>>({})
