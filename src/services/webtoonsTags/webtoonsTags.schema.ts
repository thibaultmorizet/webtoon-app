// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WebtoonsTagsService } from './webtoonsTags.class'
import { webtoonSchema } from '../webtoons/webtoons.schema'
import { tagSchema } from '../tags/tags.schema'

// Main data model schema
export const webtoonsTagsSchema = Type.Object(
  {
    id: Type.Number(),
    webtoon_id: Type.Number(),
    tag_id: Type.Number()
  },
  { $id: 'WebtoonsTags', additionalProperties: false }
)
export type WebtoonsTags = Static<typeof webtoonsTagsSchema>
export const webtoonsTagsValidator = getValidator(webtoonsTagsSchema, dataValidator)
export const webtoonsTagsResolver = resolve<WebtoonsTags, HookContext<WebtoonsTagsService>>({})

export const webtoonsTagsExternalResolver = resolve<WebtoonsTags, HookContext<WebtoonsTagsService>>({})

// Schema for creating new entries
export const webtoonsTagsDataSchema = Type.Pick(webtoonsTagsSchema, ['webtoon_id', 'tag_id'], {
  $id: 'WebtoonsTagsData'
})
export type WebtoonsTagsData = Static<typeof webtoonsTagsDataSchema>
export const webtoonsTagsDataValidator = getValidator(webtoonsTagsDataSchema, dataValidator)
export const webtoonsTagsDataResolver = resolve<WebtoonsTags, HookContext<WebtoonsTagsService>>({})

// Schema for updating existing entries
export const webtoonsTagsPatchSchema = Type.Partial(webtoonsTagsSchema, {
  $id: 'WebtoonsTagsPatch'
})
export type WebtoonsTagsPatch = Static<typeof webtoonsTagsPatchSchema>
export const webtoonsTagsPatchValidator = getValidator(webtoonsTagsPatchSchema, dataValidator)
export const webtoonsTagsPatchResolver = resolve<WebtoonsTags, HookContext<WebtoonsTagsService>>({})

// Schema for allowed query properties
export const webtoonsTagsQueryProperties = Type.Pick(webtoonsTagsSchema, ['id', 'webtoon_id', 'tag_id'])
export const webtoonsTagsQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonsTagsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonsTagsQuery = Static<typeof webtoonsTagsQuerySchema>
export const webtoonsTagsQueryValidator = getValidator(webtoonsTagsQuerySchema, queryValidator)
export const webtoonsTagsQueryResolver = resolve<WebtoonsTagsQuery, HookContext<WebtoonsTagsService>>({})
