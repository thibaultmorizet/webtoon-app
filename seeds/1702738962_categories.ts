import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del()

  // Inserts seed entries
  await knex('categories').insert([
    { id: 1, name: 'Manga' },
    { id: 2, name: 'Manwha' },
    { id: 3, name: 'Webtoon' }
  ])
}
