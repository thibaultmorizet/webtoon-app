// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const imageCreateCheck = async (context: HookContext) => {
  const episode_id = context.arguments[0].episode_id
  try {
    await context.app.service('episodes').get(episode_id)
  } catch (e: any) {
    console.log(e?.message)
    throw new Error(e)
  }
}
