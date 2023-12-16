import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('episodes').del()

  // Inserts seed entries
  await knex('episodes').insert([
    {
      id: 1,
      number: 1,
      title: 'Episode 1',
      release_date: new Date().toISOString(),
      webtoon_id: 1
    }
  ])
}
