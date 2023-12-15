// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { StatusService } from './status.class'

// Main data model schema
export const statusSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Status', additionalProperties: false }
)
export type Status = Static<typeof statusSchema>
export const statusValidator = getValidator(statusSchema, dataValidator)
export const statusResolver = resolve<Status, HookContext<StatusService>>({})

export const statusExternalResolver = resolve<Status, HookContext<StatusService>>({})

// Schema for creating new entries
export const statusDataSchema = Type.Pick(statusSchema, ['name'], {
  $id: 'StatusData'
})
export type StatusData = Static<typeof statusDataSchema>
export const statusDataValidator = getValidator(statusDataSchema, dataValidator)
export const statusDataResolver = resolve<Status, HookContext<StatusService>>({})

// Schema for updating existing entries
export const statusPatchSchema = Type.Partial(statusSchema, {
  $id: 'StatusPatch'
})
export type StatusPatch = Static<typeof statusPatchSchema>
export const statusPatchValidator = getValidator(statusPatchSchema, dataValidator)
export const statusPatchResolver = resolve<Status, HookContext<StatusService>>({})

// Schema for allowed query properties
export const statusQueryProperties = Type.Pick(statusSchema, ['id', 'name'])
export const statusQuerySchema = Type.Intersect(
  [
    querySyntax(statusQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StatusQuery = Static<typeof statusQuerySchema>
export const statusQueryValidator = getValidator(statusQuerySchema, queryValidator)
export const statusQueryResolver = resolve<StatusQuery, HookContext<StatusService>>({})
