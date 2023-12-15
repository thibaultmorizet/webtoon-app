// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ArtistService } from './artists.class'

// Main data model schema
export const artistSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Artist', additionalProperties: false }
)
export type Artist = Static<typeof artistSchema>
export const artistValidator = getValidator(artistSchema, dataValidator)
export const artistResolver = resolve<Artist, HookContext<ArtistService>>({})

export const artistExternalResolver = resolve<Artist, HookContext<ArtistService>>({})

// Schema for creating new entries
export const artistDataSchema = Type.Pick(artistSchema, ['name'], {
  $id: 'ArtistData'
})
export type ArtistData = Static<typeof artistDataSchema>
export const artistDataValidator = getValidator(artistDataSchema, dataValidator)
export const artistDataResolver = resolve<Artist, HookContext<ArtistService>>({})

// Schema for updating existing entries
export const artistPatchSchema = Type.Partial(artistSchema, {
  $id: 'ArtistPatch'
})
export type ArtistPatch = Static<typeof artistPatchSchema>
export const artistPatchValidator = getValidator(artistPatchSchema, dataValidator)
export const artistPatchResolver = resolve<Artist, HookContext<ArtistService>>({})

// Schema for allowed query properties
export const artistQueryProperties = Type.Pick(artistSchema, ['id', 'name'])
export const artistQuerySchema = Type.Intersect(
  [
    querySyntax(artistQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ArtistQuery = Static<typeof artistQuerySchema>
export const artistQueryValidator = getValidator(artistQuerySchema, queryValidator)
export const artistQueryResolver = resolve<ArtistQuery, HookContext<ArtistService>>({})
