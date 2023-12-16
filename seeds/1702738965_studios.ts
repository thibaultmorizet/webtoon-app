import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('studios').del()

  // Inserts seed entries
  await knex('studios').insert([
    { id: 1, name: 'Redice' },
  ])
}
