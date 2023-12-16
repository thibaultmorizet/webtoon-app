// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WebtoonsArtistsService } from './webtoonsArtists.class'

// Main data model schema
export const webtoonsArtistsSchema = Type.Object(
  {
    id: Type.Number(),
    webtoon_id: Type.Number(),
    artist_id: Type.Number()
  },
  { $id: 'WebtoonsArtists', additionalProperties: false }
)
export type WebtoonsArtists = Static<typeof webtoonsArtistsSchema>
export const webtoonsArtistsValidator = getValidator(webtoonsArtistsSchema, dataValidator)
export const webtoonsArtistsResolver = resolve<WebtoonsArtists, HookContext<WebtoonsArtistsService>>({})

export const webtoonsArtistsExternalResolver = resolve<WebtoonsArtists, HookContext<WebtoonsArtistsService>>(
  {}
)

// Schema for creating new entries
export const webtoonsArtistsDataSchema = Type.Pick(webtoonsArtistsSchema, ['webtoon_id', 'artist_id'], {
  $id: 'WebtoonsArtistsData'
})
export type WebtoonsArtistsData = Static<typeof webtoonsArtistsDataSchema>
export const webtoonsArtistsDataValidator = getValidator(webtoonsArtistsDataSchema, dataValidator)
export const webtoonsArtistsDataResolver = resolve<WebtoonsArtists, HookContext<WebtoonsArtistsService>>({})

// Schema for updating existing entries
export const webtoonsArtistsPatchSchema = Type.Partial(webtoonsArtistsSchema, {
  $id: 'WebtoonsArtistsPatch'
})
export type WebtoonsArtistsPatch = Static<typeof webtoonsArtistsPatchSchema>
export const webtoonsArtistsPatchValidator = getValidator(webtoonsArtistsPatchSchema, dataValidator)
export const webtoonsArtistsPatchResolver = resolve<WebtoonsArtists, HookContext<WebtoonsArtistsService>>({})

// Schema for allowed query properties
export const webtoonsArtistsQueryProperties = Type.Pick(webtoonsArtistsSchema, ['id', 'webtoon_id', 'artist_id'])
export const webtoonsArtistsQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonsArtistsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonsArtistsQuery = Static<typeof webtoonsArtistsQuerySchema>
export const webtoonsArtistsQueryValidator = getValidator(webtoonsArtistsQuerySchema, queryValidator)
export const webtoonsArtistsQueryResolver = resolve<
  WebtoonsArtistsQuery,
  HookContext<WebtoonsArtistsService>
>({})
