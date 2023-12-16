// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Image, ImageData, ImagePatch, ImageQuery } from './images.schema'

export type { Image, ImageData, ImagePatch, ImageQuery }

export interface ImageParams extends KnexAdapterParams<ImageQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ImageService<ServiceParams extends Params = ImageParams> extends KnexService<
  Image,
  ImageData,
  ImageParams,
  ImagePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'images'
  }
}
