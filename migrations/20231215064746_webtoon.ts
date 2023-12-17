// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('webtoons', (table) => {
    table.increments('id')

    table.string('title')
    table.string('description')
    table.string('poster')
    table.date('release_date')
    table.boolean('is_importing')
    table.integer('studio_id')
    table.integer('language_id')
    table.integer('status_id')
    table.integer('category_id')
    table.date('updated_at')
    
    table.foreign('studio_id').references('id').inTable('studios')
    table.foreign('language_id').references('id').inTable('languages')
    table.foreign('status_id').references('id').inTable('status')
    table.foreign('category_id').references('id').inTable('categories')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('webtoons')
}
