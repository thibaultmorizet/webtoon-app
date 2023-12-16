// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WebtoonsCategoriesService } from './webtoonsCategories.class'

// Main data model schema
export const webtoonsCategoriesSchema = Type.Object(
  {
    id: Type.Number(),
    webtoon_id: Type.Number(),
    category_id: Type.Number()
  },
  { $id: 'WebtoonsCategories', additionalProperties: false }
)
export type WebtoonsCategories = Static<typeof webtoonsCategoriesSchema>
export const webtoonsCategoriesValidator = getValidator(webtoonsCategoriesSchema, dataValidator)
export const webtoonsCategoriesResolver = resolve<WebtoonsCategories, HookContext<WebtoonsCategoriesService>>(
  {}
)

export const webtoonsCategoriesExternalResolver = resolve<
  WebtoonsCategories,
  HookContext<WebtoonsCategoriesService>
>({})

// Schema for creating new entries
export const webtoonsCategoriesDataSchema = Type.Pick(
  webtoonsCategoriesSchema,
  ['webtoon_id', 'category_id'],
  {
    $id: 'WebtoonsCategoriesData'
  }
)
export type WebtoonsCategoriesData = Static<typeof webtoonsCategoriesDataSchema>
export const webtoonsCategoriesDataValidator = getValidator(webtoonsCategoriesDataSchema, dataValidator)
export const webtoonsCategoriesDataResolver = resolve<
  WebtoonsCategories,
  HookContext<WebtoonsCategoriesService>
>({})

// Schema for updating existing entries
export const webtoonsCategoriesPatchSchema = Type.Partial(webtoonsCategoriesSchema, {
  $id: 'WebtoonsCategoriesPatch'
})
export type WebtoonsCategoriesPatch = Static<typeof webtoonsCategoriesPatchSchema>
export const webtoonsCategoriesPatchValidator = getValidator(webtoonsCategoriesPatchSchema, dataValidator)
export const webtoonsCategoriesPatchResolver = resolve<
  WebtoonsCategories,
  HookContext<WebtoonsCategoriesService>
>({})

// Schema for allowed query properties
export const webtoonsCategoriesQueryProperties = Type.Pick(webtoonsCategoriesSchema, [
  'id',
  'webtoon_id',
  'category_id'
])
export const webtoonsCategoriesQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonsCategoriesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonsCategoriesQuery = Static<typeof webtoonsCategoriesQuerySchema>
export const webtoonsCategoriesQueryValidator = getValidator(webtoonsCategoriesQuerySchema, queryValidator)
export const webtoonsCategoriesQueryResolver = resolve<
  WebtoonsCategoriesQuery,
  HookContext<WebtoonsCategoriesService>
>({})
