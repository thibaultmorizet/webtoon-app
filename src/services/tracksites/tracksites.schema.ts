// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TracksiteService } from './tracksites.class'

// Main data model schema
export const tracksiteSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    url: Type.String()
  },
  { $id: 'Tracksite', additionalProperties: false }
)
export type Tracksite = Static<typeof tracksiteSchema>
export const tracksiteValidator = getValidator(tracksiteSchema, dataValidator)
export const tracksiteResolver = resolve<Tracksite, HookContext<TracksiteService>>({})

export const tracksiteExternalResolver = resolve<Tracksite, HookContext<TracksiteService>>({})

// Schema for creating new entries
export const tracksiteDataSchema = Type.Pick(tracksiteSchema, ['name', 'url'], {
  $id: 'TracksiteData'
})
export type TracksiteData = Static<typeof tracksiteDataSchema>
export const tracksiteDataValidator = getValidator(tracksiteDataSchema, dataValidator)
export const tracksiteDataResolver = resolve<Tracksite, HookContext<TracksiteService>>({})

// Schema for updating existing entries
export const tracksitePatchSchema = Type.Partial(tracksiteSchema, {
  $id: 'TracksitePatch'
})
export type TracksitePatch = Static<typeof tracksitePatchSchema>
export const tracksitePatchValidator = getValidator(tracksitePatchSchema, dataValidator)
export const tracksitePatchResolver = resolve<Tracksite, HookContext<TracksiteService>>({})

// Schema for allowed query properties
export const tracksiteQueryProperties = Type.Pick(tracksiteSchema, ['id', 'name', 'url'])
export const tracksiteQuerySchema = Type.Intersect(
  [
    querySyntax(tracksiteQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TracksiteQuery = Static<typeof tracksiteQuerySchema>
export const tracksiteQueryValidator = getValidator(tracksiteQuerySchema, queryValidator)
export const tracksiteQueryResolver = resolve<TracksiteQuery, HookContext<TracksiteService>>({})
