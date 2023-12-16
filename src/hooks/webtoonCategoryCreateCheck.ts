// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const webtoonCategoryCreateCheck = async (context: HookContext) => {  
  const webtoon_id = context.arguments[0].webtoon_id
  const category_id = context.arguments[0].category_id
  try {
    await context.app.service('webtoons').get(webtoon_id)
    await context.app.service('categories').get(category_id)
  } catch (e: any){
    console.log(e?.message)
    throw new Error(e)
  }
}
