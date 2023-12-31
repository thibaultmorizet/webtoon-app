// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { imageClient } from './services/images/images.shared'
export type { Image, ImageData, ImageQuery, ImagePatch } from './services/images/images.shared'

import { episodeClient } from './services/episodes/episodes.shared'
export type { Episode, EpisodeData, EpisodeQuery, EpisodePatch } from './services/episodes/episodes.shared'

import { tracksiteClient } from './services/tracksites/tracksites.shared'
export type {
  Tracksite,
  TracksiteData,
  TracksiteQuery,
  TracksitePatch
} from './services/tracksites/tracksites.shared'

import { trackedWebtoonClient } from './services/trackedWebtoons/trackedWebtoons.shared'
export type {
  TrackedWebtoon,
  TrackedWebtoonData,
  TrackedWebtoonQuery,
  TrackedWebtoonPatch
} from './services/trackedWebtoons/trackedWebtoons.shared'

import { webtoonsArtistsClient } from './services/webtoonsArtists/webtoonsArtists.shared'
export type {
  WebtoonsArtists,
  WebtoonsArtistsData,
  WebtoonsArtistsQuery,
  WebtoonsArtistsPatch
} from './services/webtoonsArtists/webtoonsArtists.shared'

import { webtoonsAuthorsClient } from './services/webtoonsAuthors/webtoonsAuthors.shared'
export type {
  WebtoonsAuthors,
  WebtoonsAuthorsData,
  WebtoonsAuthorsQuery,
  WebtoonsAuthorsPatch
} from './services/webtoonsAuthors/webtoonsAuthors.shared'

import { webtoonsTagsClient } from './services/webtoonsTags/webtoonsTags.shared'
export type {
  WebtoonsTags,
  WebtoonsTagsData,
  WebtoonsTagsQuery,
  WebtoonsTagsPatch
} from './services/webtoonsTags/webtoonsTags.shared'

import { webtoonClient } from './services/webtoons/webtoons.shared'
export type { Webtoon, WebtoonData, WebtoonQuery, WebtoonPatch } from './services/webtoons/webtoons.shared'

import { artistClient } from './services/artists/artists.shared'
export type { Artist, ArtistData, ArtistQuery, ArtistPatch } from './services/artists/artists.shared'

import { tagClient } from './services/tags/tags.shared'
export type { Tag, TagData, TagQuery, TagPatch } from './services/tags/tags.shared'

import { authorClient } from './services/authors/authors.shared'
export type { Author, AuthorData, AuthorQuery, AuthorPatch } from './services/authors/authors.shared'

import { studioClient } from './services/studios/studios.shared'
export type { Studio, StudioData, StudioQuery, StudioPatch } from './services/studios/studios.shared'

import { languageClient } from './services/languages/languages.shared'
export type {
  Language,
  LanguageData,
  LanguageQuery,
  LanguagePatch
} from './services/languages/languages.shared'

import { statusClient } from './services/status/status.shared'
export type { Status, StatusData, StatusQuery, StatusPatch } from './services/status/status.shared'

import { categoryClient } from './services/categories/categories.shared'
export type {
  Category,
  CategoryData,
  CategoryQuery,
  CategoryPatch
} from './services/categories/categories.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the webtoon-app app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(categoryClient)
  client.configure(statusClient)
  client.configure(languageClient)
  client.configure(studioClient)
  client.configure(authorClient)
  client.configure(tagClient)
  client.configure(artistClient)
  client.configure(webtoonClient)
  client.configure(webtoonsTagsClient)
  client.configure(webtoonsAuthorsClient)
  client.configure(webtoonsArtistsClient)
  client.configure(trackedWebtoonClient)
  client.configure(tracksiteClient)
  client.configure(episodeClient)
  client.configure(imageClient)
  return client
}
