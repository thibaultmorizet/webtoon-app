import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('languages').del()

  // Inserts seed entries
  await knex('languages').insert([
    { id: 1, name: 'english' },
    { id: 2, name: 'french' },
    { id: 3, name: 'japanese' },
    { id: 4, name: 'korean' },
  ])
}
