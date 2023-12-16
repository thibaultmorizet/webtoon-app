// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const trackedWebtoonCreateCheck = async (context: HookContext) => {
  const user_id = context.arguments[0].user_id
  const webtoon_id = context.arguments[0].webtoon_id
  const tracksite_id = context.arguments[0].tracksite_id
  try {
    await context.app.service('users').get(user_id)
    await context.app.service('webtoons').get(webtoon_id)
    await context.app.service('tracksites').get(tracksite_id)
  } catch (e: any) {
    console.log(e?.message)
    throw new Error(e)
  }
}
