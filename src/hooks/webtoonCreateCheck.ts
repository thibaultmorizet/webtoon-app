// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext, NextFunction } from '../declarations'
import { logger } from '../logger'

export const webtoonCreateCheck = async (context: HookContext) => {
  const studio_id = context.arguments[0].studio_id
  const language_id = context.arguments[0].language_id
  const status_id = context.arguments[0].status_id
  try {
    await context.app.service('studios').get(studio_id)
    await context.app.service('languages').get(language_id)
    await context.app.service('status').get(status_id)
  } catch (e: any){
    console.log(e?.message)
    throw new Error(e)
  }
}
