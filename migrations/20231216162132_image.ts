// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('images', (table) => {
    table.increments('id')

    table.integer('position')
    table.string('name')
    table.integer('episode_id')

    table.foreign('episode_id').references('id').inTable('episodes')

  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('images')
}
