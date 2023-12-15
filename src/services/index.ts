import { webtoon } from './webtoons/webtoons'
import { artist } from './artists/artists'
import { tag } from './tags/tags'
import { author } from './authors/authors'
import { studio } from './studios/studios'
import { language } from './languages/languages'
import { status } from './status/status'
import { category } from './categories/categories'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(webtoon)
  app.configure(artist)
  app.configure(tag)
  app.configure(author)
  app.configure(studio)
  app.configure(language)
  app.configure(status)
  app.configure(category)
  app.configure(user)
  // All services will be registered here
}
