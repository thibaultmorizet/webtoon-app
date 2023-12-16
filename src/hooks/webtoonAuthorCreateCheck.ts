// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const webtoonAuthorCreateCheck = async (context: HookContext) => {  
  const webtoon_id = context.arguments[0].webtoon_id
  const author_id = context.arguments[0].author_id
  try {
    await context.app.service('webtoons').get(webtoon_id)
    await context.app.service('authors').get(author_id)
  } catch (e: any){
    console.log(e?.message)
    throw new Error(e)
  }
}
