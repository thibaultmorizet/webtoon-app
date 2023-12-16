// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('webtoons-categories', (table) => {
    table.increments('id')

    table.integer('webtoon_id')
    table.integer('category_id')

    table.foreign('webtoon_id').references('id').inTable('webtoons')
    table.foreign('category_id').references('id').inTable('categories')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('webtoons-categories')
}
