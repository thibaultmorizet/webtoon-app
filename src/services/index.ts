import { episode } from './episodes/episodes'
import { tracksite } from './tracksites/tracksites'
import { trackedWebtoon } from './trackedWebtoons/trackedWebtoons'
import { webtoonsArtists } from './webtoonsArtists/webtoonsArtists'
import { webtoonsAuthors } from './webtoonsAuthors/webtoonsAuthors'
import { webtoonsTags } from './webtoonsTags/webtoonsTags'
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
  app.configure(episode)
  app.configure(tracksite)
  app.configure(trackedWebtoon)
  app.configure(webtoonsArtists)
  app.configure(webtoonsAuthors)
  app.configure(webtoonsTags)
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
