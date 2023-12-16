// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WebtoonsAuthorsService } from './webtoonsAuthors.class'

// Main data model schema
export const webtoonsAuthorsSchema = Type.Object(
  {
    id: Type.Number(),
    webtoon_id: Type.Number(),
    author_id: Type.Number()
  },
  { $id: 'WebtoonsAuthors', additionalProperties: false }
)
export type WebtoonsAuthors = Static<typeof webtoonsAuthorsSchema>
export const webtoonsAuthorsValidator = getValidator(webtoonsAuthorsSchema, dataValidator)
export const webtoonsAuthorsResolver = resolve<WebtoonsAuthors, HookContext<WebtoonsAuthorsService>>({})

export const webtoonsAuthorsExternalResolver = resolve<WebtoonsAuthors, HookContext<WebtoonsAuthorsService>>(
  {}
)

// Schema for creating new entries
export const webtoonsAuthorsDataSchema = Type.Pick(webtoonsAuthorsSchema, ['webtoon_id', 'author_id'], {
  $id: 'WebtoonsAuthorsData'
})
export type WebtoonsAuthorsData = Static<typeof webtoonsAuthorsDataSchema>
export const webtoonsAuthorsDataValidator = getValidator(webtoonsAuthorsDataSchema, dataValidator)
export const webtoonsAuthorsDataResolver = resolve<WebtoonsAuthors, HookContext<WebtoonsAuthorsService>>({})

// Schema for updating existing entries
export const webtoonsAuthorsPatchSchema = Type.Partial(webtoonsAuthorsSchema, {
  $id: 'WebtoonsAuthorsPatch'
})
export type WebtoonsAuthorsPatch = Static<typeof webtoonsAuthorsPatchSchema>
export const webtoonsAuthorsPatchValidator = getValidator(webtoonsAuthorsPatchSchema, dataValidator)
export const webtoonsAuthorsPatchResolver = resolve<WebtoonsAuthors, HookContext<WebtoonsAuthorsService>>({})

// Schema for allowed query properties
export const webtoonsAuthorsQueryProperties = Type.Pick(webtoonsAuthorsSchema, [
  'id',
  'webtoon_id',
  'author_id'
])
export const webtoonsAuthorsQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonsAuthorsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonsAuthorsQuery = Static<typeof webtoonsAuthorsQuerySchema>
export const webtoonsAuthorsQueryValidator = getValidator(webtoonsAuthorsQuerySchema, queryValidator)
export const webtoonsAuthorsQueryResolver = resolve<
  WebtoonsAuthorsQuery,
  HookContext<WebtoonsAuthorsService>
>({})
