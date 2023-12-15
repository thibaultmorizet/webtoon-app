// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { StudioService } from './studios.class'

// Main data model schema
export const studioSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Studio', additionalProperties: false }
)
export type Studio = Static<typeof studioSchema>
export const studioValidator = getValidator(studioSchema, dataValidator)
export const studioResolver = resolve<Studio, HookContext<StudioService>>({})

export const studioExternalResolver = resolve<Studio, HookContext<StudioService>>({})

// Schema for creating new entries
export const studioDataSchema = Type.Pick(studioSchema, ['name'], {
  $id: 'StudioData'
})
export type StudioData = Static<typeof studioDataSchema>
export const studioDataValidator = getValidator(studioDataSchema, dataValidator)
export const studioDataResolver = resolve<Studio, HookContext<StudioService>>({})

// Schema for updating existing entries
export const studioPatchSchema = Type.Partial(studioSchema, {
  $id: 'StudioPatch'
})
export type StudioPatch = Static<typeof studioPatchSchema>
export const studioPatchValidator = getValidator(studioPatchSchema, dataValidator)
export const studioPatchResolver = resolve<Studio, HookContext<StudioService>>({})

// Schema for allowed query properties
export const studioQueryProperties = Type.Pick(studioSchema, ['id', 'name'])
export const studioQuerySchema = Type.Intersect(
  [
    querySyntax(studioQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StudioQuery = Static<typeof studioQuerySchema>
export const studioQueryValidator = getValidator(studioQuerySchema, queryValidator)
export const studioQueryResolver = resolve<StudioQuery, HookContext<StudioService>>({})
