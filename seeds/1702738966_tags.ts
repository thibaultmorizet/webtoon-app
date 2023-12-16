import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tags').del()

  // Inserts seed entries
  await knex('tags').insert([
    { id: 1, name: 'action' },
    { id: 2, name: 'romance' },
    { id: 3, name: 'aventure' }
  ])
}
