import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('languages').del()

  // Inserts seed entries
  await knex('languages').insert([
    { id: 1, language: 'english' },
    { id: 2, language: 'french' },
    { id: 3, language: 'japanese' },
    { id: 4, language: 'korean' },
  ])
}
