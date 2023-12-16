import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('webtoons-artists').del()

  // Inserts seed entries
  await knex('webtoons-artists').insert([
    {
      id: 1,
      webtoon_id: 1,
      artist_id: 1
    }
  ])
}
