// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EpisodeService } from './episodes.class'

// Main data model schema
export const episodeSchema = Type.Object(
  {
    id: Type.Number(),
    number: Type.Number(),
    title: Type.String(),
    release_date: Type.String({ format: 'date' }),
    webtoon_id: Type.Number()
  },
  { $id: 'Episode', additionalProperties: false }
)
export type Episode = Static<typeof episodeSchema>
export const episodeValidator = getValidator(episodeSchema, dataValidator)
export const episodeResolver = resolve<Episode, HookContext<EpisodeService>>({})

export const episodeExternalResolver = resolve<Episode, HookContext<EpisodeService>>({})

// Schema for creating new entries
export const episodeDataSchema = Type.Pick(episodeSchema, ['number', 'title', 'release_date', 'webtoon_id'], {
  $id: 'EpisodeData'
})
export type EpisodeData = Static<typeof episodeDataSchema>
export const episodeDataValidator = getValidator(episodeDataSchema, dataValidator)
export const episodeDataResolver = resolve<Episode, HookContext<EpisodeService>>({})

// Schema for updating existing entries
export const episodePatchSchema = Type.Partial(episodeSchema, {
  $id: 'EpisodePatch'
})
export type EpisodePatch = Static<typeof episodePatchSchema>
export const episodePatchValidator = getValidator(episodePatchSchema, dataValidator)
export const episodePatchResolver = resolve<Episode, HookContext<EpisodeService>>({})

// Schema for allowed query properties
export const episodeQueryProperties = Type.Pick(episodeSchema, [
  'id',
  'number',
  'title',
  'release_date',
  'webtoon_id'
])
export const episodeQuerySchema = Type.Intersect(
  [
    querySyntax(episodeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EpisodeQuery = Static<typeof episodeQuerySchema>
export const episodeQueryValidator = getValidator(episodeQuerySchema, queryValidator)
export const episodeQueryResolver = resolve<EpisodeQuery, HookContext<EpisodeService>>({})
