// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('episodes', (table) => {
    table.increments('id')

    table.integer('number')
    table.string('title')
    table.string('release_date')
    table.integer('webtoon_id')

    table.foreign('webtoon_id').references('id').inTable('webtoons')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('episodes')
}
