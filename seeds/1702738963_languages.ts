import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('languages').del()

  // Inserts seed entries
  await knex('languages').insert([
    { id: 1, name: 'english', key: 'en' },
    { id: 2, name: 'french', key: 'fr' },
    { id: 3, name: 'japanese', key: 'ja' },
    { id: 4, name: 'korean', key: 'ko' },
  ])
}
