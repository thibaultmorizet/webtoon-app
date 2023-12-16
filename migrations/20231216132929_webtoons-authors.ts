// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('webtoons-authors', (table) => {
    table.increments('id')

    table.integer('webtoon_id')
    table.integer('author_id')

    table.foreign('webtoon_id').references('id').inTable('webtoons')
    table.foreign('author_id').references('id').inTable('authors')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('webtoons-authors')
}
