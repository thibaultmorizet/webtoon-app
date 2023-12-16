// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tracked-webtoons', (table) => {
    table.increments('id')

    table.integer('user_id')
    table.integer('webtoon_id')
    table.integer('tracksite_id')
    table.date('created_at')
    table.date('deleted_at')
    
    table.foreign('user_id').references('id').inTable('users')
    table.foreign('webtoon_id').references('id').inTable('webtoons')
    table.foreign('tracksite_id').references('id').inTable('tracksites')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tracked-webtoons')
}
