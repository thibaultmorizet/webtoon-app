// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const episodeCreateCheck = async (context: HookContext) => {
  const webtoon_id = context.arguments[0].webtoon_id
  try {
    await context.app.service('webtoons').get(webtoon_id)
  } catch (e: any) {
    console.log(e?.message)
    throw new Error(e)
  }
}
