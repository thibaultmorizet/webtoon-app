// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { LanguageService } from './languages.class'

// Main data model schema
export const languageSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    key: Type.String()
  },
  { $id: 'Language', additionalProperties: false }
)
export type Language = Static<typeof languageSchema>
export const languageValidator = getValidator(languageSchema, dataValidator)
export const languageResolver = resolve<Language, HookContext<LanguageService>>({})

export const languageExternalResolver = resolve<Language, HookContext<LanguageService>>({})

// Schema for creating new entries
export const languageDataSchema = Type.Pick(languageSchema, ['name', 'key'], {
  $id: 'LanguageData'
})
export type LanguageData = Static<typeof languageDataSchema>
export const languageDataValidator = getValidator(languageDataSchema, dataValidator)
export const languageDataResolver = resolve<Language, HookContext<LanguageService>>({})

// Schema for updating existing entries
export const languagePatchSchema = Type.Partial(languageSchema, {
  $id: 'LanguagePatch'
})
export type LanguagePatch = Static<typeof languagePatchSchema>
export const languagePatchValidator = getValidator(languagePatchSchema, dataValidator)
export const languagePatchResolver = resolve<Language, HookContext<LanguageService>>({})

// Schema for allowed query properties
export const languageQueryProperties = Type.Pick(languageSchema, ['id', 'name', 'key'])
export const languageQuerySchema = Type.Intersect(
  [
    querySyntax(languageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LanguageQuery = Static<typeof languageQuerySchema>
export const languageQueryValidator = getValidator(languageQuerySchema, queryValidator)
export const languageQueryResolver = resolve<LanguageQuery, HookContext<LanguageService>>({})
