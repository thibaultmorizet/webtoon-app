// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AuthorService } from './authors.class'

// Main data model schema
export const authorSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Author', additionalProperties: false }
)
export type Author = Static<typeof authorSchema>
export const authorValidator = getValidator(authorSchema, dataValidator)
export const authorResolver = resolve<Author, HookContext<AuthorService>>({})

export const authorExternalResolver = resolve<Author, HookContext<AuthorService>>({})

// Schema for creating new entries
export const authorDataSchema = Type.Pick(authorSchema, ['name'], {
  $id: 'AuthorData'
})
export type AuthorData = Static<typeof authorDataSchema>
export const authorDataValidator = getValidator(authorDataSchema, dataValidator)
export const authorDataResolver = resolve<Author, HookContext<AuthorService>>({})

// Schema for updating existing entries
export const authorPatchSchema = Type.Partial(authorSchema, {
  $id: 'AuthorPatch'
})
export type AuthorPatch = Static<typeof authorPatchSchema>
export const authorPatchValidator = getValidator(authorPatchSchema, dataValidator)
export const authorPatchResolver = resolve<Author, HookContext<AuthorService>>({})

// Schema for allowed query properties
export const authorQueryProperties = Type.Pick(authorSchema, ['id', 'name'])
export const authorQuerySchema = Type.Intersect(
  [
    querySyntax(authorQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AuthorQuery = Static<typeof authorQuerySchema>
export const authorQueryValidator = getValidator(authorQuerySchema, queryValidator)
export const authorQueryResolver = resolve<AuthorQuery, HookContext<AuthorService>>({})
