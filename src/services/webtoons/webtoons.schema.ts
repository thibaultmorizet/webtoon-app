// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { categorySchema } from '../categories/categories.schema'
import { languageSchema } from '../languages/languages.schema'
import { statusSchema } from '../status/status.schema'
import { studioSchema } from '../studios/studios.schema'
import { tagSchema } from '../tags/tags.schema'
import type { WebtoonService } from './webtoons.class'
import { authorSchema } from '../authors/authors.schema'

// Main data model schema
export const webtoonSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    description: Type.String(),
    poster: Type.String(),
    release_date: Type.String({ format: 'date' }),
    studio_id: Type.Number(),
    studio: Type.Ref(studioSchema),
    language_id: Type.Number(),
    language: Type.Ref(languageSchema),
    status_id: Type.Number(),
    status: Type.Ref(statusSchema),

    tags: Type.Array(Type.Ref(tagSchema)),
    categories: Type.Array(Type.Ref(categorySchema)),
    authors: Type.Array(Type.Ref(authorSchema)),

    created_at: Type.String({ format: 'date' }),
    updated_at: Type.String({ format: 'date' }),
  },
  { $id: 'Webtoon', additionalProperties: false }
)
export type Webtoon = Static<typeof webtoonSchema>
export const webtoonValidator = getValidator(webtoonSchema, dataValidator)
export const webtoonResolver = resolve<Webtoon, HookContext<WebtoonService>>({
  studio: virtual(async (webtoons, context) => {
    return await context.app.service('studios').get(webtoons.studio_id)
  }),
  language: virtual(async (webtoons, context) => {
    return await context.app.service('languages').get(webtoons.language_id)
  }),
  status: virtual(async (webtoons, context) => {
    return await context.app.service('status').get(webtoons.status_id)
  }),
  tags: virtual(async (webtoons, context) => {
    const tagsId = await context.app.service('webtoonsTags').find({
      query: {
        webtoon_id: webtoons.id,
        $select: ['tag_id']
      }
    })

    const tags = tagsId.data.map((tag) => context.app.service('tags').get(tag.tag_id))

    return await Promise.all(tags)
  }),
  categories: virtual(async (webtoons, context) => {
    const categoriesId = await context.app.service('webtoonsCategories').find({
      query: {
        webtoon_id: webtoons.id,
        $select: ['category_id']
      }
    })

    const categories = categoriesId.data.map((category) =>
      context.app.service('categories').get(category.category_id)
    )

    return await Promise.all(categories)
  }),
  authors: virtual(async (webtoons, context) => {
    const authorsId = await context.app.service('webtoonsAuthors').find({
      query: {
        webtoon_id: webtoons.id,
        $select: ['author_id']
      }
    })

    const authors = authorsId.data.map((author) => context.app.service('authors').get(author.author_id))

    return await Promise.all(authors)
  })
})

export const webtoonExternalResolver = resolve<Webtoon, HookContext<WebtoonService>>({
  studio_id: async () => undefined,
  language_id: async () => undefined,
  status_id: async () => undefined
})

// Schema for creating new entries
export const webtoonDataSchema = Type.Pick(
  webtoonSchema,
  ['title', 'description', 'poster', 'release_date', 'studio_id', 'language_id', 'status_id'],
  {
    $id: 'WebtoonData'
  }
)
export type WebtoonData = Static<typeof webtoonDataSchema>
export const webtoonDataValidator = getValidator(webtoonDataSchema, dataValidator)
export const webtoonDataResolver = resolve<Webtoon, HookContext<WebtoonService>>({
  created_at: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const webtoonPatchSchema = Type.Partial(webtoonSchema, {
  $id: 'WebtoonPatch'
})
export type WebtoonPatch = Static<typeof webtoonPatchSchema>
export const webtoonPatchValidator = getValidator(webtoonPatchSchema, dataValidator)
export const webtoonPatchResolver = resolve<Webtoon, HookContext<WebtoonService>>({
  updated_at: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const webtoonQueryProperties = Type.Pick(webtoonSchema, [
  'id',
  'title',
  'description',
  'poster',
  'release_date',
  'studio_id',
  'language_id',
  'status_id',
  'created_at',
  'updated_at'
])
export const webtoonQuerySchema = Type.Intersect(
  [
    querySyntax(webtoonQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WebtoonQuery = Static<typeof webtoonQuerySchema>
export const webtoonQueryValidator = getValidator(webtoonQuerySchema, queryValidator)
export const webtoonQueryResolver = resolve<WebtoonQuery, HookContext<WebtoonService>>({})
